import {
  AwayButtonLayout,
  CoolButton,
  CounTimer,
  FullPageLayout,
  TalkingRoom,
  Tips,
} from "../../style/layout/TalkingLayoutStyle";
import { useDispatch, useSelector } from "react-redux";
import { InputLayout } from "../../style/layout/InputLayout";
import InputToServer from "./InputToServer";
import {
  addOneToOneChatData,
  getCurrentStoreData,
  getMyAccountData,
  saveTalkingMessage,
  setUserList,
} from "../../store/globalSlice";
import PostButton from "./PostButton";
import Robot from "./Robot";
import { useEffect } from "react";
import HeaderImage from "./HeaderImage";
import { ioInstance } from "../../servers/websocket";
import UserTalkingMessageBox from "./UserTalkingMessageBox";
import { warpMessage } from "../../servers/serverUtil";
import useRefBindDomChangeColor from "../../custom-hooks/useRefBindDomChangeColor";
import { defaultBGColor } from "../../lib/Talking/defaultColor";

const TalkingLayout = function ({ loginData }) {
  const dispatch = useDispatch();
  const { custom = {} } = useSelector(getCurrentStoreData("myAccountData"));
  const layoutBgColor = custom?.customBgColor?.layout || defaultBGColor.layout;
  const messageBoxBgColor =
    custom?.customBgColor?.messageBox || defaultBGColor.messageBox;
  const rightContainerBgColor =
    custom?.customBgColor?.rightContainer || defaultBGColor.rightContainer;
  const fullPageRef = useRefBindDomChangeColor("layout");
  const messageBoxRef = useRefBindDomChangeColor("messageBox");
  const rightContainerRef = useRefBindDomChangeColor("rightContainer");
  useEffect(() => {
    dispatch(getMyAccountData(loginData));
    const { account, name, custom } = loginData;
    ioInstance.emit("user-newUserJoin", { account, name, custom });
    ioInstance.on("server-broadcast-userslist", (msg) => {
      dispatch(setUserList(msg));
    });
    ioInstance.on("server-broadcast-message", (msg) => {
      const { senderId, custom = {}, name, message } = msg;
      dispatch(
        saveTalkingMessage(warpMessage(message, senderId, name, custom))
      );
    });
    ioInstance.on("server-toSelectUser-message", (msg) => {
      const { senderId, custom = {}, name, message, account } = msg;
      dispatch(
        addOneToOneChatData(
          account,
          warpMessage(message, senderId, name, custom)
        )
      );
    });
  }, []);
  let backCenter = {
    work: 1,
  };
  /**
   * 当上面的backCenter.work变化的时候，触发传入函数
   * @param {Function} handleOnChange
   */
  const defineProperty = (handleOnChange) => {
    let value = backCenter.work;
    Object.defineProperty(backCenter, "work", {
      get: () => value,
      set: (newV) => {
        const oldV = value;
        if (oldV !== newV) {
          value = newV;
          handleOnChange();
        }
      },
      enumerable: true,
      configurable: true,
    });
  };

  return (
    <FullPageLayout
      fullPageLayoutBackgroundColor={layoutBgColor}
      ref={fullPageRef}
    >
      <TalkingRoom
        TalkingRoomBackgroundColor={messageBoxBgColor}
        ref={messageBoxRef}
      >
        <UserTalkingMessageBox />
        <InputLayout>
          <InputToServer />
          <PostButton />
        </InputLayout>
      </TalkingRoom>
      <Tips ref={rightContainerRef} TipsBackgroundColor={rightContainerBgColor}>
        <AwayButtonLayout>
          <CoolButton context="离开" />
          <CoolButton context="摧毁" />
        </AwayButtonLayout>
        <CounTimer onClick={() => backCenter.work++}>呼唤AI机器人</CounTimer>
      </Tips>
      <Robot defineProperty={defineProperty} />
      <HeaderImage />
    </FullPageLayout>
  );
};
export default TalkingLayout;
