import { MessageBox } from "react-chat-elements";
import { ChatBoxStyle, ChatSpan } from "../../style/chatbox/ChatBoxStyled";
/**
 * 聊天消息框
 * @param message 传入聊天记录
 */
function ChatBox({ message, whoSay }) {
  console.log(whoSay);
  return (
    <ChatBoxStyle bgcolor={whoSay}>
      <MessageBox
        // key={singnMessage.timeStamp}
        // type="text"
        // title={singnMessage.sender}
        // position={singnMessage === "human" ? "left" : "right"}
        // text={singnMessage.message}
      />
    </ChatBoxStyle>
  );
}

export default ChatBox;
