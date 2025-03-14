import { useEffect, useState } from "react";
import { ModelDiv as Div } from "../../../style/model-borad/Model-div";
import { createPortal } from "react-dom";
import ChangeHeaderImgModel from "./ChangeHeaderImgModel";
import { updateUserCustom } from "../../../servers/HomePageServer";
import { headerImgsPublicPath } from "../../../lib/Talking/headerImg";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentStoreData,
  getMyAccountData,
} from "../../../store/globalSlice";
import { message } from "antd";

function ChangeHeadImageButton() {
  const [isInsert, setIsInsert] = useState(false);
  const dispatch = useDispatch();
  const { account } = useSelector(getCurrentStoreData("myAccountData"));
  const [tosatObj, setToastObj] = useState({ type: "", content: "" });
  useEffect(() => {
    if (!tosatObj.type) return;
    message[tosatObj.type](tosatObj.content);
  }, [tosatObj]);
  /** 直接传入url即可，会移除公共前缀 */
  const handClick = async function (url) {
    const signHeadImage = url.split(headerImgsPublicPath)[1];
    const { status, message } = await updateUserCustom({
      account,
      custom: { headImage: signHeadImage },
    });
    setIsInsert(false);
    if (status === 404) {
      setToastObj({ type: "error", content: message });
      return;
    }
    setToastObj({ type: "success", content: "头像修改成功" });
    dispatch(getMyAccountData(message));
  };
  return (
    <>
      <Div onClick={() => setIsInsert(true)}>修改头像</Div>
      {isInsert &&
        createPortal(
          <ChangeHeaderImgModel handClick={handClick} />,
          document.body
        )}
    </>
  );
}

export default ChangeHeadImageButton;
