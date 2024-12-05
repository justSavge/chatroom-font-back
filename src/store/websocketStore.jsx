import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
// import { TalkingQueue } from "../util/TalkingQueue";

export const MyStore = createContext(null);
const reducer = function (state, action) {
  switch (action.type) {
    case "saveTalkingMessage":
      return {
        ...state,
        talkingData: [...state.talkingData, action.payload],
      };
    case "saveRobotMessage":
      return {
        ...state,
      };
    case "changeIsBothHere":
      return { ...state, talkingData: [], bothHere: true };
    case "fromBothToAlone":
      return { ...state, bothHere: false };
    case "getInputValue":
      return { ...state, inputValue: action.payload };
    default:
      return state;
  }
};
const initiztion = {
  talkingData: [],
  robotTalkingData: [],
  bothHere: false, //其实主要作用就是阻止输入框的输入，当然服务端也会筛选一次，如果只有一个人，发送的消息不会出现,
  inputValue: "",
};
/**
 *
 * @param {import('socket.io-client').Socket} io
 * @returns
 */
export const CreateTalkingContextProvider = function (io) {
  return function TalkingContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initiztion);
    const { talkingData, robotTalkingData, inputValue } = state;
    //将服务端发送的数据储存到talkingData
    /**
     * @param {{timeStamp:Date,sender:string,message:string}} signMessage
     * @param {string} who 默认是human,使用主对话，只要不是human就会进入机器人对话
     */
    useEffect(() => {
      //接受服务器信息部分
      io.on("connect", () => {
        console.log("成功与后端建立连接");
      });
      io.on("messageHuman", (message) => {
        console.log(message);
        dispatch({ type: "saveTalkingMessage", payload: message });
      });
      io.on("messageAI", (message) => {
        dispatch({ type: "saveRobotMessage", payload: message });
      });
      return () => io.close();
    }, []);

    /**
     * @param {string} message 传入message就行，时间戳，id都自动生成
     */
    const sendMessage = useCallback(function (message) {
      io.emit("message", {
        timeStamp: Date.now(),
        message: message,
        sender: io.id, //连接的时候客户端自动获得，无需手动添加，，这就是使用三方库的乐趣呀
      });
    }, []);
    // const sendAIMessage = useCallback(async function (question) {
    //   saveMessageStore(
    //     {
    //       timeStamp: Date.now(),
    //       sender: "human",
    //       message: question,
    //     },
    //     "robot"
    //   );
    //   const answer = await sendAIQuestion(question);
    //   saveMessageStore(
    //     {
    //       timeStamp: Date.now(),
    //       sender: "AI",
    //       message: answer,
    //     },
    //     "robot"
    //   );
    // }, []);
    /**
     * 纠结的选择，但是核心思想就是简洁平滑，还是在全局流转比较优美，于是在这里存取输入框数据
     * @param {string} inputData 接受输入框数据即可
     */
    const getInputValue = useCallback(function (inputData) {
      dispatch({ type: "getInputValue", payload: inputData });
    }, []);
    return (
      <MyStore.Provider
        value={{
          talkingData,
          robotTalkingData,
          sendMessage,
          getInputValue,
          inputValue,
          myScoketID:io.id
        }}
      >
        {children}
      </MyStore.Provider>
    );
  };
};

export const useLJStore = function () {
  const data = useContext(MyStore);
  return data;
};
