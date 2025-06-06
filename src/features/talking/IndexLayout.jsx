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
  getCurrentStoreData,
  handleIsShowSingleChatModal,
} from "../../store/globalSlice";
import PostButton from "./PostButton";
import Robot from "./Robot";
import { useState } from "react";
import HeaderImage from "./HeaderImage";
import UserTalkingMessageBox from "./UserTalkingMessageBox";
import useRefBindDomChangeColor from "../../custom-hooks/useRefBindDomChangeColor";
import { defaultBGColor } from "../../lib/Talking/defaultColor";
import FileUpload from "./buttons/FileUpload";
import SignChat from "./signChat/SignChat";
import useInitSocketIo from "../../custom-hooks/useInitSocketIo";
import SingleChatModal from "./signChat/signleChatModal/SingleChatModal";

const TalkingLayout = function ({ loginData, setLoginData }) {
  const dispatch = useDispatch();
  const [file, setFile] = useState(""); //redux不可储存不可序列化对象，所以用state存储一下
  const { custom = {} } = useSelector(getCurrentStoreData("myAccountData"));
  const layoutBgColor = custom?.customBgColor?.layout || defaultBGColor.layout;
  const messageBoxBgColor =
    custom?.customBgColor?.messageBox || defaultBGColor.messageBox;
  const rightContainerBgColor =
    custom?.customBgColor?.rightContainer || defaultBGColor.rightContainer;
  const fullPageRef = useRefBindDomChangeColor("layout");
  const messageBoxRef = useRefBindDomChangeColor("messageBox");
  const rightContainerRef = useRefBindDomChangeColor("rightContainer");
  useInitSocketIo(loginData.data);
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
  const handleIClicksShowSingleChatModal = function (isShow) {
    return () => {
      dispatch(handleIsShowSingleChatModal(isShow));
    };
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
          <FileUpload file={file} setFile={setFile} />
          <PostButton file={file} setFile={setFile} />
        </InputLayout>
      </TalkingRoom>
      <Tips ref={rightContainerRef} TipsBackgroundColor={rightContainerBgColor}>
        <AwayButtonLayout>
          <CoolButton
            context="显示好友列表"
            handleClick={handleIClicksShowSingleChatModal(true)}
          />
          <CoolButton
            context="隐藏好友列表"
            handleClick={handleIClicksShowSingleChatModal(false)}
          />
        </AwayButtonLayout>
        <CounTimer onClick={() => backCenter.work++}>呼唤AI机器人</CounTimer>
      </Tips>
      <Robot defineProperty={defineProperty} />
      <HeaderImage setLoginData={setLoginData} />
      <SignChat />
      <SingleChatModal />
    </FullPageLayout>
  );
};
export default TalkingLayout;
