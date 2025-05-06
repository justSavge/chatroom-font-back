import { Button, Checkbox, Form, Input, message } from "antd";
import { LoginStyle } from "../../style/home/LoginStyle";
import { useState } from "react";
import SwitchIsLogin from "./SwitchIsLogin";
import { useNavigate } from "react-router-dom";
import { userLogin, userRegister } from "../../servers/HomePageServer";

const Login = function ({ setLoginData }) {
  const [isLogin, setIsLogin] = useState(true);
  const [messageApi, _] = message.useMessage();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log("Success:", values);
    //TODO:传递给后端api,返回success才可以设为true，然后跳转到聊天室页面
    const serverResData = isLogin
      ? await userLogin(values)
      : await userRegister(values);
    const { isSuccess, data } = serverResData;
    if (isSuccess)
      setLoginData(() => {
        return { isSuccess: true, data, status: 200 };
      });
    else {
      setLoginData((old) => {
        return { isSuccess: false, ...old };
      });
    }
    console.log("处理以后的数据", serverResData);
    if (isSuccess && values.remember) {
      if (values.remember) {
        localStorage.setItem("account", values.account);
      }
      console.log("应该跳转了呀");
      navigate("/chat-room");
    } else {
      messageApi.error(serverResData.status + " " + serverResData.data);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  /**只接受true,false */
  const handleChangeLoginState = function (isLogin) {
    setIsLogin(isLogin);
  };
  return (
    <LoginStyle>
      <SwitchIsLogin
        onChangeLoginState={handleChangeLoginState}
        isLogin={isLogin}
      />
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
          account: localStorage.getItem("account"),
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {!isLogin && (
          <Form.Item
            label="用户名"
            name="name"
            rules={[
              {
                required: true,
                message: "请输入你的用户名!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}
        <Form.Item
          label="账号"
          name="account"
          rules={[
            {
              required: true,
              message: "请输入你的账号!",
            },
            {
              min: 8,
              message: "至少要八个字符哟~",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: "请输入你的密码!",
            },
            {
              min: 8,
              message: "至少要八个字符哟~",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          label={null}
          style={{
            textAlign: "left",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Checkbox style={{ width: "5rem", color: "white" }}>记住我</Checkbox>
        </Form.Item>
        <Form.Item
          label={null}
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button type="primary" htmlType="submit" onClick={() => {}}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </LoginStyle>
  );
};
export default Login;
