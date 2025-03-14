// 单例模式，维护全局唯一的 io 实例不是其变化
import io from "socket.io-client";
const url = import.meta.env.VITE_USER_WEBSOCKET_URL;
console.log("import.meta.env.VITE_USER_WEBSOCKET_URL", url);
// const url = import.meta.env.VITE_WEBSOCKET_URL;
/**
 * socket.io 的实例
 * 可以直接调用不用考虑异步性
 * 如果发送消息还没建立连接会进入缓存，连接成功以后发送
 */

export const ioInstance = io(url);
