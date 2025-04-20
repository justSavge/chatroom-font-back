import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  getCurrentStoreData,
  setUserInputValue,
} from "../../../store/globalSlice";

const Container = styled.div`
  width: 2rem;
  height: 2rem;
  position: relative;
`;
const Img = styled.img`
  width: 2rem;
  height: 2rem;
`;
const Input = styled.input`
  position: absolute;
  inset: 1;
  opacity: 0;
`;
function FileUpload({ setFile, file }) {
  // todo : 接下来就是使用redux存储临时数据，从原来的文本到对象 ，包含数据 数据类型
  // 修改对应的发送按钮
  // 检测是否存在文件 存在就使用新的组件替代输入框
  // todo 写一个新的组件展示文件名和清除按钮
  const dispatch = useDispatch();
  const ref = useRef(null);
  const userInputValue = useSelector(getCurrentStoreData("userInputValue"));
  console.log(userInputValue, "userInputValue");
  const { type, value } = userInputValue;
  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    console.log("将数据保存到state", file);
    dispatch(setUserInputValue({ type: "file", value: "" }));
    setFile(file);
  };
  const handleClearFile = (e) => {
    if (type !== "file" || !value) return;
    e.preventDefault();
    ref.current.value = "";
    dispatch(setUserInputValue({ type: "text", value: "" }));
  };
  // file被清除了以后也将移除当前的文件选择
  useEffect(() => {
    // file没有清除就先退出
    if (!file) return;
    ref.current.value = "";
  }, [file]);
  return (
    <Container>
      <Input
        type="file"
        onChange={handleChangeFile}
        ref={ref}
        onClick={handleClearFile}
      />
      {type === "text" && <Img src="/image/icon/file.svg" alt="file" />}
      {type === "file" && <Img src="/image/icon/delete.svg" alt="delete" />}
    </Container>
  );
}

export default FileUpload;
