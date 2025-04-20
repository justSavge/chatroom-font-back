import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: ${(props) => (props.isMeSend ? "start" : "end")};
  column-gap: 0.2rem;
`;
const Head = styled.div`
  display: flex;
  column-gap: 0.2rem;
`;
const Img = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;
const Name = styled.span`
  font-size: 1.2rem;
`;
const Main = styled.div`
  background-color: #999999;
  color: black;
  padding: 1rem;
  border-radius: 1rem;
`;

function SmallMessage({ headImage, name, message, isMeSend }) {
  return (
    <Container isMeSend={isMeSend}>
      <Head>
        <Img src={headImage} alt="头像" />
        <Name>{name}</Name>
      </Head>
      <Main>{message}</Main>
    </Container>
  );
}

export default SmallMessage;
