/**
 * step为0：我想要点击‘修改颜色’按钮此时修改ste=1
 * step为1: 此时为三个修改组件绑定选中事件(加边框，修改为点击对应组件，redux获得组件的ref,修改步骤为2)，选中事件失效（加边框）,1~2的时候useEffect移除选中事件
 * step为2：此时弹出颜色修改器，可以编辑redux临时的颜色，会触发渲染，选中想要的颜色以后，点击确定，发送给后端保存，返回数据为最新custom,此时重置redux-临时，step=0,不使用临时颜色，使用返回以后的最新颜色
 */

import { useDispatch, useSelector } from "react-redux";
import { changeCustomBgColor, getCurrentStoreData } from "../store/globalSlice";
import { useEffect, useRef } from "react";

/**
 * @param {'layout' | 'messageBox' | 'rightContainer'} elementNameProps
 * 绑定ref,监听step，为1的时候更新临时组件
 * 为2的时候监听临时颜色，修改ref
 */
function useRefBindDomChangeColor(elementNameProps) {
  const ref = useRef();
  const { step, temporaryBgColor, elementName } = useSelector(
    getCurrentStoreData("customBgColor")
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (step === 2) return;
    const currentElement = ref.current;
    if (step === 0) {
      currentElement.style.backgroundColor = "";
      return;
    }
    const handleClickToShowBorderAndPutInReduxTemporary = function (e) {
      e.stopPropagation();
      currentElement.style.border = "1px solid red";
      console.log(
        "传入默认颜色",
        window.getComputedStyle(currentElement).backgroundColor.toString()
      );
      dispatch(
        changeCustomBgColor({
          step: 2,
          prop: window
            .getComputedStyle(currentElement)
            .backgroundColor.toString(),
          elementName: elementNameProps,
        })
      );
    };
    const handleMouseoverShowBorder = function (e) {
      e.stopPropagation();
      currentElement.style.border = "1px solid red";
    };
    const handleMouseLeaveShowBorder = function (e) {
      e.stopPropagation();
      console.log("盲猜你没有执行", elementNameProps);
      currentElement.style.border = "";
    };
    currentElement.addEventListener(
      "click",
      handleClickToShowBorderAndPutInReduxTemporary
    );
    currentElement.addEventListener("mouseover", handleMouseoverShowBorder);
    currentElement.addEventListener("mouseout", handleMouseLeaveShowBorder);
    return () => {
      currentElement.removeEventListener(
        "click",
        handleClickToShowBorderAndPutInReduxTemporary
      );
      currentElement.removeEventListener(
        "mouseover",
        handleMouseoverShowBorder
      );
      currentElement.removeEventListener(
        "mouseout",
        handleMouseLeaveShowBorder
      );
      currentElement.style.border = "";
    };
  }, [ref, step, dispatch, elementNameProps]);
  if (step === 2 && elementNameProps === elementName) {
    ref.current.style.backgroundColor = temporaryBgColor;
  }
  return ref;
}
export default useRefBindDomChangeColor;
