import styled from "styled-components";
/**
 * 聊天框的样式
 * @props bgcolor,若为'you'则为you颜色否则是其他颜色
 *  styled-components - div
 */
export const ChatBoxStyle = styled.div`
  max-width: 43rem;
  background-color: ${(props) => (props.bgcolor === "you" ? "grey" : "black")};
  padding: 1rem;
`;
/**
 * 聊天框的内部文本样式
 * styled-components - span
 */
export const ChatSpan = styled.span`
  color: white;
  font-size: 1rem;
`;
