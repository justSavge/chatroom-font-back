import TalkingLayout from "../features/talking/TalkingLayout";
import { chatingServer } from "../servers/websocket";
import { CreateTalkingContextProvider } from "../store/websocketStore";

function Talking({ isSuccess }) {
  const TalkingContextProvider = CreateTalkingContextProvider(chatingServer());
  return (
    <TalkingContextProvider>
      <TalkingLayout isSuccess={isSuccess} />
    </TalkingContextProvider>
  );
}

export default Talking;
