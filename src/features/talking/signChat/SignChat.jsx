import styled from "styled-components";
import FriendList from "./FriendList";
import RequestList from "./RequestList";
import WaitAnswerList from "./WaitAnswerList";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentStoreData } from "../../../store/globalSlice";

const Container = styled.div`
  position: fixed;
  right: ${(props) => (props.isHidden ? "0rem" : "-20rem")};
  top: 6rem;
  transition: all 1.5s;
`;

const Main = styled.div`
  width: 10rem;
  height: 30rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  border-radius: 0.5rem;
  &::-webkit-scrollbar {
    width: 4px;
  }
`;

const Choose = styled.div`
  display: flex;
  justify-content: space-around;
  cursor: pointer;
`;
const Span = styled.span`
  width: 33%;
  text-align: center;
`;

function SignChat() {
  const [choose, setChoose] = useState("friend");
  const isHidden = useSelector(getCurrentStoreData("isShowSingleChatModal"));
  console.log(isHidden);
  const defaultStyle = {
    backgroundColor: "#fff",
  };
  const chooseStyle = {
    backgroundColor: "#c7c7c7",
  };
  const handleChooseClick = (text) => {
    return () => {
      setChoose(text);
    };
  };
  return (
    <Container isHidden={isHidden}>
      <Main>
        <Choose>
          <Span
            style={choose === "friend" ? chooseStyle : defaultStyle}
            onClick={handleChooseClick("friend")}
          >
            好友
          </Span>
          <Span
            style={choose === "request" ? chooseStyle : defaultStyle}
            onClick={handleChooseClick("request")}
          >
            请求
          </Span>
          <Span
            style={choose === "waitAnser" ? chooseStyle : defaultStyle}
            onClick={handleChooseClick("waitAnser")}
          >
            申请
          </Span>
        </Choose>
        {choose === "friend" && <FriendList />}
        {choose === "request" && <RequestList />}
        {choose === "waitAnser" && <WaitAnswerList />}
      </Main>
    </Container>
  );
}

export default SignChat;
