import { useEffect, useState } from "react";
import { Input, message, Modal } from "antd";
import { ModelDiv as Div } from "../../../style/model-borad/Model-div";
import {
  updateUserName,
  userNameIsExist,
} from "../../../servers/HomePageServer";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentStoreData,
  getMyAccountData,
} from "../../../store/globalSlice";
import styled from "styled-components";

const ErrorP = styled.p`
  font-size: 1rem;
  color: red;
`;

function ChangeUserNameButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [isShowErrorP, setIsShowErrorP] = useState(false);
  const [tosatObj, setToastObj] = useState({ type: "", content: "" });
  const dispatch = useDispatch();
  const { account } = useSelector(getCurrentStoreData("myAccountData"));
  useEffect(() => {
    console.log("打开吐司", tosatObj);
    if (!tosatObj.type) return;
    message[tosatObj.type](tosatObj.content);
  }, [tosatObj]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    setIsModalOpen(false);
    const { status, message } = await updateUserName({
      name: newName,
      account,
    });
    if (status === 404) {
      setToastObj(() => ({ type: "error", content: message }));
      return;
    }
    setToastObj(() => ({ type: "success", content: "修改成功" }));
    dispatch(getMyAccountData(message));
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleInputBlur = async (e) => {
    const newName = e.target.value;
    const isNameExist = await userNameIsExist({
      name: newName,
      account,
    });
    setIsShowErrorP(isNameExist);
  };
  return (
    <>
      <Div onClick={showModal}>修改用户名</Div>
      <Modal
        title="用户名修改"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认修改"
        cancelText="取消修改"
        width="20rem"
      >
        <p>你将要修改的用户名</p>
        <Input
          type="text"
          style={{ width: "12rem" }}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={handleInputBlur}
        />
        {isShowErrorP && <ErrorP>该用户名已存在，请修改为其他用户名</ErrorP>}
      </Modal>
    </>
  );
}

export default ChangeUserNameButton;
