import Question from "../../Component/Question/Question.js";
import { TemplateFactor } from "../../Component/Template/Template.js";

/**
 * 执行功能并添加组件
 */
async function setAll() {
    const questionList = document.querySelector(".questionBox .questionList");
    var questionFactor = new TemplateFactor(Question);
    for (let index = 0; index < 3; index++) {
        var newDiv = document.createElement('div');
        newDiv.className = "theQuestion";
        var question = questionFactor.create(newDiv);
        questionList?.appendChild(newDiv);
    }
}

export { setAll };