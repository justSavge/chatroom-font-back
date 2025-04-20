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

const TalkingLayout = function ({ loginData }) {
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
  useInitSocketIo(loginData);
  // useEffect(() => {
  //   dispatch(getMyAccountData(loginData));
  //   const { account, name, custom } = loginData;
  //   ioInstance.emit("user-newUserJoin", { account, name, custom });
  //   ioInstance.on("server-broadcast-userslist", (msg) => {
  //     dispatch(setUserList(msg));
  //   });
  //   ioInstance.on("server-broadcast-message", (msg) => {
  //     const { senderId, custom = {}, name, message } = msg;
  //     dispatch(
  //       saveTalkingMessage(warpMessage(message, senderId, name, custom))
  //     );
  //   });
  //   ioInstance.on("server-toSelectUser-message", (msg) => {
  //     const {
  //       senderId,
  //       receiverId,
  //       message: { custom = {}, name, message, account },
  //     } = msg;
  //     // 是我发送的就使用receiverId作为键，不是我的就使用senderId作为键
  //     dispatch(
  //       saveSingleChatMessage({
  //         account,
  //         standardMessage: warpMessage(message, senderId, name, custom),
  //       })
  //     );
  //   });
  //   ioInstance.on("server-broadcast-file", (msg) => {
  //     const { senderId, custom = {}, name, message } = msg;
  //     dispatch(
  //       saveTalkingMessage(warpMessage(message, senderId, name, custom))
  //     );
  //   });
  //   ioInstance.on("server-broadcast-file_data", (msg) => {
  //     const { senderId, custom = {}, name, fileData } = msg;
  //     const blob = new Blob([fileData.data]);
  //     const fileUrl = URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.href = fileUrl;
  //     a.download = fileData.name;
  //     a.click();
  //     URL.revokeObjectURL(fileUrl);
  //     document.removeChild(a);
  //   });
  //   ioInstance.on("server-toSelectUser-request_self", (msg) => {
  //     const {
  //       senderId: myId,
  //       senderData,
  //       receiverId,
  //       receiverData: { name, account, custom = {} },
  //     } = msg;
  //     dispatch(
  //       handleWaitRequestFriendData({
  //         type: "add",
  //         data: { name, account, custom, receiverId, receiverStatus: "wait" },
  //       })
  //     );
  //   });
  //   ioInstance.on("server-toSelectUser-request_receiver", (msg) => {
  //     const {
  //       senderId,
  //       senderData,
  //       receiverI: myIdd,
  //       receiverData: { name, account, custom = {} },
  //     } = msg;
  //     dispatch(
  //       handleRequestFriendData({
  //         type: "add",
  //         data: { name, account, custom, senderId, receiverStatus: "wait" },
  //       })
  //     );
  //   });
  // }, []);
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
      <HeaderImage />
      <SignChat />
      <SingleChatModal />
    </FullPageLayout>
  );
};
export default TalkingLayout;
