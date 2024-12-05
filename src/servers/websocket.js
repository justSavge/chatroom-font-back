import socketIO from "socket.io-client";
const url = "http://localhost:6657";
/**
 * 作为一个io服务的提供者
 * @returns io
 */
export const chatingServer = function () {
  const io = socketIO(url);
  return io;
};
