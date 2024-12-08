import { useState } from "react";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Talking from "./pages/Talking";
import GlobalStyle from "./style/GlobalStyled";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const [isSuccess, setIsSuccess] = useState(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home setIsSuccess={setIsSuccess} />,
    },
    {
      path: "chat-room",
      element: <Talking isSuccess={isSuccess} />,
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
