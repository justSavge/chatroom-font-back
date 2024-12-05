import HE from "../../../public/image/HE";
import YOU from "../../../public/image/YOU";
import { Head } from "../../style/chatbox/HeadImage";
/**
 *
 * @param showWhoHeadImage 传入'he',展示组件he,否则展示you.
 * 默认展示he
 */
function HeadImage({ showWhoHeadImage = "he" }) {
  return <Head>{showWhoHeadImage === "he" ? <HE /> : <YOU />}</Head>;
}

export default HeadImage;
