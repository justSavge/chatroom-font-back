import styled from 'styled-components';
/**
 * 纯样式
 */
export const SwitchLayout = styled.div`
  width: 100%;
  height: 3rem;
  /* border: 1px solid black; */
  display: flex;
  justify-content: space-between;
  background-color: #272727;
  color: #757575;
  position: absolute;
  top: -2rem;
  left: 0px;
  border-radius: 5px;
  font-weight: 600;
`;
export const Sign = styled.div`
  width: 50%;
  /* border: 1px solid black; */
  transition: all 200ms;
  text-align: center;
  height: 3rem;
  line-height: 3rem;
  font-size: 2rem;
  background-color: ${(props) => props.isClick && '#555555'};
  color: ${(props) => props.isClick && '#8fbbe4'};
  &:hover {
    background-color: #555555;
    color: #799ec2;
  }
`;
