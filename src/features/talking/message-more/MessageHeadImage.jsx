import styled from "styled-components";
import { ioInstance } from "../../../servers/websocket";
import { getCurrentStoreData } from "../../../store/globalSlice";
import { useDispatch, useSelector } from "react-redux";
import UnderHeadImageModal from "./UnderHeadImageModal";
import { useCallback, useEffect, useState } from "react";

const Container = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.position === "left" ? "start" : "end")};
  position: relative;
`;
const Img = styled.img`
  border-radius: 50%;
  width: 1.6rem;
  height: 1.6rem;
  border: 1px solid black;
  cursor: pointer;
`;
/**
 *
 * @param {{headImg:string,position:'left'|'right'}}
 */
function MessageHeadImage({ headImg = "", position, chatMessageDetail }) {
  const [isShowModal, setIsShowModal] = useState(false);
  const realHeadImgUrl = "/image/header/" + (headImg || "header-default.png");
  const { senderId } = chatMessageDetail;
  console.log(chatMessageDetail, "chatMessageDetail");
  useEffect(() => {
    if (!isShowModal) return;
    const hiddenModal = (e) => {
      e.stopPropagation();
      setIsShowModal(false);
    };
    document.addEventListener("click", hiddenModal);
    return () => document.removeEventListener("click", hiddenModal);
  }, [isShowModal]);
  const showModal = (e) => {
    if (isShowModal) return;
    e.stopPropagation();
    setIsShowModal(true);
  };
  return (
    <Container position={position}>
      <Img src={realHeadImgUrl} alt={headImg} onClick={showModal} />
      {senderId !== ioInstance.id && isShowModal && (
        <UnderHeadImageModal chatMessageDetail={chatMessageDetail} />
      )}
    </Container>
  );
}

export default MessageHeadImage;
