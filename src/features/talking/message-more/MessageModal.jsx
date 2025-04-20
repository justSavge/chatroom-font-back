import { message } from "antd";
import styled from "styled-components";
import { sendQuestionAndSaveAnswerInStoreForRobot } from "../../../servers/AI/websocket-stream";
import { useDispatch } from "react-redux";
import TypeWordModal from "./TypeWordModal";
import { useState } from "react";
import { createPortal } from "react-dom";

const Container = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 0.1rem;
  /* border: 1px solid gold; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  left: ${(props) => props.absLeft};
  top: ${(props) => props.absTop};
  z-index: 100;
`;
const Row = styled.div`
  background-color: #fff;
  border-radius: 0.8rem;
  border: 1px solid grey;
  width: 8rem;
  height: 2rem;
  text-align: center;
  color: #535353;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    background-color: #b1b0b0;
  }
`;
/**
 * @param {{left:string,top:string,text:string}} param px为单位
 * */
function MessageModal({ left, top, text, handleTypeModal }) {
  // 思路 基于点击位置/或者绑定在消息上获得当前的聊天数据 并且获取当前鼠标位置展示在鼠标位置的地方 并且可以随着消息的滚动而滚动
  // todo:绑定在每条消息上 鼠标点击获得当前鼠标位于消息框的相对位置 赋予模块绝对定位相对在消息框位置的定位 并且展示自己
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [feelOrSuggestion, setFeelOrSuggestion] = useState("feel");
  // 也许可以在更多模块配置
  const speak = function () {
    const sp = new SpeechSynthesisUtterance(text);
    sp.volume = "0.5";
    sp.rate = 1;
    sp.pitch = "1";
    sp.lang = "zh-cn";
    speechSynthesis.speak(sp);
  };
  const copy = function () {
    navigator.clipboard.writeText(text);
    message.success("复制成功！");
  };
  /**
   *
   * @param {'feel'|'suggestion'} text
   */
  const handleFeelOrSuggestion = function (text) {
    return () => {
      handleTypeModal(true, text);
    };
  };
  console.log(isOpenModal, "打开 isOpenModal");
  return (
    <Container absLeft={left} absTop={top}>
      <Row onClick={handleFeelOrSuggestion("feel")}>情感解读</Row>
      <Row onClick={handleFeelOrSuggestion("suggestion")}>回复建议</Row>
      {isOpenModal &&
        createPortal(
          <TypeWordModal
            sendText={text}
            isOpen={isOpenModal}
            handleIsOpen={setIsOpenModal}
          />,
          document.body
        )}
      <Row onClick={speak}>语音播报</Row>
      <Row onClick={copy}>复制消息</Row>
    </Container>
  );
}

export default MessageModal;
