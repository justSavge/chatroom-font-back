import { createSlice } from "@reduxjs/toolkit";

const Wait = "wait";
const Fulfilled = "fulfilled";
const Rejected = "rejected";

const initialization = {
  talkingData: [], // 标准数据
  talkingDataHeights: [], //{currentDomHeadInLayout,currentDomFootInLayout,height:92|Number,hadBeReal}[]
  robotTalkingData: [], //与ai聊天的所有数据
  bothHere: false, //其实主要作用就是阻止输入框的输入，当然服务端也会筛选一次，如果只有一个人，发送的消息不会出现,
  userInputValue: {
    type: "text",
    value: "",
  }, // 传输类型：文件/文本 数据：文本/()=>文件数据
  userName: [], //{ioID,name}[]用户的io id作为键，名字作为值
  myAccountData: {}, // 我的数据
  //{name,account,custom}
  isRobotLoading: false, //如果机器在尝试回答就不可以继续键入
  userList: [],
  customBgColor: {
    step: 0,
    temporaryBgColor: "",
    elementName: "", //'layout' | 'messageBox' | 'rightContainer'
  },
  //step:0,1,2 分别代表 默认，选择要更改的组件，选择完毕可以使用临时颜色预览
  requestFriendData: [], // 好友请求队列 {name, account, custom, senderId, receiverStatus}[]
  waitRequestFriendData: [], // 等待好友回复队列 {name, account, custom, senderId, receiverStatus}[]
  singleChatData: {}, //单对单聊天表 [key:senderId]:{information,chatMessage:[]}
  currChooseFriendId: "",
  isShowSingleChatModal: false,
};
// sendQuestionAndSaveAnswerInStoreForRobot,
const globalSlice = createSlice({
  name: "global",
  initialState: initialization,
  reducers: {
    saveTalkingMessage: {
      reducer(state, action) {
        state.talkingData.push(action.payload);
        console.log(
          "custom将数据服务器返回数据保存到redux custom",
          action.payload.custom
        );
        const { talkingDataHeights } = state;
        const currentDomFootInLayout =
          talkingDataHeights?.at(-1)?.currentDomFootInLayout || 0;
        talkingDataHeights.push({
          currentDomHeadInLayout: currentDomFootInLayout,
          currentDomFootInLayout: currentDomFootInLayout + 92,
          height: 92,
          hadBeReal: false,
        }); //92px是默认单条消息高度
      },
    },
    changeTalkingDataHeights: {
      reducer(state, action) {
        const { index, realHeight } = action.payload;
        const { talkingDataHeights } = state;

        // 修改当前项
        const currentItem = talkingDataHeights[index];
        if (!currentItem) return;

        currentItem.hadBeReal = true;
        currentItem.height = realHeight;
        currentItem.currentDomFootInLayout =
          currentItem.currentDomHeadInLayout + realHeight;

        // 修改之后的项
        let lastFootPosition = currentItem.currentDomFootInLayout;
        for (let i = index + 1; i < talkingDataHeights.length; i++) {
          const item = talkingDataHeights[i];
          if (!item) break;

          item.currentDomHeadInLayout = lastFootPosition;
          item.currentDomFootInLayout = lastFootPosition + item.height;
          lastFootPosition = item.currentDomFootInLayout;
        }
      },
    },
    setUserInputValue: {
      reducer(state, action) {
        console.log(action.payload);
        // payload:{type,value}
        state.userInputValue = action.payload;
      },
    },
    getMyAccountData: {
      reducer(state, action) {
        console.log("redux的logindata", action.payload);
        state.myAccountData = action.payload;
      },
    },
    addUserName: {
      reducer(state, action) {
        state.userName.push(action.payload);
      },
    },
    addRobotMessage: {
      reducer(state, action) {
        state.robotTalkingData.push(action.payload);
      },
    },
    setUserList: {
      reducer(state, action) {
        state.userList = action.payload;
      },
    },
    changeCustomBgColor: {
      reducer(state, action) {
        const { step = 0, prop = "", elementName = "" } = action.payload;
        console.log(step);
        // 此时为0，传入1，修改为1
        if (step === 1) {
          state.customBgColor.step = step;
          return;
        }
        // 此时为1，传入2,prop，修改为2，初始化颜色，prop传递默认颜色
        if (step === 2) {
          console.log("初始化默认颜色", prop);
          state.customBgColor.temporaryBgColor = prop;
          state.customBgColor.step = step;
          state.customBgColor.elementName = elementName;
          return;
        }
        // 此时为2，传入prop,修改temporaryBgColor直接修改颜色
        if (state.customBgColor.step === 2) {
          state.customBgColor.temporaryBgColor = prop;
        }
      },
    },
    // 确认以后发送数据给数据库，不再使用临时自定义样式，改为使用myAccountData内容
    resetCustomBgColor: {
      reducer(state, _) {
        state.customBgColor = {
          step: 0,
          temporaryBgColor: "",
          elementName: "",
        };
      },
    },
    // joinNewUserToMySingleTable: {
    //   reducer(state, action) {
    //     // action.payload === account
    //     state.singleChatData[action.payload] = [];
    //   },
    // },
    handleSingleChatMessage: {
      reducer(state, action) {
        // action.payload === {senderId,standardMessage}
        const { senderId, receiverId, isMeSend, message } = action.payload;
        state.singleChatData[isMeSend ? receiverId : senderId].chatMessage.push(
          {
            senderId,
            receiverId,
            isMeSend,
            message,
          }
        );
      },
    },
    handleRequestFriendData: {
      reducer(state, action) {
        const { type, data } = action.payload;
        if (type === "delete") {
          const index = state.requestFriendData.findIndex(
            (item) => item.senderId === data.senderId
          );
          state.requestFriendData.splice(index, 1);
          return;
        }
        if (type === "add") {
          // 如果请求列表已经有这个人 ， 就不加入
          if (
            state.requestFriendData.findIndex((v) => {
              return v.senderId === data.senderId;
            }) !== -1
          )
            return;
          // 此时data的数据格式应该为{name,account,custom,senderId}
          state.requestFriendData.push(data);
        }
        if (type === "updateStatus") {
          const { senderId, receiverStatus, senderData } = data;
          state.requestFriendData.forEach((item) => {
            if (item.senderId !== senderId) return;
            item.receiverStatus = receiverStatus;
          });
          if (receiverStatus === Fulfilled) {
            state.singleChatData[senderId] = {
              information: senderData,
              chatMessage: [],
            };
          }
          return;
        }
      },
    },
    handleWaitRequestFriendData: {
      reducer(state, action) {
        const { type, data } = action.payload;
        if (type === "delete") {
          const index = state.waitRequestFriendData.findIndex(
            (item) => item.receiverId === data.receiverId
          );
          console.log("尝试删除", index);
          state.waitRequestFriendData.splice(index, 1);
          return;
        }
        if (type === "add") {
          // 这是等待好友请求回复的队列 检查接收好友请求人员id是否重复即可
          if (
            state.waitRequestFriendData.findIndex((v) => {
              return v.receiverId === data.receiverId;
            }) !== -1
          )
            return;
          // 此时data的数据格式应该为{name,account,custom,receiverId,receiverStatus}
          state.waitRequestFriendData.push(data);
        }

        if (type === "updateStatus") {
          // 此时 data {receiverId;receiverStatus}
          const { receiverId, receiverStatus, receiverData } = data;
          state.waitRequestFriendData.forEach((item) => {
            if (item.receiverId !== receiverId) return;
            item.receiverStatus = receiverStatus;
          });
          if (receiverStatus === Fulfilled) {
            state.singleChatData[receiverId] = {
              information: receiverData,
              chatMessage: [],
            };
          }
        }
      },
    },
    handleCurrChooseFriendId: {
      reducer(state, action) {
        state.currChooseFriendId = action.payload;
      },
    },
    handleIsShowSingleChatModal: {
      reducer(state, action) {
        state.isShowSingleChatModal = action.payload;
      },
    },
  },
});

export const {
  saveTalkingMessage,
  changeTalkingDataHeights,
  setUserInputValue,
  getMyAccountData,
  addUserName,
  addRobotMessage,
  setUserList,
  addOneToOneChatData,
  changeCustomBgColor,
  resetCustomBgColor,
  joinNewUserToMySingleTable,
  handleSingleChatMessage,
  setFileValueAndClearFunc,
  handleRequestFriendData,
  handleWaitRequestFriendData,
  handleCurrChooseFriendId,
  handleIsShowSingleChatModal,
} = globalSlice.actions;

export default globalSlice.reducer;
/**
 * 传入参数即可展示对应数据
 * 不传参数返回所有数据
 */
export const getCurrentStoreData = function (want) {
  if (!want) return (state) => state["global"];
  return (state) => state["global"][want];
};
