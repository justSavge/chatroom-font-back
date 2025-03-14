import { ConfigProvider } from "antd";
import Introduce from "../features/home/Introduce";
import Login from "../features/home/Login";
import { HomeLayout } from "../style/layout/HomeLayout";

function Home({ setLoginData }) {
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
        <Login setLoginData={setLoginData} />
      </HomeLayout>
    </ConfigProvider>
  );
}

export default Home;
