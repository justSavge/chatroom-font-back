import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentStoreData, getMyAccountData } from "../../store/globalSlice";
import ChangeHeadImageButton from "./model-borad/ChangeHeadImageButton";
import ChangeUserNameButton from "./model-borad/ChangeUserNameButton";
import { message } from "antd";
import { headerImgsPublicPath } from "../../lib/Talking/headerImg";
import ChangeColorBoard from "./model-borad/ChangeColorBoard";

const HeaderStyle = styled.div`
  position: fixed;
  top: 1rem;
  right: 8rem;
  z-index: 99;
`;
const Img = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1px solid gray;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;
const Div = styled.div`
  width: 8rem;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  flex: 1;
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.8);
    color: rgba(255, 255, 255, 0.9);
  }
`;
const BigDiv = styled.div`
  width: 16rem;
  height: 3rem;
  line-height: 3rem;
  color: silver;
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  text-align: center;
`;
const ShowDetail = styled.div`
  width: 16rem;
  height: 0rem;
  position: absolute;
  overflow: hidden;
  bottom: 0rem;
  left: 0rem;
  transform: translateY(100%) translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition-duration: 700ms;
  ${HeaderStyle}:hover & {
    height: 12rem;
  }
`;
const HeaderImage = function ({ setLoginData }) {
  const myAccountData = useSelector(getCurrentStoreData("myAccountData"));
  const dispatch = useDispatch();
  console.log("得到返回的myaccount", myAccountData);
  const customHeadImage = myAccountData.custom
    ? myAccountData.custom.headImage
    : "";
  const showImage =
    headerImgsPublicPath + (customHeadImage || "header-default.png");
  const myUserName = myAccountData?.name;

  return (
    <HeaderStyle>
      <Img src={showImage} alt="头像" />
      <ShowDetail>
        <BigDiv>
          <Div>{myUserName}</Div>
        </BigDiv>
        <BigDiv>
          <ChangeHeadImageButton />
          <ChangeUserNameButton />
        </BigDiv>
        <BigDiv>
          <ChangeColorBoard />
          <Div>
            <a
              href="https://github.com/justSavge/chatroom-font-back"
              style={{ textDecoration: "none", color: "inherit" }}
              target="_blank"
            >
              反馈建议
            </a>
          </Div>
        </BigDiv>
        <BigDiv>
          <Div>
            <a
              href="/"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={() =>
                setLoginData((data) => ({ ...data, isSuccess: false }))
              }
            >
              退出
            </a>
          </Div>
        </BigDiv>
      </ShowDetail>
    </HeaderStyle>
  );
};

export default HeaderImage;
