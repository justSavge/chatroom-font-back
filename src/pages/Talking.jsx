import { Provider } from "react-redux";
import store from "../store/userStore";
import TalkingLayout from "../features/talking/IndexLayout";

function Talking({ loginData }) {
  return (
    <Provider store={store}>
      <TalkingLayout loginData={loginData} />
    </Provider>
  );
}

export default Talking;
