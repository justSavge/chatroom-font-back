import { addRobotMessage } from "../../store/globalSlice";
import { warpMessage } from "../serverUtil";

const APIKey = import.meta.env.VITE_AI_KEY;
const APISecret = import.meta.env.VITE_AI_SECRET;
const date = new Date();
const temHost = "localhost:8848";
const temDate = date.toUTCString();
const temGet = "GET /v4.0/chat HTTP/1.1";
const tem = `host: ${temHost}\ndate: ${temDate}\n${temGet}`;

async function computeSignature() {
  const encoder = new TextEncoder();
  const apiSecretBuffer = encoder.encode(APISecret);
  const temBuffer = encoder.encode(tem);

  const key = await window.crypto.subtle.importKey(
    "raw",
    apiSecretBuffer,
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign"]
  );

  const signatureBuffer = await window.crypto.subtle.sign(
    "HMAC",
    key,
    temBuffer
  );

  return btoa(String.fromCharCode.apply(null, new Uint8Array(signatureBuffer)));
}

async function createUrl() {
  const signature = await computeSignature();
  const authorization_origin = `api_key="${APIKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`;
  const authorization = btoa(authorization_origin);

  const v = {
    authorization: authorization,
    date: temDate,
    host: temHost,
  };

  const urlParams = new URLSearchParams(v);
  return `wss://spark-api.xf-yun.com/v4.0/chat?${urlParams.toString()}`;
}

async function connectionWS() {
  const url = await createUrl();
  const wss = new WebSocket(url);
  return wss;
}
/**
 * 接收message
 * 初始化ws连接
 * 发送数据
 */
export class AIws {
  /**
   * @type {WebSocket|null}
   */
  instance;
  /** 连接成功后发送的第一条数据，处理服务器发送message事件的函数  */
  constructor(message, handleAiWsResponseAnswerFunc) {
    this.init(message, handleAiWsResponseAnswerFunc);
  }
  async init(message, handleAiWsResponseAnswerFunc) {
    try {
      const ws = await connectionWS();
      this.instance = ws;
      ws.addEventListener("close", (e) => {
        console.error("aw-ws api 关闭连接！！！！", e.code, e.reason);
      });
      ws.addEventListener("open", () => {
        ws.send(message);
        console.log("aw-ws api 连接成功！！！！");
      });
      ws.addEventListener("message", (socket) => {
        console.log("aw-ws api 初始化 - message", socket.data);
        handleAiWsResponseAnswerFunc(socket.data);
      });
      ws.addEventListener("error", (socket) => {
        console.error("ws error !!!!!!", socket.message);
      });
    } catch (error) {
      console.log(error, "ai-ws api初始化连接失败");
    }
  }
  close() {
    this.instance.close();
  }
}
/** 提供api需要的信息数据格式 */
export const aiMessageTemFunc = function (
  message,
  performer = "",
  performerFeatures = ""
) {
  const systemPerformerContent =
    performer &&
    `你现在扮演${performer}，${
      performerFeatures && "你的特征是" + performerFeatures
    }，接下来请用${performer}的口吻和用户对话。`;
  const chatList = [];
  systemPerformerContent &&
    chatList.push({
      role: "system",
      content: systemPerformerContent,
    });
  chatList.push({
    role: "user",
    content: message,
  });
  const standardData = JSON.stringify({
    header: {
      app_id: "5e58a087",
      uid: "123",
    },
    parameter: {
      chat: {
        domain: "4.0Ultra",
        temperature: 0.5,
        max_tokens: 1024,
      },
    },
    payload: {
      message: {
        text: chatList,
      },
    },
  });
  return standardData;
};
/** 处理返回数据为[status, text] */
export const handleAiWSResponseStatusAndContent = function (message) {
  const str = message.toString("utf-8");
  const parseData = JSON.parse(str);
  const {
    header: { status },
    payload: {
      choices: { text },
    },
  } = parseData;
  const content = text.reduce((str, item) => str + item.content, "");
  return [status, content];
};
export const saveMessageForRobotInReduxStore = function (
  dispatch,
  message,
  socketId = "",
  sender = ""
) {
  const questionDetail = warpMessage(message, socketId, sender);
  dispatch(addRobotMessage(questionDetail));
};
/**
 *
 * @param {object} question
 * @param { {message:string, performer:string, performerFeatures:string} }
 * 保存问题在redux-store
 * 返回ai-ws所需标准格式
 */
export const sendQuestionAndSaveAnswerInStoreForRobot = function (
  dispatch,
  { message, performer = "", performerFeatures = "" }
) {
  saveMessageForRobotInReduxStore(dispatch, message);
  const standardData = aiMessageTemFunc(message, performer, performerFeatures);
  return standardData;
};
