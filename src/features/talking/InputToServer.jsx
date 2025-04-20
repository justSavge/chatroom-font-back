import { Input } from "antd";
import { useCustomizedUserInput } from "../../style/chatbox/useCustomizedUserInput";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentStoreData,
  setUserInputValue,
} from "../../store/globalSlice";
import FileUpload from "./buttons/FileUpload";
import Filename from "./buttons/Filename";

const InputToServer = function () {
  const userInputValue = useSelector(getCurrentStoreData("userInputValue"));
  console.log(userInputValue);
  const { styles } = useCustomizedUserInput();
  const dispatch = useDispatch();
  const { type, value } = userInputValue;

  return (
    <div>
      {type === "text" && (
        <Input
          placeholder="尽情发言吧~"
          className={styles.inputStyle}
          value={value}
          onChange={(e) => {
            dispatch(
              setUserInputValue({ type: "text", value: e.target.value })
            );
          }}
        />
      )}
      {type === "file" && <Filename filename={value.name} />}
    </div>
  );
};
export default InputToServer;
