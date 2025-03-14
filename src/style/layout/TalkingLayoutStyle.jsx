import { Button, ConfigProvider, Space } from "antd";
import { createStyles } from "antd-style";
import styled from "styled-components";
/**
 * styled-components
 * div
 */
export const FullPageLayout = styled.div`
  height: 100dvh;
  display: flex;
  padding-top: 4rem;
  justify-content: center;
  background-color: ${(props) => props.fullPageLayoutBackgroundColor};
`;
/**
 * styled-components
 * div
 */
export const TalkingRoom = styled.div`
  width: 50rem;
  height: 30rem;
  /* margin-top: 5rem; */
  background-color: ${(props) => props.TalkingRoomBackgroundColor};
  border: 1px solid rgb(160, 80, 255);
  position: relative;
`;
/**
 * styled-components
 * div
 */
export const Tips = styled.div`
  width: 10rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${(props) => props.TipsBackgroundColor};
  align-content: center;
  margin-left: 4rem;
`;
/**
 * styled-components
 * div
 */
export const AwayButtonLayout = styled.div`
  display: flex;
  height: 8rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
`;
const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(
        .${prefixCls}-btn-dangerous
      ) {
      border-width: 0;
      > span {
        position: relative;
      }
      &::before {
        content: "";
        background: linear-gradient(135deg, #4e54c8, #9b59b6);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }
      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));
/**
 * @param context 作为按钮的文本
 * @returns 渐变颜色的按钮
 */
export const CoolButton = ({ context = "?" }) => {
  const { styles } = useStyle();
  return (
    <ConfigProvider
      button={{
        className: styles.linearGradientButton,
      }}
      wave={{ disabled: true }}
    >
      <Space>
        <Button type="primary" size="large">
          {context}
        </Button>
      </Space>
    </ConfigProvider>
  );
};
/**
 *计时器的框
 *div
 */
export const CounTimer = styled.div`
  width: 7rem;
  height: 7rem;
  background-color: #ffff3079;
  line-height: 7rem;
  text-align: center;
  font-size: 1rem;
  margin: auto;
  transition-duration: 300ms;
  border-radius: 50%;
  &:hover {
    transform: scale(1.02);
    cursor: pointer;
  }
`;
