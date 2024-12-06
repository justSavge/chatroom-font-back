import { Sign, SwitchLayout } from '../../style/home/SwitchLayoutStyle';

function SwitchIsLogin({ onChangeLoginState, isLogin }) {
  return (
    <SwitchLayout>
      <Sign isClick={isLogin} onClick={() => onChangeLoginState(true)}>
        登录
      </Sign>
      <Sign isClick={!isLogin} onClick={() => onChangeLoginState(false)}>
        注册
      </Sign>
    </SwitchLayout>
  );
}

export default SwitchIsLogin;
