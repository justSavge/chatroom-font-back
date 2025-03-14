import { Input } from "antd";
import { useCustomizedUserInput } from "../../style/chatbox/useCustomizedUserInput";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentStoreData,
  setUserInputValue,
} from "../../store/globalSlice";

const InputToServer = function () {
  const { userInputValue } = useSelector(getCurrentStoreData());
  console.log(userInputValue);
  const { styles } = useCustomizedUserInput();
  const dispatch = useDispatch();
  return (
    <div>
      <Input
        placeholder="尽情发言吧~"
        className={styles.inputStyle}
        value={userInputValue}
        onChange={(e) => {
          dispatch(setUserInputValue(e.target.value));
        }}
      />
    </div>
  );
};
export default InputToServer;
