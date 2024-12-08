import { Button, Input } from "antd";
import { RobotOpenLayout } from "../../style/layout/RobotTalkLayoutStyle";
import styled from "styled-components";
import { InputLayout } from "../../style/layout/InputLayout";
import { memo, useState } from "react";
import { RobotTalkingMessageLayout } from "../../style/layout/robotTalkingMessageLayout";
import { MessageBox } from "react-chat-elements";
import { useLJStore } from "../../store/websocketStore";
const StyledRobotInput = styled(Input)`
  width: 14rem;
  height: 2rem;
`;
const RobotSmallTalkingMemo = memo(function RobotSmallTalkingMemo({
  sendAIMessage,
  robotTalkingData,
}) {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSendMessage = function () {
    sendAIMessage(inputValue);
    setInputValue(() => "");
  };
  return (
    <RobotOpenLayout>
      <InputLayout style={{ width: "19rem", zIndex: 9 }}>
        <StyledRobotInput
          placeholder="尽情询问吧，一切不会留下痕迹"
          value={inputValue}
          onChange={handleInputChange}
          onClick={(e) => e.target.focus()}
        />
        <Button
          onClick={() => handleSendMessage()}
          style={{ width: "3rem", padding: "3px" }}
        >
          发送
        </Button>
      </InputLayout>
      <RobotTalkingMessageLayout>
        {robotTalkingData?.map((singnMessage) => {
          return (
            <MessageBox
              key={singnMessage.timeStamp}
              type="text"
              title={singnMessage.sender}
              position={singnMessage === "human" ? "left" : "right"}
              text={singnMessage.message}
            />
          );
        })}
      </RobotTalkingMessageLayout>
    </RobotOpenLayout>
  );
});
const RobotSmallTalking = function () {
  const { sendAIMessage, robotTalkingData } = useLJStore();
  return (
    <RobotSmallTalkingMemo
      sendAIMessage={sendAIMessage}
      robotTalkingData={robotTalkingData}
    />
  );
};
export default RobotSmallTalking;

