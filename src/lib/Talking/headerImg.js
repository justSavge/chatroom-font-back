// 前缀公共路径
export const headerImgsPublicPath = "/image/header/";
const robotImgsPublicPath = "/image/robot/";
// 图片名
const headerImgsNames = [
  "header-cat.png",
  "header-child.png",
  "header-default.png",
  "header-dog.png",
  "header-man.png",
  "header-woman.png",
];
const robotImgsWithDescription = [
  {
    imgPath: "default-robot.png",
    description: {
      title: "默认",
      content: "作为大模型正常回答",
    },
  },
  {
    imgPath: "man-passion.png",
    description: {
      title: "阳光男孩",
      content: "阳光开朗，自信健谈",
    },
  },
  {
    imgPath: "man-success.png",
    description: {
      title: "成功男士",
      content: "成熟稳重，蕴藏智慧",
    },
  },
  {
    imgPath: "woman-cute.png",
    description: {
      title: "邻家小妹",
      content: "可爱狡黠，充满活力",
    },
  },
  {
    imgPath: "woman-help.png",
    description: {
      title: "暖心姐姐",
      content: "知性温柔，安抚人心",
    },
  },
];
// 拼接
const headerImgs = headerImgsNames.map((name) => headerImgsPublicPath + name);
robotImgsWithDescription.forEach(
  (item) => (item.imgPath = robotImgsPublicPath + item.imgPath)
);

export { headerImgs, robotImgsWithDescription };
