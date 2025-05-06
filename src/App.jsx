import { useEffect, useState } from "react";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Talking from "./pages/Talking";
import GlobalStyle from "./style/GlobalStyled";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const [loginData, setLoginData] = useState({
    status: 0,
    data: {},
    isSuccess: false,
  });
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home setLoginData={setLoginData} />,
    },
    {
      path: "chat-room",
      element: <Talking loginData={loginData} setLoginData={setLoginData} />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
