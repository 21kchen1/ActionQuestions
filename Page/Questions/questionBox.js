import Question from "../../Component/Question/Question.js";
import { TemplateFactor } from "../../Component/Template/Template.js";
import gifJsonList1 from "../../Resource/1.js";

const ImgPath = ".//example.gif"
/**
 * 全局数据存储
 */
var gifJsonList = gifJsonList1;

/**
 * 执行功能并添加组件
 */
async function setAll() {
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