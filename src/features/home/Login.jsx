import { Button, Checkbox, Form, Input } from "antd";
import { LoginStyle } from "../../style/home/LoginStyle";
const Login = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [form] = Form.useForm();
  console.log(form);
  return (
    <LoginStyle>
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
          labelcolor
          rules={[
            {
              required: true,
              message: "请输入你的用户名!",
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
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </LoginStyle>
  );
};
export default Login;
