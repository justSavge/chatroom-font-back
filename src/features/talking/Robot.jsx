/* eslint-disable no-case-declarations */
import { useCallback, useEffect, useReducer } from "react";
import {
  RobotContainer,
  RobotImage,
} from "../../style/containerImage/RobotContainer";
import RobotSmallTalking from "./RobotSmallTalking";
const reducer = function (state, action) {
  switch (action.type) {
    case "startMovie":
      const { cursorX, cursorY } = action.payload;
      return {
        ...state,
        isMoving: true,
        currentCursorX: cursorX,
        currentCursorY: cursorY,
      };
    case "moving":
      if (!state.isMoving) return state;
      const { x, y } = action.payload;
      console.log(x, y, "xxxyyy");
      return { ...state, x: x, y: y, quickRes: "rejected" };
    case "movieOver":
      return {
        ...state,
        isMoving: false,
      };
    case "entry":
      return { ...state, isHadEntry: true };
    case "tenSecondGone":
      return { ...state, isTenSecondGone: true };
    case "changeOpenRoom":
      return {
        ...state,
        isShowRoom:
          action.payload === "resolved" ? !state.isShowRoom : state.isShowRoom,
        quickRes: action.payload,
      };
    default:
      return state;
  }
};
//以左下角为起点0，0，初始值1，1
const initizertion = {
  x: 80,
  y: window.innerHeight - 80,
  currentCursorX: 0,
  currentCursorY: 0,
  isMoving: false,
  isHadEntry: false,
  isTenSecondGone: false,
  quickRes: "pendding",
  isShowRoom: false,
  // quickClickTimer: null,
};
function Robot() {
  const [state, dispatch] = useReducer(reducer, initizertion);
  const {
    x,
    y,
    isMoving,
    isHadEntry,
    isTenSecondGone,
    currentCursorX,
    currentCursorY,
    isShowRoom,
    quickRes,
    // quickClickTimer,
  } = state;
  let quickClickTimer = null;
  const handleMouseMove = useCallback(
    (e) => {
      const nowX = e.pageX - currentCursorX;
      const nowY = e.pageY - currentCursorY;
      let x =
        e.pageX > window.innerWidth - 80
          ? window.innerWidth - 80
          : e.pageX < 10
          ? 10
          : nowX;

      let y =
        e.pageY > window.innerHeight - 80
          ? window.innerHeight - 80
          : e.pageY < 80
          ? 10
          : nowY;
      dispatch({
        type: "moving",
        payload: {
          x: x, //67是元素的宽度
          y: y,
        },
      });
    },
    [currentCursorX, currentCursorY]
  );
  const handleMouseUp = useCallback(function (e) {
    dispatch({ type: "movieOver" });
  }, []);
  useEffect(() => {
    if (isMoving) {
      console.log(state.x, state.y, state.isMoving);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      console.log(window);
    }
  }, [isMoving]);
  useEffect(() => {
    console.log(isHadEntry, "isHadEntry");
    const timer = setTimeout(() => {
      dispatch({ type: "tenSecondGone" });
    }, 500);
    return () => clearTimeout(timer);
  }, [isHadEntry]);

  const handleMouseDown = function (e) {
    e.preventDefault();
    dispatch({
      type: "startMovie",
      payload: {
        cursorX: e.pageX - e.currentTarget.getBoundingClientRect().left,
        cursorY: e.pageY - e.currentTarget.getBoundingClientRect().top,
      },
    });
  };
  const handleChangeDown = function () {
    dispatch({ type: "changeOpenRoom", payload: "pendding" });
    quickClickTimer = setTimeout(() => {
      dispatch({ type: "changeOpenRoom", payload: "rejected" });
    }, 500);
  };
  const handleChangeUp = function () {
    if (quickRes === "pendding")
      dispatch({ type: "changeOpenRoom", payload: "resolved" });
    clearTimeout(quickClickTimer);
  };
  return (
    <RobotContainer
      x={x}
      y={y}
      $allowshow={`${!isTenSecondGone}`}
      onMouseDown={(e) => {
        handleMouseDown(e);
      }}
      onMouseEnter={() => {
        dispatch({ type: "entry" });
      }}
    >
      <RobotImage
        src="/image/robot.svg"
        alt=":)"
        onMouseDown={handleChangeDown}
        onMouseUp={handleChangeUp}
      />
      {isShowRoom && <RobotSmallTalking />}
    </RobotContainer>
  );
}

export default Robot;
