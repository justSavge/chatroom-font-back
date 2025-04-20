import { Button } from "antd";
import { useCustomizedUserInput } from "../../style/chatbox/useCustomizedUserInput";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentStoreData,
  setUserInputValue,
} from "../../store/globalSlice";
import { ioInstance } from "../../servers/websocket";

const PostButton = function ({ file, setFile }) {
  const { styles } = useCustomizedUserInput();
  const { userInputValue, myAccountData } = useSelector(getCurrentStoreData());
  const { account, name, custom = {} } = myAccountData;
  const { type, value } = userInputValue;
  console.log(userInputValue);
  const dispatch = useDispatch();
  const postMessage = function () {
    console.log(userInputValue);
    if (type === "text") {
      if (!value) return;
      ioInstance.emit("user-broadcast-message", {
        message: value,
        account,
        name,
        custom,
      });
    }

    if (type === "file") {
      if (!file) return;
      ioInstance.emit("user-broadcast-file", {
        message: { name: file.name, value: file },
        account,
        name,
        custom,
      });
    }
    setFile(null);
    dispatch(setUserInputValue({ type: "text", value: "" }));
  };
  return (
    <Button className={styles.putMessage} onClick={postMessage}>
      发出
    </Button>
  );
};
export default PostButton;
