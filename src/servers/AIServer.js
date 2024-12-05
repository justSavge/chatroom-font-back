const passkey = "Bearer igVyBuRZclTjpdCeXtdX:ZLKUFGGzzhjQJAbbYkFi";
//没有好的办法隐藏密钥，漏了就漏了吧，如果有可能的话使用jwt会好一些
const AIUrl = "https://spark-api-open.xf-yun.com/v1/chat/completions";
const defaultHeader = {
  "Content-Type": "application/json",
  Authorization: passkey,
};
const defaultBody = (question) =>
  JSON.stringify({
    model: "4.0Ultra",
    messages: [
      {
        role: "user",
        content: question,
      },
    ],
  });
export async function sendAIQuestion(question) {
  if (question === "") return "请输入问题";
  const response = await fetch(AIUrl, {
    headers: defaultHeader,
    method: "post",
    body: defaultBody(question),
  });
  const data = await response.json();
  const choices = data.choices;
  const { message } = choices[0];
  return message;
}
