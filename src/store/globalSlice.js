import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";

const initialization = {
  talkingData: [], //除了标准数据
  talkingDataHeights: [], //60[]
  robotTalkingData: [], //与ai聊天的所有数据
  bothHere: false, //其实主要作用就是阻止输入框的输入，当然服务端也会筛选一次，如果只有一个人，发送的消息不会出现,
  userInputValue: "",
  userName: [], //{ioID,name}[]用户的io id作为键，名字作为值
  myAccountData: {}, // 我的数据
  //{name,account,custom}
  isRobotLoading: false, //如果机器在尝试回答就不可以继续键入
  userList: [],
  oneToOneChatData: {}, //{[account:string]:string[]} 账号：聊天数据
  customBgColor: {
    step: 0,
    temporaryBgColor: "",
    elementName: "", //'layout' | 'messageBox' | 'rightContainer'
  },
  //step:0,1,2 分别代表 默认，选择要更改的组件，选择完毕可以使用临时颜色预览
};
// sendQuestionAndSaveAnswerInStoreForRobot,
const globalSlice = createSlice({
  name: "global",
  initialState: initialization,
  reducers: {
    saveTalkingMessage: {
      reducer(state, action) {
        state.talkingData.push(action.payload);
        state.talkingDataHeights.push(60);
      },
    },
    changeTalkingDataHeights: {
      reducer(state, action) {
        const { index, realHeight } = action.payload;
        state.talkingDataHeights[index] = realHeight;
      },
    },
    setUserInputValue: {
      reducer(state, action) {
        console.log(action.payload);
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
    addOneToOneChatData: {
      reducer(state, action) {
        const { account, message } = action.payload;
        if (!state.oneToOneChatData[account])
          state.oneToOneChatData[account] = [];
        state.oneToOneChatData[account].push(message);
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
      reducer(state, action) {
        state.customBgColor = {
          step: 0,
          temporaryBgColor: "",
          elementName: "",
        };
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
