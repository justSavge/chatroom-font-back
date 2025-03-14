import styled from "styled-components";
import { headerImgs } from "../../../lib/Talking/headerImg";

const BackBlack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;
const Model = styled.div`
  display: flex;
  gap: 5rem;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;
const Pic = styled.img`
  width: 5rem;
  height: 5rem;
  border: 1px solid black;
  transition-duration: 300ms;
  &:hover {
    border-radius: 50%;
    transform: scale(1.05);
  }
`;
function ChangeHeaderImgModel({ handClick }) {
  return (
    <BackBlack>
      <Model>
        {headerImgs.map((imgSrc) => (
          <Pic key={imgSrc} src={imgSrc} onClick={() => handClick(imgSrc)} />
        ))}
      </Model>
    </BackBlack>
  );
}

export default ChangeHeaderImgModel;
