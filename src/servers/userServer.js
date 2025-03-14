import { warpMessage } from "./serverUtil";
import { ioInstance } from "./websocket";
/**
 *  传入message就行，socket id，用户自己的名字
 */
export const sendMessageForUSer = function (message) {
  const { id, myUserName, emit } = ioInstance;
  emit("message", warpMessage(message, id, myUserName));
};
// /**第一个参数是确定是 true/false 登录/注册 ,第二个参数填入表单数据即可
//  * @returns 正确的话返回对应的用户名，偏好（？后续可能会加入选择头像功能）,不好说可能后续会加入context,不会返回结果
//  */
// const submitLoginOrRegister = async function (isLogin, formData) {
//   try {
//     // 先搞不了api,返回正确的得了
//     if (true) {
//       dispatch({ type: "successLogin" });
//       return true;
//     }
//     const userJson = await fetch(`${isLogin ? "登录的api" : "注册的api"}`, {
//       method: "POST",
//       body: {
//         data: formData,
//       },
//     });
//     const user = await userJson.json();
//     dispatch({ type: "successLogin" });
//     return user;
//   } catch (error) {
//     console.log(error);
//     throw new Error("用户账号/密码错误");
//   }
// };
