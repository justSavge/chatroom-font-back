const url = import.meta.env.VITE_USER_HTTP_URL;
const loginUrl = url + "/login";
const registerUrl = url + "/register";
const isNameExistUrl = url + "/isNameExist";
const updateUserNameUrl = url + "/updateUserName";
const updateUserCustomUrl = url + "/updateUserCustom";
/**
 *  将数据传入用于登录的检测
 * @param {{password:string,account:string}} data
 * @returns {{status:number,isSuccess:boolean,data:object}}
 */
export const userLogin = async function (data) {
  const { account, password } = data;
  const loginUrlWithParams =
    loginUrl +
    "?account=" +
    decodeURIComponent(account) +
    "&password=" +
    decodeURIComponent(password);
  try {
    const serverResponse = await fetch(loginUrlWithParams);
    const parseData = await serverResponse.json();
    parseData.isSuccess = false;
    const statusStr = String(parseData.status);
    if (statusStr.startsWith("2")) {
      parseData.isSuccess = true;
    }
    return parseData;
  } catch (error) {
    console.log("发送错误", error.message);
    return { status: 400, data: "连接错误，请检查网络", isSuccess: false };
  }
};
/**
 *  将数据传入用于登录的检测
 * @param {{name:string,password:string,account:string}} data
 * @returns {{status:number,isSuccess:boolean,data:object}}
 */
export const userRegister = async function (data) {
  try {
    const { name, account, password } = data;
    const serverResponse = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        account,
        password,
      }),
    });
    const parseData = await serverResponse.json();
    console.log("第一手注册返回数据", parseData);

    parseData.isSuccess = false;
    const statusStr = String(parseData.status);
    if (statusStr.startsWith("2")) {
      console.log("parseData.isSuccess = true");
      parseData.isSuccess = true;
    }
    return parseData;
  } catch (error) {
    console.log("发送错误", error.message);
    return { status: 400, data: "连接错误，请检查网络", isSuccess: false };
  }
};

/**
 * 修改用户名的时候，判断传入的名字是否已经存在
 * @param {{name:string,account:string}} data
 * @returns {boolean}
 */
export const userNameIsExist = async function (data) {
  const res = await fetch(isNameExistUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const x = await res.json();
  const {
    data: { isReqNameIsExist },
  } = x;
  return isReqNameIsExist;
};
/**
 * 修改用户名的时候，修改成功返回用户数据,错误404
 * @param {{name:string,account:string}} dataParams
 * @returns {{status:number,message}}
 */
export const updateUserName = async function (dataParams) {
  const res = await fetch(updateUserNameUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataParams),
  });
  const { status, data } = await res.json();
  return { status, message: data };
};
/**
 * 修改用户拓展内容，修改成功返回用户数据,错误404
 * @param {{account:string,custom:object}} dataParams
 * @returns {{status:number,message}}
 */
export const updateUserCustom = async function (dataParams) {
  const res = await fetch(updateUserCustomUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataParams),
  });
  const { status, data } = await res.json();
  console.log(data, "看看返回的数据");
  return { status, message: data };
};
