import TalkingLayout from "../features/talking/TalkingLayout";
import { chatingServer } from "../servers/websocket";
import { CreateTalkingContextProvider } from "../store/websocketStore";

function Talking() {
  const TalkingContextProvider = CreateTalkingContextProvider(chatingServer());
  return (
    <TalkingContextProvider>
      <TalkingLayout />
    </TalkingContextProvider>
  );
}

export default Talking;
