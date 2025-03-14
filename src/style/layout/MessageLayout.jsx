import styled from "styled-components";
/**
 * 整个聊天室聊天记录的布局样式
 * styled-components - div
 */
export const MessageLayout = styled.div`
  width: 50rem;
  height: 388px;
  /* background-color: #fff; */
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
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
