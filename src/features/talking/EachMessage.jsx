import { EachMessageStyle } from "../../style/chatbox/EachMessageStyle";
import HeadImage from "../../ui/talking/HeadImage";
import ChatBox from "./ChatBox";
import { useSelector } from "react-redux";
import { getCurrentStoreData } from "../../store/globalSlice";
/**
 * 包括的聊天框和头像布局
 */

const EachMessage = function ({ message }) {
  const myScoketID = useSelector(getCurrentStoreData("myScoketID"));
  const whoNow = message.whoSay === myScoketID ? "you" : "he";
  return (
    <EachMessageStyle whosay={whoNow}>
      <HeadImage showWhoHeadImage={whoNow} />
      <ChatBox message={message.message} whoSay={whoNow} />
    </EachMessageStyle>
  );
};

export default EachMessage;
