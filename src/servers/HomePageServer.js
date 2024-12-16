const url = import.meta.env.VITE_HTTP_URL;
const loginUrl = url + "/login";
/**
 *  将数据传入用于登录的检测
 * @param {{userName:string,password:string,remember:boolean}} data
 */
export const userLogin = async function (data) {
  try {
    const serverResponse = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: data.userName,
        password: data.password,
        remember: data.remember,
      }),
    });
    const { isSuccess } = await serverResponse.json();
    return isSuccess ?? false;
  } catch (error) {
    console.log("发送错误", error.message);
    return false;
  }
};
/**
 *  将数据传入用于注册的检测
 * @param {{userName:string,password:string,email:string}} data
 */
export const userRegister = function (data) {};
