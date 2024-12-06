import styled from 'styled-components';
/**
 * 纯样式
 */
export const HomeLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8dvw;
  padding-right: 2dvw;
  background-color: #000;
  width: 89dvw;
  height: 99dvh;
  &::after {
    content: ' ';
    display: block;
    position: absolute;
    width: 500px;
    height: 500px;
    background-image: url('/image/earth.gif');
    background-size: 500px 500px;
    background-repeat: no-repeat;
    background-position: center;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
`;
