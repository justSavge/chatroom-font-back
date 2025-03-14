import ReactDom from "react-dom/client";
import App from "./App";
import "react-chat-elements/dist/main.css";

const root = document.querySelector("#root");
ReactDom.createRoot(root).render(<App />);
// ReactDom.createRoot(root).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
