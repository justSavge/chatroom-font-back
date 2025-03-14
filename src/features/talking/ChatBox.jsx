import { MessageBox } from "react-chat-elements";
import { ChatBoxStyle } from "../../style/chatbox/ChatBoxStyled";
/**
 * 聊天消息框
 * @param message 传入聊天记录
 */
function ChatBox({ whoSay }) {
  console.log(whoSay);
  return (
    <ChatBoxStyle bgcolor={whoSay}>
      <MessageBox />
    </ChatBoxStyle>
  );
}

export default ChatBox;
