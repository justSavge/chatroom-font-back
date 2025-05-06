import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyAccountData,
  handleRequestFriendData,
  handleSingleChatMessage,
  handleWaitRequestFriendData,
  saveTalkingMessage,
  setUserList,
} from "../store/globalSlice";
import { ioInstance } from "../servers/websocket";
import { warpMessage } from "../servers/serverUtil";

function useInitSocketIo(loginData) {
  const dispatch = useDispatch();
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
      const {
        senderId,
        receiverId,
        message: { custom = {}, name, message, account },
      } = msg;
      // 是我发送的就使用receiverId作为键，不是我的就使用senderId作为键
      // dispatch(
      //   saveSingleChatMessage({
      //     account,
      //     standardMessage: warpMessage(message, senderId, name, custom),
      //   })
      // );
    });
    ioInstance.on("server-broadcast-file", (msg) => {
      const { senderId, custom = {}, name, message } = msg;
      dispatch(
        saveTalkingMessage(warpMessage(message, senderId, name, custom))
      );
    });
    ioInstance.on("server-broadcast-file_data", (msg) => {
      const { senderId, custom = {}, name, fileData } = msg;
      const blob = new Blob([fileData.data]);
      const fileUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = fileData.name;
      a.click();
      URL.revokeObjectURL(fileUrl);
      document.removeChild(a);
    });
    ioInstance.on("server-toSelectUser-request_self", (msg) => {
      const {
        senderId: myId,
        senderData,
        receiverId,
        receiverData: { name, account, custom = {} },
      } = msg;
      dispatch(
        handleWaitRequestFriendData({
          type: "add",
          data: { name, account, custom, receiverId, receiverStatus: "wait" },
        })
      );
    });
    ioInstance.on("server-toSelectUser-request_receiver", (msg) => {
      const {
        senderId,
        senderData: { name, account, custom = {} },
        receiverId: myId,
        receiverData,
      } = msg;
      dispatch(
        handleRequestFriendData({
          type: "add",
          data: { name, account, custom, senderId, receiverStatus: "wait" },
        })
      );
    });
    ioInstance.on("server-toSelectUser-answer_self", (msg) => {
      const { senderId, receiverId: myId, receiverStatus, senderData } = msg;
      dispatch(
        handleRequestFriendData({
          type: "updateStatus",
          data: { senderId, receiverStatus, senderData },
        })
      );
    });
    ioInstance.on("server-toSelectUser-answer_requester", (msg) => {
      const { senderId: myId, receiverId, receiverStatus, receiverData } = msg;
      dispatch(
        handleWaitRequestFriendData({
          type: "updateStatus",
          data: { receiverId, receiverStatus, receiverData },
        })
      );
    });
    ioInstance.on("server-toSelectUser-message_receiver", (msg) => {
      const { senderId, receiverId, message } = msg;
      //  {senderId, receiverId, isMeSend, message}
      const chatData = { senderId, receiverId, message, isMeSend: false };
      dispatch(handleSingleChatMessage(chatData));
    });
    ioInstance.on("server-toSelectUser-message_sender", (msg) => {
      const { senderId, receiverId, message } = msg;
      //  {senderId, receiverId, isMeSend, message}
      const chatData = { senderId, receiverId, message, isMeSend: true };
      dispatch(handleSingleChatMessage(chatData));
    });
  }, []);
}

export default useInitSocketIo;
