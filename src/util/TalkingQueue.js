/**
 * @param maxSize 数字,队列的大小
 * 提供一个限制长度的队列
 */
export class TalkingQueue {
  maxSize;
  queue = [];
  constructor(maxSize) {
    this.maxSize = maxSize;
  }
  add(data) {
    if (this.queue.length >= this.maxSize) {
      this.queue.shift();
      this.queue.push(data);
    } else {
      this.queue.push(data);
    }
    return this;
  }
  clear() {
    this.queue = [];
    return this;
  }
}
