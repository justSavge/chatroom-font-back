import { Button, Result } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function NotFound() {
  const navigate = useNavigate();
  const [time, setTime] = useState(4);
  setTimeout(() => {
    navigate("/");
  }, 5000);
  setTimeout(() => {
    setTime((time) => time - 1);
  }, 1000);
  return (
    <Result
      status="404"
      title="404"
      subTitle={`抱歉，该页面暂时没有内容，将于${time}秒后自动返回主页.`}
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          返回首页
        </Button>
      }
      style={{ backgroundColor: "rgba(37, 1, 77, 0.3)" }}
    />
  );
}

export default NotFound;
