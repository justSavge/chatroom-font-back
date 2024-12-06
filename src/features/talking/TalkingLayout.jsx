import {
  AwayButtonLayout,
  CoolButton,
  CounTimer,
  FullPageLayout,
  TalkingRoom,
  Tips,
} from '../../style/layout/TalkingLayoutStyle';

import { InputLayout } from '../../style/layout/InputLayout';
import InputToServer from './InputToServer';
import { useLJStore } from '../../store/websocketStore';
import PostButton from './PostButton';
import { MessageLayout } from '../../style/layout/MessageLayout';
import Robot from './Robot';
import { MessageBox } from 'react-chat-elements';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const TalkingLayoutMemo = memo(function TalkingLayoutMemo({ talkingData, myScoketID }) {
  return (
    <FullPageLayout>
      <TalkingRoom>
        <MessageLayout>
          {talkingData?.map((oneTalking) => (
            <MessageBox
              key={oneTalking.timeStamp}
              type="text"
              title={oneTalking.sender === myScoketID ? 'you' : oneTalking.sender}
              position={oneTalking.sender === myScoketID ? 'left' : 'right'}
              text={oneTalking.message}
            />
          ))}
        </MessageLayout>
        <InputLayout>
          <InputToServer />
          <PostButton />
        </InputLayout>
      </TalkingRoom>
      <Tips>
        <AwayButtonLayout>
          <CoolButton context="离开" />
          <CoolButton context="摧毁" />
        </AwayButtonLayout>
        <CounTimer>倒计时</CounTimer>
      </Tips>
      <Robot />
    </FullPageLayout>
  );
});
const TalkingLayout = function () {
  const { talkingData, myScoketID, isSuccess } = useLJStore();
  const navigate = useNavigate();
  if (!isSuccess) {
    navigate('/');
  }
  return <TalkingLayoutMemo talkingData={talkingData} myScoketID={myScoketID} />;
};
export default TalkingLayout;
