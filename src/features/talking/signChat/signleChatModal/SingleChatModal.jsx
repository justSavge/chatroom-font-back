import { Button, Input } from "antd";
import styled from "styled-components";
import SmallMessage from "./SmallMessage";
import { ioInstance } from "../../../../servers/websocket";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentStoreData,
  handleCurrChooseFriendId,
} from "../../../../store/globalSlice";
import { useRef, useState } from "react";

const Container = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;
const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 30rem;
  height: 25rem;
  background-color: #fff;
  border-radius: 2rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const MessageBox = styled.div`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 1px;
  }
  height: 21rem;
`;
const SendBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const SmallInput = styled(Input)`
  width: 25rem;
  height: 100%;
`;
const Img = styled.img`
  width: 2rem;
  height: 2rem;
`;
const SmallButton = styled(Button)`
  width: 4rem;
  height: 2rem;
  background-color: purple;
`;
const File = styled.div`
  width: 2rem;
  height: 2rem;
  position: relative;
`;
const FileInput = styled.input`
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  opacity: 0;
`;
function SingleChatModal() {
  const {
    myAccountData: senderData,
    singleChatData,
    currChooseFriendId,
  } = useSelector(getCurrentStoreData());
  const dispatch = useDispatch();
  const [inputMessage, setInputMessage] = useState("");
  const ref = useRef(null);
  if (!currChooseFriendId) return;
  const { information, chatMessage } = singleChatData[currChooseFriendId];
  const handleClickSendTextMessage = function (message) {
    const sendData = {
      senderId: ioInstance.id,
      receiverId: information.id,
      senderData,
      receiverData: information,
      message,
    };
    return () => {
      ioInstance.emit("user-toSelectUser-message", sendData);
      setInputMessage("");
    };
  };
  const handleClickModalOutside = (e) => {
    if (e.target !== e.currentTarget) return;
    dispatch(handleCurrChooseFriendId(""));
  };
  return (
    <Container onClick={handleClickModalOutside}>
      <Modal ref={ref}>
        <MessageBox>
          {chatMessage?.map((data, index) => {
            const { isMeSend, senderId, receiverId, message } = data;
            const currMessageOwner = isMeSend ? information : senderData;
            const { custom = {}, name } = currMessageOwner;
            const img =
              "/image/header/" + (custom?.headImage || "header-cat.png");
            return (
              <SmallMessage
                key={index}
                headImage={img}
                name={name}
                message={message}
                isMeSend={isMeSend}
              />
            );
          })}
        </MessageBox>
        <SendBox>
          <SmallInput
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          {/* <File>
            <Img src="/image/icon/file.svg" alt="文件" />
            <FileInput type="file" />
          </File> */}
          <SmallButton onClick={handleClickSendTextMessage(inputMessage)}>
            发送
          </SmallButton>
        </SendBox>
      </Modal>
    </Container>
  );
}

export default SingleChatModal;
