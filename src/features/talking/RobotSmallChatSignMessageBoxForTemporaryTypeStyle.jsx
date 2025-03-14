import { MessageBox } from "react-chat-elements";
import {
  AIws,
  handleAiWSResponseStatusAndContent,
  saveMessageForRobotInReduxStore,
} from "../../servers/AI/websocket-stream";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
/** 在每次用户发送消息以后出现，确保在发送信息以后可以立刻接收到所有数据，此时正好开始接受返回数据 */
function RobotSmallChatSignMessageBoxForTemporaryTypeStyle({
  handleCloseTypeBox,
  saveMessageInRobotStoreAndClearInputValue,
}) {
  const dispatch = useDispatch();
  const [messageObj, setMessageObj] = useState({
    /** 所有文本 */
    allText: "",
    /** 剩余为展示文本 */
    surplusText: "",
    /** 展示在打字框的文本 */
    showText: "",
    isResponseEnd: false,
    //仅仅是ws返回数据是否结束，而不是‘打字’效果结束,需要surplusText.length===0&&isResponseEnd===true才意味着完成本次交流
  });
  const isEnterTextInStore = useRef(false);
  const handleAiWsResponseAnswerFunc = function (responseData) {
    const [status, content] = handleAiWSResponseStatusAndContent(responseData);
    console.log("监听所得文本", content);
    setMessageObj((msg) => {
      msg.allText += content;
      msg.surplusText += content;
      if (status === 2) msg.isResponseEnd = true;
      return { ...msg };
    });
  };
  useEffect(() => {
    const standardData = saveMessageInRobotStoreAndClearInputValue();
    const ws = new AIws(standardData, handleAiWsResponseAnswerFunc);
    return () => {
      console.log("我被卸载了");
      ws?.close();
    };
  }, []);
  if (
    messageObj.isResponseEnd &&
    messageObj.surplusText.length === 0 &&
    isEnterTextInStore.current === false
  ) {
    isEnterTextInStore.current = true;
    handleCloseTypeBox();
    saveMessageForRobotInReduxStore(dispatch, messageObj.allText, "", "robot");
  }

  // 5s - 默认渲染完剩余文本的时间
  // 每次渲染都会导致这个时间改变
  // 获得最后一个文本内容之后修改时间为100ms
  // min:100ms max:1000ms
  const beforeAdjustTypeWordTime = messageObj.surplusText.length
    ? Math.floor(5000 / messageObj.surplusText.length)
    : 1000;
  const afterAdjustTypeWordTime = messageObj.isResponseEnd
    ? 100
    : beforeAdjustTypeWordTime > 1000
    ? 1000
    : beforeAdjustTypeWordTime < 100
    ? 100
    : beforeAdjustTypeWordTime;
  // 两种情况会出现一次打出文本的字数大于1
  // 1. surplusText.length >= 10 字/s(最大每秒打字速度) * 10s(理论上是5s打完剩余文本，100字太多了)
  // 此时每次渲染触发输出文本量为
  // 2. isResponseEnd = true && surplusText.length >= 10 字/s * 3s(获得最后文本内容之后3s内打完剩余文本)
  const beforeAdjustTypeWordEachRender = messageObj.isResponseEnd
    ? Math.floor(messageObj.surplusText.length / 30)
    : Math.floor(messageObj.surplusText.length / 50);
  const beforeAdjustTypeWordEachRenderSetMin =
    beforeAdjustTypeWordEachRender < 1 ? 1 : beforeAdjustTypeWordEachRender;
  const afterAdjustTypeWordEachRender =
    messageObj.isResponseEnd && messageObj.surplusText.length > 30
      ? beforeAdjustTypeWordEachRender
      : messageObj.surplusText.length > 100
      ? beforeAdjustTypeWordEachRenderSetMin
      : 1;
  useEffect(() => {
    let timer;
    if (messageObj.surplusText.length)
      timer = setTimeout(() => {
        console.log("触发一次渲染ing");
        setMessageObj((msg) => {
          const giveWord = msg.surplusText.slice(
            0,
            afterAdjustTypeWordEachRender
          );
          msg.surplusText = msg.surplusText.slice(
            afterAdjustTypeWordEachRender
          );
          msg.showText += giveWord;
          return { ...msg };
        });
      }, afterAdjustTypeWordTime);
    return () => {
      clearTimeout(timer);
    };
  }, [afterAdjustTypeWordTime, afterAdjustTypeWordEachRender, messageObj]);
  console.log("得道返回的解析文本", messageObj.showText);
  return (
    <>
      {!!messageObj.showText.length && (
        <MessageBox
          type="text"
          title="robot"
          position="left"
          text={messageObj.showText}
          styles={{ whiteSpace: "pre-line", color: "#323232" }}
        />
      )}
    </>
  );
}

export default RobotSmallChatSignMessageBoxForTemporaryTypeStyle;
