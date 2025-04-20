import { MessageBox } from "react-chat-elements";
import { MessageLayout } from "../../style/layout/MessageLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTalkingDataHeights,
  getCurrentStoreData,
} from "../../store/globalSlice";
import { ioInstance } from "../../servers/websocket";
import { useMemo, useRef, useState, useCallback, useEffect } from "react";
import VirtualMessage from "./message-more/VirtualMessage";
import styled from "styled-components";

const VirContainer = styled.div`
  width: 100%;
  height: ${(props) => props.layoutHeight + "px"};
  position: relative;
`;

const VIEWPORT_HEIGHT = 388;
const BUFFER_SIZE = 4;
const SCROLL_THROTTLE = 16;
const MESSAGE_MINIHEIGHT = 92;

/** 聊天数据展示 - 使用了虚拟滚动😋 */
function UserTalkingMessageBox() {
  const { talkingData, talkingDataHeights } = useSelector(
    getCurrentStoreData()
  );
  console.log(talkingData);
  console.log(talkingDataHeights, "talkingDataHeights");
  const { id } = ioInstance;
  const dispatch = useDispatch();

  // 状态管理
  const [scrollTop, setScrollTop] = useState(0);
  const scrollTimer = useRef(null);
  const containerRef = useRef(null);
  const lastScrollTop = useRef(0);
  const isScrolling = useRef(false);
  const heightUpdateQueue = useRef(new Set());

  // 计算总高度
  const totalHeight = useMemo(() => {
    if (!talkingDataHeights.length) return VIEWPORT_HEIGHT;
    const lastItem = talkingDataHeights[talkingDataHeights.length - 1];
    return lastItem.currentDomFootInLayout || VIEWPORT_HEIGHT;
  }, [talkingDataHeights]);

  // 优化滚动处理
  const handleScroll = useCallback((e) => {
    if (isScrolling.current) return;

    const currentScrollTop = e.currentTarget.scrollTop;
    // 只有当高度变化超过一条消息的最小高度时才修改一次
    if (Math.abs(currentScrollTop - lastScrollTop.current) < MESSAGE_MINIHEIGHT)
      return;

    isScrolling.current = true;
    lastScrollTop.current = currentScrollTop;

    if (scrollTimer.current) {
      cancelAnimationFrame(scrollTimer.current);
    }
    // 相较于计时器 requestAnimationFrame可以保证每一帧都执行
    scrollTimer.current = requestAnimationFrame(() => {
      setScrollTop(currentScrollTop);
      isScrolling.current = false;
    });
  }, []);

  // 批量处理高度更新
  const processHeightUpdates = useCallback(() => {
    if (heightUpdateQueue.current.size === 0) return;

    const updates = Array.from(heightUpdateQueue.current);
    heightUpdateQueue.current.clear();

    updates.forEach(({ index, height }) => {
      dispatch(changeTalkingDataHeights({ index, realHeight: height }));
    });
  }, [dispatch]);

  // 使用防抖处理高度更新
  useEffect(() => {
    const timer = setInterval(processHeightUpdates, 100);
    return () => clearInterval(timer);
  }, [processHeightUpdates]);

  // 计算可见区域
  const visibleRange = useMemo(() => {
    if (!talkingDataHeights.length) return [0, 0];

    // 二分查找找到第一个可见项
    let start = 0;
    let end = talkingDataHeights.length - 1;
    let mid = 0;

    while (start <= end) {
      mid = Math.floor((start + end) / 2);
      const item = talkingDataHeights[mid];

      if (item.currentDomFootInLayout < scrollTop) {
        start = mid + 1;
      } else if (item.currentDomHeadInLayout > scrollTop + VIEWPORT_HEIGHT) {
        end = mid - 1;
      } else {
        break;
      }
    }

    // 扩展可见区域
    const visibleStart = Math.max(0, mid - BUFFER_SIZE);
    const visibleEnd = Math.min(
      talkingDataHeights.length - 1,
      mid + BUFFER_SIZE
    );

    return [visibleStart, visibleEnd + 1];
  }, [talkingDataHeights, scrollTop]);

  // 处理DOM高度更新
  const handleHeightUpdate = (index, node) => {
    if (
      !node ||
      !talkingDataHeights[index] ||
      talkingDataHeights[index].hadBeReal
    )
      return;

    const realHeight = node.getBoundingClientRect().height;
    const currentHeight = talkingDataHeights[index].height;


    if (Math.abs(realHeight - currentHeight) > 1) {
      heightUpdateQueue.current.add({ index, height: realHeight });
    }
  };

  // 清理定时器
  useEffect(() => {
    return () => {
      if (scrollTimer.current) {
        cancelAnimationFrame(scrollTimer.current);
      }
    };
  }, []);

  if (!talkingDataHeights.length) return null;

  const [startIndex, endIndex] = visibleRange;
  const visibleItems = talkingData.slice(startIndex, endIndex);

  return (
    <MessageLayout onScroll={handleScroll} ref={containerRef}>
      <VirContainer layoutHeight={totalHeight}>
        {visibleItems.map((item, index) => {
          const realIndex = index + startIndex;
          return (
            <VirtualMessage
              key={realIndex}
              oneTalking={item}
              handlePreToRealDom={handleHeightUpdate}
              realIndex={realIndex}
              talkingDataHeights={talkingDataHeights}
              id={id}
            />
          );
        })}
      </VirContainer>
    </MessageLayout>
  );
}

export default UserTalkingMessageBox;
