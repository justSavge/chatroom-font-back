import { Sign, SwitchLayout } from "../../style/home/SwitchLayoutStyle";

function SwitchIsLogin({ onChangeLoginState, isLogin }) {
  return (
    <SwitchLayout>
      <Sign
        hasclick={isLogin ? "1" : "0"}
        onClick={() => onChangeLoginState(true)}
      >
        登录
      </Sign>
      <Sign
        hasclick={!isLogin ? "1" : "0"}
        onClick={() => onChangeLoginState(false)}
      >
        注册
      </Sign>
    </SwitchLayout>
  );
}

export default SwitchIsLogin;
