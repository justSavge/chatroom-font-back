import { ConfigProvider } from "antd";
import Introduce from "../features/home/Introduce";
import Login from "../features/home/Login";
import { HomeLayout } from "../style/layout/HomeLayout";

function Home({ setIsSuccess }) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelColor: "white",
          },
        },
      }}
    >
      <HomeLayout>
        <Introduce />
        <Login setIsSuccess={setIsSuccess} />
      </HomeLayout>
    </ConfigProvider>
  );
}

export default Home;
