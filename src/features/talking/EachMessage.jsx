import { memo } from "react";
import { useLJStore } from "../../store/websocketStore";
import { EachMessageStyle } from "../../style/chatbox/EachMessageStyle";
import HeadImage from "../../ui/talking/HeadImage";
import ChatBox from "./ChatBox";
/**
 * 包括的聊天框和头像布局
 */
const EachMessageMemo = memo(function EachMessage({ message, myScoketID }) {
  //有些愚蠢了，使用useContext的弊端，看来还是redux好呀，可是已经不想去修改store
  console.log(myScoketID, "EachMessage-----whoAmI");
  const whoNow = message.whoSay === myScoketID ? "you" : "he";
  return (
    <EachMessageStyle whosay={whoNow}>
      <HeadImage showWhoHeadImage={whoNow} />
      <ChatBox message={message.message} whoSay={whoNow} />
    </EachMessageStyle>
  );
});
const EachMessage = function ({ message }) {
  const { myScoketID } = useLJStore();
  return <EachMessageMemo message={message} myScoketID={myScoketID} />;
};

export default EachMessage;
