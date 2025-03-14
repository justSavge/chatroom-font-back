import { Button, ColorPicker, message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCustomBgColor,
  getCurrentStoreData,
  getMyAccountData,
  resetCustomBgColor,
} from "../../../store/globalSlice";
import { ModelDiv as Div } from "../../../style/model-borad/Model-div";
import { updateUserCustom } from "../../../servers/HomePageServer";
import styled from "styled-components";
import { defaultBGColor } from "../../../lib/Talking/defaultColor";

const ResetButton = styled(Button)`
  width: 4rem;
  height: 2rem;
  position: absolute;
  bottom: 19px;
  font-weight: 600;
  color: ${(props) => props.defaultColor};
  left: 4px;
`;

function ChangeColorBoard() {
  const { step, temporaryBgColor, elementName } = useSelector(
    getCurrentStoreData("customBgColor")
  );
  const defaultColor = defaultBGColor[elementName || ""];
  console.log("看看默认颜色", temporaryBgColor);
  const { account, custom } = useSelector(getCurrentStoreData("myAccountData"));
  const dispatch = useDispatch();
  const startChangeAndStepBe1 = function () {
    dispatch(changeCustomBgColor({ step: 1 }));
  };
  const step2AndChangeColor = function (e) {
    dispatch(changeCustomBgColor({ prop: e.toHexString() }));
  };
  const handleOk = async () => {
    const { status, message: data } = await updateUserCustom({
      account,
      custom: {
        ...custom,
        customBgColor: {
          ...custom?.customBgColor,
          [elementName]: temporaryBgColor,
        },
      },
    });
    // 重置颜色
    dispatch(resetCustomBgColor());
    if (status !== 200) {
      message.error("更新失败，请检查网络");
      return;
    }
    dispatch(getMyAccountData(data));
    message.success("更新成功");
  };
  const handleCancel = () => {
    dispatch(resetCustomBgColor());
  };
  const handleRestButton = async () => {
    const { status, message: data } = await updateUserCustom({
      account,
      custom: {
        ...custom,
        customBgColor: {
          ...custom?.customBgColor,
          [elementName]: defaultColor,
        },
      },
    });
    // 重置颜色
    dispatch(resetCustomBgColor());
    if (status !== 200) {
      message.error("更新失败，请检查网络");
      return;
    }
    dispatch(getMyAccountData(data));
    message.success("更新成功");
  };
  return (
    <>
      <Div onClick={startChangeAndStepBe1}>自定义样式</Div>
      <Modal
        title="颜色调整"
        open={step === 2}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
        width={"15rem"}
      >
        <ColorPicker
          defaultValue={temporaryBgColor}
          onChange={(e) => step2AndChangeColor(e)}
        />

        <ResetButton
          onClick={handleRestButton}
          defaultColor={defaultColor}
        >
          重置颜色
        </ResetButton>
      </Modal>
    </>
  );
}

export default ChangeColorBoard;
