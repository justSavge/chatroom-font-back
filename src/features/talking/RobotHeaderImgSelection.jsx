import styled from "styled-components";
import { robotImgsWithDescription } from "../..//lib/Talking/headerImg";

const Container = styled.div`
  position: absolute;
  left: 0rem;
  width: 14rem;
  height: 20rem;
  transform: translateX(-100%);
  overflow-y: scroll;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 3px;
  scrollbar-width: none;
`;

const ImgContainer = styled.div`
  width: 100%;
  height: 5rem;
  cursor: pointer;
  &:hover {
    background-color: #c6c6c6;
  }
  display: flex;
`;
const Img = styled.img`
  width: 5rem;
  height: 5rem;
`;
const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  padding: 0 0.2rem;
`;
const Content = styled.span`
  font-size: 0.8rem;
`;
function RobotHeaderImgSelection({ handleChangeRobotStyle }) {
  return (
    <Container>
      {robotImgsWithDescription.map((item) => (
        <ImgContainer
          key={item.imgPath}
          onClick={(e) => {
            handleChangeRobotStyle(item);
            e.stopPropagation();
          }}
        >
          <Img src={item.imgPath} alt="robotHeaderImg" />
          <Description>
            <h2>{item.description.title}</h2>
            <Content>{item.description.content}</Content>
          </Description>
        </ImgContainer>
      ))}
      <div></div>
    </Container>
  );
}

export default RobotHeaderImgSelection;
