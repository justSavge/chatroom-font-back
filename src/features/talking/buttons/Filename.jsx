import styled from "styled-components";

const Container = styled.div`
  width: 30rem;
  height: 3rem;
`;
const Name = styled.span`
  font-size: 1.2rem;
  line-height: 3rem;
`;
const Clear = styled.img`
  width: 2rem;
  height: 2rem;
`;

function Filename({ filename }) {
  return (
    <Container>
      <Name>文件: {filename}</Name>
    </Container>
  );
}

export default Filename;
