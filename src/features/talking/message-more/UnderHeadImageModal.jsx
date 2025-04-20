import { useSelector } from "react-redux";
import styled from "styled-components";
import { getCurrentStoreData } from "../../../store/globalSlice";
import { ioInstance } from "../../../servers/websocket";
import { message } from "antd";

const Container = styled.div`
  position: absolute;
  right: 3rem;
  width: 5rem;
  height: 2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #999999;
  border-radius: 0.2rem;
`;
const Span = styled.span`
  font-size: 1.2rem;
  color: black;
  cursor: pointer;
`;
function UnderHeadImageModal({ chatMessageDetail }) {
  const singleChatData = useSelector(getCurrentStoreData("singleChatData"));
  const { custom, senderId: receiverId, senderName } = chatMessageDetail;
  const isInFriendChatList = Object.keys(singleChatData).includes(receiverId); // 处理模态框显示
  const myAccountData = useSelector(getCurrentStoreData("myAccountData"));
  const handleAddFriendClick = function () {
    console.log("加好友");
    const requestData = {
      senderId: ioInstance.id,
      receiverId,
      senderData: {
        name: myAccountData.name,
        custom: myAccountData.custom,
      },
      receiverData: { name: senderName, custom },
    };
    ioInstance.emit("user-toSelectUser-request", requestData);
    message.success("成功发送好友请求");
  };
  return (
    <Container>
      {isInFriendChatList ? (
        <Span>聊天</Span>
      ) : (
        <Span onClick={handleAddFriendClick}>加好友</Span>
      )}
    </Container>
  );
}

export default UnderHeadImageModal;
