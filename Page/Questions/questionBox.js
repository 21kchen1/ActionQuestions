import Question from "../../Component/Question/Question.js";
import { TemplateFactor } from "../../Component/Template/Template.js";
import gifJsonListSet from "../../Resource/gifResource.js";

/**
 * 全局数据存储
 */
var gifJsonList;

/**
 * 设置题目类型
 */
function getGifJsonList() {
    // 获取当前页面的 URL
    const url = new URL(window.location.href);
    // 使用 URLSearchParams 解析查询字符串
    const params = new URLSearchParams(url.search);
    // 获取参数
    const type = params.get("type")
    return gifJsonListSet[Number(type)];
}

/**
 * 执行功能并添加组件
 */
async function setAll() {
    gifJsonList = getGifJsonList();

    const questionList = document.querySelector(".questionBox .questionList");
    var questionFactor = new TemplateFactor(Question);
    // 为每一个图片设置题目和回调
    gifJsonList.forEach(async (gifJson, index) => {
        var newDiv = document.createElement('div');
        newDiv.className = "theQuestion";
        newDiv.id = gifJson.fname;
        /**
         * @type {Question}
         */
        // @ts-ignore
        var question = await questionFactor.create(newDiv);
        question.setConfig(new Question.Config(null, null, `${index + 1}. ${gifJson.atype}`, gifJson.src, (value) => {
            gifJson.value = Number(value);
            console.log(`index: ${index + 1}, fname: ${gifJsonList[index].fname}, value: ${gifJsonList[index].value}`);
        }));
        questionList?.append()
        questionList?.appendChild(newDiv);
    })
}

export { setAll, gifJsonList };