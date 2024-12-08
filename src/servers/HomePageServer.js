const url = import.meta.env.VITE_HTTP_URL;
/**
 *  将数据传入用于登录的检测
 * @param {{userName:string,password:string}} data
 */
export const userLogin = async function (data) {
  try {
    const serverResponse = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const { isSuccess } = await serverResponse.json();
    return isSuccess ?? false;
  } catch (error) {
    return false;
  }
};
/**
 *  将数据传入用于注册的检测
 * @param {{userName:string,password:string,email:string}} data
 */
export const userRegister = function (data) {};
