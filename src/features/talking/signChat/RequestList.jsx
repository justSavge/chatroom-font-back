import { useDispatch, useSelector } from "react-redux";
import { Icon, Img, Item, List } from "./style/util";
import {
  getCurrentStoreData,
  handleRequestFriendData,
} from "../../../store/globalSlice";
import { ioInstance } from "../../../servers/websocket";
const Fulfilled = "fulfilled";
const Rejected = "rejected";
const Wait = "wait";
function RequestList() {
  const dispatch = useDispatch();
  const requestList = useSelector(getCurrentStoreData("requestFriendData"));
  console.log("更新requestList", requestList);
  // 我希望回复之后的效果
  // 1.对于尝试加好友的人即发送者，发送者需要收到这个 同意/拒绝,转化状态
  // 2.对于接收者而言 需要移除已经处理过的消息，注意！不是在点击的时候移除 而是在io上接收到 自己->服务器->自己 以后再监听事件之后移除
  // 所以我要做的就是向user-toSelectUser-answer发送字段
  // 字段要求:{senderId,receiverId,receiverStatus:wait|fulfilled|rejected}
  const handleFriendRequest = function (senderId, receiverStatus) {
    // 我是 receiver
    const responseForFriendRequest = {
      receiverId: ioInstance.id,
      senderId,
      receiverStatus,
    };
    return () => {
      console.log("点击发送", responseForFriendRequest);
      ioInstance.emit("user-toSelectUser-answer", responseForFriendRequest);
    };
  };
  const handleClickDeleteHistory = (senderId) => {
    return () => {
      dispatch(handleRequestFriendData({ type: "delete", data: { senderId } }));
    };
  };
  return (
    <List>
      {requestList.length ? (
        requestList.map((item) => {
          const { name, custom = {}, senderId, receiverStatus } = item;
          const headImg =
            "/image/header/" + (custom?.headImage || "header-default.png");
          return (
            <Item key={senderId}>
              <Img src={headImg} alt="headImg" />
              <span>{name}</span>
              {receiverStatus === Wait && (
                <>
                  <Icon
                    src="/image/icon/agree.svg"
                    alt="同意"
                    onClick={handleFriendRequest(senderId, Fulfilled)}
                  />
                  <Icon
                    src="/image/icon/disagree.svg"
                    alt="拒绝"
                    onClick={handleFriendRequest(senderId, Rejected)}
                  />
                </>
              )}
              {receiverStatus === Fulfilled && (
                <>
                  <span>已经同意</span>
                  <Img
                    src="/image/icon/delete.svg"
                    onClick={handleClickDeleteHistory(senderId)}
                  />
                </>
              )}
              {receiverStatus === Rejected && (
                <>
                  <span>已经拒绝</span>
                  <Img
                    src="/image/icon/delete.svg"
                    onClick={handleClickDeleteHistory(senderId)}
                  />
                </>
              )}
            </Item>
          );
        })
      ) : (
        <span>暂无好友请求~</span>
      )}
    </List>
  );
}

export default RequestList;
