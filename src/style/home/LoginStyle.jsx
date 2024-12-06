import styled from 'styled-components';
/**
 * 纯样式
 */
export const LoginStyle = styled.div`
  width: 14rem;
  height: 18rem;
  padding: 3rem;
  background: linear-gradient(to right, #221c70, #0080357f);
  border-radius: 1rem;
  transition: all 5s ease;
  position: relative;
  opacity: 0.9;
  z-index: 1;
  justify-content: space-between;
  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-image: linear-gradient(to right, #00805a, #ff0095a6);
    opacity: 0;
    transition: opacity 0.8s;
    z-index: 0;
    border-radius: 1rem;
  }
  &:hover::before {
    opacity: 0.8;
  }
`;
