/** 传入消息，打包为标准发送数据格式 */
export const warpMessage = function (
  message,
  id = "",
  senderName = "",
  custom = {}
) {
  return {
    timeStamp: Date.now(),
    message,
    senderId: id,
    senderName,
    custom,
  };
};
