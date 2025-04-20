import { MessageBox } from "react-chat-elements";
import MessageHeadImage from "./MessageHeadImage";
import { useEffect, useState, memo, useCallback, useRef } from "react";
import MessageModal from "./MessageModal";
import { createPortal } from "react-dom";
import TypeWordModal from "./TypeWordModal";
import { ioInstance } from "../../../servers/websocket";
import { useSelector } from "react-redux";
import { getCurrentStoreData } from "../../../store/globalSlice";

function VirtualMessage({
  oneTalking,
  handlePreToRealDom,
  realIndex,
  talkingDataHeights,
  id,
}) {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowTypeModal, setIsShowTypeModal] = useState(false);
  const [feelOrSuggestion, setFeelOrSuggestion] = useState("feel");
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const { left, top } = position;
  const messageRef = useRef(null);
  const myAccountData = useSelector(getCurrentStoreData("myAccountData"));
  // 处理模态框显示
  useEffect(() => {
    if (!isShowModal) return;

    const hiddenModal = () => {
      setIsShowModal(false);
    };
    document.addEventListener("click", hiddenModal);
    return () => document.removeEventListener("click", hiddenModal);
  }, [isShowModal]);

  // 处理高度更新
  useEffect(() => {
    if (messageRef.current) {
      handlePreToRealDom(realIndex, messageRef.current);
    }
  }, [handlePreToRealDom, realIndex]);

  const handleSetModalPosition = useCallback(
    (e) => {
      if (isShowModal) return;
      if (e.target === e.currentTarget) return;

      e.stopPropagation();
      const { top, left } = e.currentTarget.getBoundingClientRect();
      const { clientX, clientY } = e;
      const absLeft = clientX - left;
      const absTop = clientY - top;

      setIsShowModal(true);
      setPosition({ left: absLeft, top: absTop });
    },
    [isShowModal]
  );

  const handleTypeModal = useCallback((isShow, fOS = "feel") => {
    setIsShowTypeModal(isShow);
    setFeelOrSuggestion(fOS);
  }, []);
  /** 发送获得文件请求 */
  const handleClickForFileData = function () {
    const { name, account, custom } = myAccountData;
    const { fileIndex } = oneTalking.custom;
    const sendData = {
      name,
      account,
      custom,
      fileIndex,
    };
    ioInstance.emit("user-broadcast-file_data", sendData);
  };
  const type = oneTalking.custom.type || "text";
  console.log("打印一下oneTalking.message", oneTalking.message);
  return (
    <div
      ref={messageRef}
      style={{
        position: "absolute",
        width: "100%",
        top: `${talkingDataHeights[realIndex]?.currentDomHeadInLayout || 0}px`,
        zIndex: isShowModal ? 10 : 1,
      }}
    >
      <MessageHeadImage
        headImg={oneTalking.custom.headImage}
        chatMessageDetail={oneTalking}
        position={oneTalking.senderId === id ? "left" : "right"}
      />
      {type === "file" && (
        <MessageBox
          type="file"
          title={
            oneTalking.senderId === id
              ? "我分享了一个文件"
              : `${oneTalking.senderName}分享了一个文件`
          }
          position={oneTalking.senderId === id ? "left" : "right"}
          text={oneTalking.message}
          data={oneTalking.message}
          onClick={handleClickForFileData}
        />
      )}
      {type === "text" && (
        <MessageBox
          type="text"
          title={oneTalking.senderId === id ? "我" : oneTalking.senderName}
          position={oneTalking.senderId === id ? "left" : "right"}
          text={oneTalking.message}
          onClick={handleSetModalPosition}
        />
      )}
      {isShowModal && (
        <MessageModal
          left={left + "px"}
          top={top + "px"}
          text={oneTalking.message}
          handleTypeModal={handleTypeModal}
        />
      )}
      {isShowTypeModal &&
        createPortal(
          <TypeWordModal
            text={oneTalking.message}
            fOS={feelOrSuggestion}
            handleTypeModal={handleTypeModal}
          />,
          document.body
        )}
    </div>
  );
}

export default VirtualMessage;
