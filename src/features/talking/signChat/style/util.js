import styled from "styled-components";

export const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 0.1rem;
`;
export const Item = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #d3d3d3;
  &:hover {
    cursor: pointer;
    background-color: #acacac;
  }
`;
export const Img = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;
export const Icon = styled.img`
  width: 1rem;
  height: 1rem;
`;
