import { Button } from "antd";
import { useCustomizedUserInput } from "../../style/chatbox/useCustomizedUserInput";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentStoreData,
  setUserInputValue,
} from "../../store/globalSlice";
import { ioInstance } from "../../servers/websocket";

const PostButton = function () {
  const { styles } = useCustomizedUserInput();
  const { userInputValue, myAccountData } = useSelector(getCurrentStoreData());
  const { account, name, custom = {} } = myAccountData;
  console.log(userInputValue);
  const dispatch = useDispatch();
  const postMessage = function () {
    console.log(userInputValue);
    if (userInputValue && userInputValue?.length) {
      ioInstance.emit("user-broadcast-message", {
        message: userInputValue,
        account,
        name,
        custom,
      });
    }
    dispatch(setUserInputValue(""));
  };
  return (
    <Button className={styles.putMessage} onClick={postMessage}>
      发出
    </Button>
  );
};
export default PostButton;
