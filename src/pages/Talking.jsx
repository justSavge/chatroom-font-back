import { Provider } from "react-redux";
import store from "../store/userStore";
import TalkingLayout from "../features/talking/IndexLayout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Talking({ loginData, setLoginData }) {
  const navigate = useNavigate();
  console.log(loginData, "loginData");
  useEffect(() => {
    if (!loginData.isSuccess) {
      console.log("跳转！！！！");
      console.log("loginData", loginData);
      navigate("/");
      return;
    }
  }, [loginData.isSuccess]);
  if (!loginData.isSuccess) return;
  return (
    <Provider store={store}>
      <TalkingLayout loginData={loginData} setLoginData={setLoginData} />
    </Provider>
  );
}

export default Talking;
