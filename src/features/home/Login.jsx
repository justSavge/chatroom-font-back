import { Button, Checkbox, Form, Input } from "antd";
import { LoginStyle } from "../../style/home/LoginStyle";
import { useState } from "react";
import SwitchIsLogin from "./SwitchIsLogin";
import { useNavigate } from "react-router-dom";
// import { useLJStore } from '../../store/websocketStore';

const Login = function ({ setIsSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate()
  const onFinish = (values) => {
    console.log("Success:", values);
    //TODO:传递给后端api,返回success才可以设为true，然后跳转到聊天室页面
    setIsSuccess(true);
    navigate('/chat-room');
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  /**只接受true,false */
  const handleChangeLoginState = function (isLogin) {
    setIsLogin(isLogin);
  };
  const [form] = Form.useForm();
  console.log(form);
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
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: "请输入你的用户名!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {!isLogin && (
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              {
                required: true,
                message: "请输入你的邮箱!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}
        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: "请输入你的密码!",
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
