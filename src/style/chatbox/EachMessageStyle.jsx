import styled from "styled-components";
/**
 * @param whoSay 传入为'you'则使用正常布局，传入为其他，使用翻转布局，使得头像靠右，文本靠左
 * 每一条信息+头像的布局样式
 * styled-components - div
 */
export const EachMessageStyle = styled.div`
  max-width: 40rem;
  padding: 1rem;
  margin: 0.5rem;
  display: flex;
  flex-direction: ${(props) =>
    props.whosay === "you" ? "row" : "row-reverse"};
`;
