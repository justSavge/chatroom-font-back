import styled from "styled-components";
/**
 * 原生
 */
export const RobotContainer = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 50%;
  position: relative;
  border: 2px solid RGB(236, 177, 172);
  position: fixed;
  top: ${(props) => {
    return props.y + "px";
  }};
  left: ${(props) => props.x + "px"};
  background-color: black;
  &::after {
    content: "唉☝🏻！🤓，我有一寄！";
    font-size: 1rem;
    display: none;
    width: 12rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    background-color: rgb(108, 108, 108);
    color: yellow;
    position: absolute;
    top: -1rem;
    left: 3rem;
    border-radius: 30%;
    z-index: 1;
    transition: all 0.5s ease;
  }
  &:hover::after {
    display: ${(props) => {
      return props.allowshow === "true" ? "block" : "none";
    }};
  }
`;
/**
 * 原生
 */
export const RobotImage = styled.img`
  width: 3rem;
  height: 3rem;
  padding: 1rem;
  border-radius: 50%;
  &:hover {
    width: 3.5rem;
    height: 3.5rem;
    transition: all 0.5s ease;
  }
  z-index: 100;
`;
