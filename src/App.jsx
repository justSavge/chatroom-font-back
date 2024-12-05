import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Talking from "./pages/Talking";
import GlobalStyle from "./style/GlobalStyled";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "chat",
      element: <Talking />,
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
