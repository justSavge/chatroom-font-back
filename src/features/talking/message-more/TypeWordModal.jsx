import { useEffect, useRef, useState } from "react";
import {
  aiMessageTemFunc,
  AIws,
  handleAiWSResponseStatusAndContent,
} from "../../../servers/AI/websocket-stream";
import { createPortal } from "react-dom";
import { Modal } from "antd";
import styled from "styled-components";
const BlackBG = styled.div`
  position: fixed;
  inset: 0;
  backdrop-filter: blur(2px);
  z-index: 999;
`;
const More = styled.div`
  position: absolute;
  width: 40rem;
  height: 42rem;
  left: 50vw;
  top: 50vh;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
`;
const Container = styled.div`
  width: 40rem;
  height: 30rem;
  background-color: #cdc2c2;
  color: #30303087;
  font-weight: 600;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  z-index: 999;
  &::-webkit-scrollbar {
    width: 1px;
  }
`;
const Close = styled.div`
  width: 100%;
  height: 2rem;
  text-align: end;
  right: 0;
  top: 0;
`;
const Img = styled.img`
  width: 3rem;
  height: 3rem;
`;
const Span = styled.span`
  margin-top: 2rem;
  font-size: 1.5rem;
  color: #7d7196;
  `;
const Button = styled.button`
  width: 4rem;
  height: 2rem;
  font-size: 1.3rem;
  border: none;
  color: #e8e8e8;
  background-color: #5893da;
  border-radius: 0.2rem;
`;
function TypeWordModal({ text, fOS, handleTypeModal }) {
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
  const { performer, performerFeatures } = {
    feel: {
      performer: "情感大师",
      performerFeatures: "擅长分析情感问题，为客户给出合理的情感解析",
    },
    suggestion: {
      performer: "回复建议者",
      performerFeatures: "是一个擅长回复聊天的高情商人士，为消息回复",
    },
  }[fOS];
  const baseText = {
    feel: "以下将解析选择文本的情感",
    suggestion: "以下推荐为用户消息回复",
  }[fOS];
  const handleMessage = function (responseData) {
    const [status, content] = handleAiWSResponseStatusAndContent(responseData);
    console.log("监听所得文本", content);
    setMessageObj((msg) => {
      msg.allText += content;
      msg.surplusText += content;
      if (status === 2) msg.isResponseEnd = true;
      return { ...msg };
    });
  };
  const closeModal = () => handleTypeModal(false);
  useEffect(() => {
    const standardData = aiMessageTemFunc(text, performer, performerFeatures);
    const ws = new AIws(standardData, handleMessage);
    return () => {
      console.log("我被卸载了");
      ws?.close();
    };
  }, []);

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
    <BlackBG>
      <More>
        <Close>
          <Button onClick={closeModal}>关闭</Button>
        </Close>
        <Container>
          <Span>{baseText}</Span>
          {messageObj.showText.length === 0 ? (
            <span>
              思考中~
              <Img src="/image/loading.gif" alt="loading" />
            </span>
          ) : (
            <Span>{messageObj.showText}</Span>
          )}
        </Container>
      </More>
    </BlackBG>
  );
}

export default TypeWordModal;
