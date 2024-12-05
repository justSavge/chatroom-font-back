import styled from "styled-components";

export const RobotTalkingMessageLayout = styled.div`
  width: 22rem;
  height: 22rem;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  padding-bottom: 3rem;
  flex-direction: column;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: black;
    border-radius: 10%;
    height: 80%;
  }
  &::-webkit-scrollbar-thumb {
    width: 1px;
    background-color: white;
  }
`;
