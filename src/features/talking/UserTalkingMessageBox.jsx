import { MessageBox } from "react-chat-elements";
import { MessageLayout } from "../../style/layout/MessageLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTalkingDataHeights,
  getCurrentStoreData,
} from "../../store/globalSlice";
import { ioInstance } from "../../servers/websocket";
import { useMemo, useState } from "react";
/** 聊天数据展示 - 使用了虚拟滚动😋 */
function UserTalkingMessageBox() {
  const { talkingData, talkingDataHeights } = useSelector(
    getCurrentStoreData()
  );
  const { id } = ioInstance;
  const dispatch = useDispatch();
  const [scrollTop, setScrollTop] = useState(0);
  const handleLayoutScroll = function (e) {
    setScrollTop(e.currentTarget.scrollTop);
  };
  // 衍射数据
  const talkingDataRealDoms = useMemo(() => {
    const DataRealDoms = [];
    talkingDataHeights.forEach((height, index) => {
      const currentDomHeadInLayout =
        index === 0
          ? 0
          : DataRealDoms[index - 1].currentDomHeadInLayout + height;
      const DataRealDom = {
        currentDomHeadInLayout,
        height,
        currentDomFootInLayout: currentDomHeadInLayout + height,
      };
      DataRealDoms.push(DataRealDom);
    });
    return DataRealDoms;
  }, [talkingDataHeights]);

  /** 基于当前所在位置，依据talkingDataRealDoms来获得talkingData的起始索引和结束索引，并且要多渲染1个顶部和尾部的数据 */
  const findStartIndexAndLastIndexForCurrentPosition = useMemo(
    function () {
      if (!talkingDataRealDoms.length) return [-1, -1];
      /**
       *
       * @param {{currentDomHeadInLayout,height,currentDomFootInLayout}} talkingDataRealDom
       */
      const isInVisibleBox = function (talkingDataRealDom) {
        console.log(
          "进入isInVisibleBox的talkingDataRealDom",
          talkingDataRealDom
        );
        if (!talkingDataRealDom) return false;
        if (
          talkingDataRealDom?.currentDomFootInLayout > scrollTop &&
          talkingDataRealDom?.currentDomFootInLayout < scrollTop + 388
        )
          return true;
        // 388 是可视盒子高度
        if (
          talkingDataRealDom?.currentDomHeadInLayout > scrollTop &&
          talkingDataRealDom?.currentDomHeadInLayout < scrollTop + 388
        )
          return true;
        return false;
      };
      // 使用二分法快速找到区间
      // index: top ~ bottom
      // 窗口的startIndex使用底变判断
      // 窗口的lastIndex使用头部判断
      // talkingDataRealDoms.length 储存了所有index
      // 二分法
      // left:0 right:talkingDataRealDoms.length-1
      // target: scrollTop ~ scrollTop + 388px
      let left = 0;
      let right = talkingDataRealDoms.length - 1;
      let mid = Math.floor((left + right) / 2);
      console.log(mid, "此时的mid", talkingDataRealDoms[mid]);
      while (!isInVisibleBox(talkingDataRealDoms[mid])) {
        console.log(mid, "此时的mid", talkingDataRealDoms[mid]);
        // 顶部低于窗口底部,right设为中心点左移(变小)
        if (talkingDataRealDoms[mid].currentDomHeadInLayout > scrollTop + 388) {
          right = mid - 1;
        }
        // 顶部低于窗口底部,left设为中心点右移(变大)
        if (talkingDataRealDoms[mid].currentDomFootInLayout < scrollTop) {
          left = mid + 1;
        }
        mid = Math.floor((left + right) / 2);
      }
      // 找到窗口可视的index mid
      // 向左右延申
      // 先向上找到边缘 向下找到边缘
      let leftEdge = mid - 1,
        rightEdge = mid + 1;
      while (isInVisibleBox(talkingDataRealDoms[leftEdge])) {
        leftEdge--;
      }
      while (isInVisibleBox(talkingDataRealDoms[rightEdge])) {
        rightEdge++;
      }
      console.log(leftEdge, rightEdge, "---可视的左右边界");
      // 对边缘的数据整理增加确保减少白屏，此时保证区间仍然再0 ~ talkingDataRealDoms.length-1
      leftEdge = leftEdge - 1 < 0 ? 0 : leftEdge - 1;
      rightEdge =
        rightEdge + 1 > talkingDataRealDoms.length
          ? talkingDataRealDoms.length
          : rightEdge + 1;
      return [leftEdge, rightEdge];
    },
    [talkingDataRealDoms, scrollTop]
  );
  if (talkingDataRealDoms.length === 0) return;
  const [leftEdge, rightEdge] = findStartIndexAndLastIndexForCurrentPosition;
  const virtualList = talkingData.slice(leftEdge, rightEdge);
  /** 当渲染真实的dom节点的时候，处理talkingDataHeights（从预制的数据）为真实的数据 */
  const handlePreToRealDom = function (index, node) {
    if (!node) return;
    const realHeight = node.getBoundingClientRect().height;
    dispatch(changeTalkingDataHeights({ index, realHeight }));
  };
  return (
    <MessageLayout onScroll={handleLayoutScroll}>
      {virtualList?.map((oneTalking, index) => {
        const realIndex = index + leftEdge;
        return (
          <div
            key={oneTalking.timeStamp}
            ref={(node) => handlePreToRealDom(realIndex, node)}
            style={{
              position: "absolute",
              top: `${talkingDataRealDoms[realIndex].currentDomHeadInLayout}px`,
            }}
          >
            <MessageBox
              ref={(domNode) => {
                domNode.componentDidMount();
              }}
              type="text"
              title={oneTalking.senderId === id ? "我" : oneTalking.senderName}
              position={oneTalking.senderId === id ? "left" : "right"}
              text={oneTalking.message}
            />
          </div>
        );
      })}
    </MessageLayout>
  );
}

export default UserTalkingMessageBox;
