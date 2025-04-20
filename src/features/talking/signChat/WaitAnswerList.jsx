import styled from "styled-components";
import { Icon, Img, Item, List } from "./style/util";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentStoreData,
  handleWaitRequestFriendData,
} from "../../../store/globalSlice";
const Wait = "wait";
function WaitAnswerList() {
  const dispatch = useDispatch();
  const waitAnswerList = useSelector(
    getCurrentStoreData("waitRequestFriendData")
  );
  const receiverText = {
    wait: "等待回复",
    fulfilled: "已加入",
    rejected: "已拒绝",
  };
  const handleClickDeleteHistory = (receiverId) => {
    return () => {
      dispatch(
        handleWaitRequestFriendData({ type: "delete", data: { receiverId } })
      );
    };
  };
  return (
    <List>
      {waitAnswerList.length ? (
        waitAnswerList.map((item) => {
          const {
            name,
            account,
            custom = {},
            receiverStatus,
            receiverId,
          } = item;
          const headImg =
            "/image/header/" + (custom?.headImage || "header-default.png");
          return (
            <Item key={account}>
              <Img src={headImg} alt="img" />
              <span>{name}</span>
              <span>{receiverText[receiverStatus]}</span>
              {receiverStatus !== Wait && (
                <Img
                  src="/image/icon/delete.svg"
                  onClick={handleClickDeleteHistory(receiverId)}
                />
              )}
            </Item>
          );
        })
      ) : (
        <span>暂无好友申请~</span>
      )}
    </List>
  );
}

export default WaitAnswerList;
