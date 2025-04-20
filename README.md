#### 数据传输约定

所以数据应该使用 json 格式发送

#### 标准数据发送格式

```
{
    timeStamp,
    message,
    senderId,
    senderName,
    custom
}
```

#### 前端向聊天服务器 post 数据格式 / 本地存储所有聊天数据（包括 ai 的问/答）格式

    {
      // 例如发送question
      question:{
        message:string
        // 应该尽可能减少字段，例如以下的前缀可以在前端发送时拼接
        // 如果有拓展数据也放在这里
        prefix:string // 使用场景，我需要为聊天记录解释，并且给出解释方案，我想安慰这个人应该如何回复：+message
      }
    }

#### 向 ai 发送 question 的格式

- 经过处理简化以后仅有三个字段

```
  {
      // 问题内容
      message: any;
      // ai 扮演的角色
      performer?: string;
      // ai 扮演角色的特点
      performerFeatures?: string
  }
```

#### redux保存的数据格式 userInputValue
```
{
  type:'text'|'file';
  value:string|'';
}
```
### websocket

##### 前端维护单对单聊天

前端维护一个单聊哈希表,键是账号,聊天记录与聊天室 talkingData 一致

```
 singleChatData:{
  [account]: {
    timeStamp,
    message,
    senderId,
    senderName,
    custom
  }[]
 }
```

#### 鉴权

- host: localhost:6658
- date: 格式: Fri, 05 May 2023 10:43:39 GMT

```
const date = new Date();
date.toUTCString();
```

- GET /v1.1/chat HTTP/1.1

#### http 连接

##### custom 字段

自定义拓展字段
headImage: 位于 headerImgsNames
customBgColor:{ layout, messageBox, rightContainer} 对应整体，用户聊天，右边的容器(呼唤机器人等)

#### redux 改造工程

由前端维护用户聊天记录
对于单个用户/机器人也是
发现一个弊端：redux 不可以存储不可序列化的数据，比如 dom 节点

<!--  -->

为了减少逻辑，我展示将所有客户端的聊天都要经过服务器一遍，这样便于聊天记录管理。、
主要是在添加一个发送时添加到本地队列时有些。。。因为这是会广播到所有服务器的，为了减少一些逻辑负担（大脑心智负担
好像也不复杂，等会加上？还是做的差不多（70%）就优化上吧
问题记录
为了触发渲染，需要修改引用地址，我在浅拷贝时使用{...queue}发现有方法没有继承。
使用 object.create()+assign 可以解决。
