import { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
// import { TalkingQueue } from "../util/TalkingQueue";

export const MyStore = createContext(null);
const reducer = function (state, action) {
  switch (action.type) {
    case 'saveTalkingMessage':
      return {
        ...state,
        talkingData: [...state.talkingData, action.payload],
      };
    case 'saveRobotMessage':
      return {
        ...state,
      };
    case 'changeIsBothHere':
      return { ...state, talkingData: [], bothHere: true };
    case 'fromBothToAlone':
      return { ...state, bothHere: false };
    case 'getInputValue':
      return { ...state, inputValue: action.payload };
    case 'successLogin':
      return { ...state, isSuccess: true };
    default:
      return state;
  }
};
const initiztion = {
  talkingData: [],
  robotTalkingData: [],
  bothHere: false, //其实主要作用就是阻止输入框的输入，当然服务端也会筛选一次，如果只有一个人，发送的消息不会出现,
  inputValue: '',
  isSuccess: false,
};
/**
 *
 * @param {import('socket.io-client').Socket} io
 * @returns
 */
export const CreateTalkingContextProvider = function (io) {
  return function TalkingContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initiztion);
    const { talkingData, robotTalkingData, inputValue, isSuccess } = state;
    //将服务端发送的数据储存到talkingData
    /**
     * @param {{timeStamp:Date,sender:string,message:string}} signMessage
     * @param {string} who 默认是human,使用主对话，只要不是human就会进入机器人对话
     */
    useEffect(() => {
      //接受服务器信息部分
      io.on('connect', () => {
        console.log('成功与后端建立连接');
      });
      io.on('messageHuman', (message) => {
        console.log(message);
        dispatch({ type: 'saveTalkingMessage', payload: message });
      });
      io.on('messageAI', (message) => {
        dispatch({ type: 'saveRobotMessage', payload: message });
      });
      return () => io.close();
    }, []);

    /**
     * @param {string} message 传入message就行，时间戳，id都自动生成
     */
    const sendMessage = useCallback(function (message) {
      io.emit('message', {
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
      dispatch({ type: 'getInputValue', payload: inputData });
    }, []);
    /**第一个参数是确定是 true/false 登录/注册 ,第二个参数填入表单数据即可
     * @returns 正确的话返回对应的用户名，偏好（？后续可能会加入选择头像功能）,不好说可能后续会加入context,不会返回结果
     */
    const submitLoginOrRegister = useCallback(
      () =>
        async function (isLogin, formData) {
          try {
            // 先搞不了api,返回正确的得了
            if (true) {
              dispatch({ type: 'successLogin' });
              return true;
            }
            const userJson = await fetch(`${isLogin ? '登录的api' : '注册的api'}`, {
              methods: 'POST',
              body: {
                data: formData,
              },
            });
            const user = await userJson.json();
            dispatch({ type: 'successLogin' });
            return user;
          } catch (error) {
            console.log(error);
            throw new Error('用户账号/密码错误');
          }
        },
      [],
    );
    return (
      <MyStore.Provider
        value={{
          talkingData,
          robotTalkingData,
          sendMessage,
          getInputValue,
          inputValue,
          myScoketID: io.id,
          submitLoginOrRegister,
          isSuccess,
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
