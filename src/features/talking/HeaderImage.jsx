import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentStoreData } from "../../store/globalSlice";
import ChangeHeadImageButton from "./model-borad/ChangeHeadImageButton";
import ChangeUserNameButton from "./model-borad/ChangeUserNameButton";
import { message } from "antd";
import { headerImgsPublicPath } from "../../lib/Talking/headerImg";
import ChangeColorBoard from "./model-borad/ChangeColorBoard";

const HeaderStyle = styled.div`
  position: fixed;
  top: 1rem;
  right: 8rem;
  width: 2rem;
  height: 2rem;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
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
const HeaderImage = function () {
  const myAccountData = useSelector(getCurrentStoreData("myAccountData"));
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
          <Div>更多功能</Div>
        </BigDiv>
        <BigDiv>
          <Div>退出</Div>
        </BigDiv>
      </ShowDetail>
    </HeaderStyle>
  );
};

export default HeaderImage;
