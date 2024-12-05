import { Button } from "antd";
import { useCustomizedUserInput } from "../../style/chatbox/useCustomizedUserInput";
import { useLJStore } from "../../store/websocketStore";
import { memo } from "react";

const PostButtonMemo = memo(function PostButtonMemo({
  sendMessage,
  getInputValue,
  inputValue,
}) {
  const { styles } = useCustomizedUserInput();
  const postMessage = function () {
    sendMessage(inputValue);
    getInputValue("");
  };
  return (
    <Button className={styles.putMessage} onClick={postMessage}>
      发出
    </Button>
  );
});
const PostButton = function () {
  const { sendMessage, inputValue, getInputValue } = useLJStore();
  return (
    <PostButtonMemo
      sendMessage={sendMessage}
      inputValue={inputValue}
      getInputValue={getInputValue}
    />
  );
};
export default PostButton;
