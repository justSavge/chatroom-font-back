import { useDispatch, useSelector } from "react-redux";
import { Img, Item, List } from "./style/util";
import { getCurrentStoreData, handleCurrChooseFriendId } from "../../../store/globalSlice";

function FriendList() {
  const dispatch = useDispatch();
  const singleChatData = useSelector(getCurrentStoreData("singleChatData"));
  const handleChangeCurrFriendId = function (id) {
    return () => dispatch(handleCurrChooseFriendId(id));
  };
  const friendList = Object.entries(singleChatData).map((item) => {
    return item[1].information;
  });
  return (
    <List>
      {friendList?.map((item) => {
        const { id, name, custom } = item;
        const img = "/image/header/" + (custom?.headImage || "header-cat.png");
        return (
          <Item key={id} onClick={handleChangeCurrFriendId(id)}>
            <Img src={img} alt="头像" />
            <span>{name}</span>
          </Item>
        );
      })}
      {friendList.length === 0 && <span>还没有好友哟~</span>}
    </List>
  );
}

export default FriendList;
