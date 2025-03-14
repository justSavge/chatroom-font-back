/* eslint-disable no-case-declarations */
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import {
  RobotContainer,
  RobotImage,
} from "../../style/containerImage/RobotContainer";
import RobotSmallTalking from "./RobotSmallTalking";
import RobotHeaderImgSelection from "./RobotHeaderImgSelection";
import { robotImgsWithDescription } from "../../lib/Talking/headerImg";

//以左下角为起点0，0，初始值1，1

function Robot({ defineProperty }) {
  const [robotStyle, setRobotStyle] = useState(
    () => robotImgsWithDescription[0]
  );
  const [isShowRoom, setIsShowRoom] = useState(false);
  const [robotPosition, setRobotPosition] = useState({ top: 10, left: 10 });
  const [isShowRobotSelection, setIsShowRobotSelection] = useState(false);
  const [isShowRobotHelloMessage, setIsShowRobotHelloMessage] = useState(() => {
    if (localStorage.getItem("isShowRobotHelloMessage") === "false") {
      return false;
    }
    return true;
  });
  const cursorOnContainerPosition = { top: 0, left: 0 };
  useEffect(() => {
    if (isShowRobotHelloMessage === false) return;
    const timer = setTimeout(() => {
      setIsShowRobotHelloMessage(false);
      localStorage.setItem("isShowRobotHelloMessage", "false");
    }, 4000);
    return () => clearTimeout(timer);
  }, []);
  const { top, left } = robotPosition;
  const handleChangeRobotStyle = function (robotItem) {
    setRobotStyle(robotItem);
    setIsShowRobotSelection(false);
  };

  defineProperty(() => {
    setRobotPosition(() => ({
      top: window.innerHeight / 2,
      left: window.innerWidth / 2,
    }));
  });
  const handleRobotDragStart = function (e) {
    const { clientX, clientY } = e;
    const { top, left } = e.currentTarget.getBoundingClientRect();
    cursorOnContainerPosition.top = clientY - top;
    cursorOnContainerPosition.left = clientX - left;
  };
  const handleRobotDragEnd = function (e) {
    const { clientX, clientY } = e;
    const { top, left } = cursorOnContainerPosition;
    const currentX = clientX - left;
    const currentY = clientY - top;
    setRobotPosition(() => ({ top: currentY, left: currentX }));
  };
  const handleChangeDown = function (e) {
    if (e.button !== 2) return;
    setIsShowRobotSelection(true);
  };
  const handleShowRoom = function (e) {
    if (e.button !== 0) return;
    setIsShowRoom((isShow) => !isShow);
  };
  return (
    <RobotContainer
      x={left}
      y={top}
      $allowshow={`${!isShowRobotHelloMessage}`}
      draggable
      onDragStart={handleRobotDragStart}
      onDragEnd={handleRobotDragEnd}
      onClick={handleShowRoom}
    >
      <RobotImage
        src={robotStyle.imgPath}
        alt="机器人"
        onMouseDown={handleChangeDown}
        onContextMenu={(e) => e.preventDefault()}
      />
      {isShowRobotSelection && (
        <RobotHeaderImgSelection
          handleChangeRobotStyle={handleChangeRobotStyle}
        />
      )}
      {isShowRoom && (
        <RobotSmallTalking
          performer={robotStyle.description.title}
          performerFeatures={robotStyle.description.content}
        />
      )}
    </RobotContainer>
  );
}

export default Robot;
