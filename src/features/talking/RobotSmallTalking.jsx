import { Button, Input } from "antd";
import { RobotOpenLayout } from "../../style/layout/RobotTalkLayoutStyle";
import styled from "styled-components";
import { InputLayout } from "../../style/layout/InputLayout";
import { useState } from "react";
import { RobotTalkingMessageLayout } from "../../style/layout/robotTalkingMessageLayout";
import { MessageBox } from "react-chat-elements";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentStoreData } from "../../store/globalSlice";
import { sendQuestionAndSaveAnswerInStoreForRobot } from "../../servers/AI/websocket-stream";
import RobotSmallChatSignMessageBoxForTemporaryTypeStyle from "./RobotSmallChatSignMessageBoxForTemporaryTypeStyle";
const StyledRobotInput = styled(Input)`
  width: 14rem;
  height: 2rem;
`;

const RobotSmallTalking = function ({ performer, performerFeatures }) {
  const { robotTalkingData, isRobotLoading } = useSelector(
    getCurrentStoreData()
  );
  console.log(robotTalkingData);
  const [inputValue, setInputValue] = useState("");
  const [isShowTypeBox, setIsShowTypeBox] = useState(false);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleCloseTypeBox = () => setIsShowTypeBox(false);
  const handleShowTypeBox = () => setIsShowTypeBox(true);
  const dispatch = useDispatch();
  const saveMessageInRobotStoreAndClearInputValue = function () {
    if (inputValue) {
      const standardData = sendQuestionAndSaveAnswerInStoreForRobot(dispatch, {
        message: inputValue,
        performer,
        performerFeatures,
      });
      setInputValue(() => "");
      console.log("最近返回的数据", standardData);
      return standardData;
    }
  };
  return (
    <RobotOpenLayout>
      <InputLayout style={{ width: "19rem", zIndex: 9 }}>
        <StyledRobotInput
          placeholder="尽情询问吧，一切不会留下痕迹"
          value={inputValue}
          onChange={handleInputChange}
          onClick={(e) => e.target.focus()}
          disabled={isRobotLoading}
        />
        <Button
          onClick={handleShowTypeBox}
          style={{
            width: "3rem",
            padding: "3px",
            cursor: isRobotLoading || !inputValue ? "not-allowed" : "pointer",
          }}
        >
          发送
        </Button>
      </InputLayout>
      <RobotTalkingMessageLayout>
        {robotTalkingData?.map((singMessage) => {
          return (
            <MessageBox
              key={singMessage.timeStamp}
              type="text"
              title={singMessage.senderName === "robot" ? "robot" : "我"}
              position={
                singMessage.senderName === "robot" ? "left" : "right"
              }
              text={singMessage.message}
              styles={{ whiteSpace: "pre-line" }}
            />
          );
        })}
        {isShowTypeBox && (
          <RobotSmallChatSignMessageBoxForTemporaryTypeStyle
            handleCloseTypeBox={handleCloseTypeBox}
            saveMessageInRobotStoreAndClearInputValue={
              saveMessageInRobotStoreAndClearInputValue
            }
          />
        )}
      </RobotTalkingMessageLayout>
    </RobotOpenLayout>
  );
};
export default RobotSmallTalking;
