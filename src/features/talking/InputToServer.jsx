import { Input } from "antd";
import { useCustomizedUserInput } from "../../style/chatbox/useCustomizedUserInput";
import { useLJStore } from "../../store/websocketStore";
import { memo } from "react";

const InputToServerMemo = memo(function InputToServerMemo({
  inputValue,
  getInputValue,
}) {
  const { styles } = useCustomizedUserInput();
  return (
    <div>
      <Input
        placeholder="no more 200 word"
        className={styles.inputStyle}
        value={inputValue}
        onChange={(e) => getInputValue(e.target.value)}
      />
    </div>
  );
});
const InputToServer = function () {
  const { getInputValue, inputValue } = useLJStore();
  return (
    <InputToServerMemo getInputValue={getInputValue} inputValue={inputValue} />
  );
};
export default InputToServer;
