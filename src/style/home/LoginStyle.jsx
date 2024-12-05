import styled from "styled-components";
/**
 * 纯样式
 */
export const LoginStyle = styled.div`
  width: 18rem;
  height: 12rem;
  padding: 3rem;
  background: linear-gradient(to right, #5d1c70, purple);
  border-radius: 1rem;
  transition: all 5s ease;
  position: relative;
  opacity: 0.9;
  z-index: 1;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-image: linear-gradient(to right, purple, blue);
    opacity: 0;
    transition: opacity 0.5s;
    z-index: 0;
  }
  &:hover::before {
    opacity: 0.8;
  }
`;
