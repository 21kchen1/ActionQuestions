import Question from "../../Component/Question/Question.js";
import { TemplateFactor } from "../../Component/Template/Template.js";
import gifJsonList1 from "../../Resource/1.js";

const ImgPath = ".//example.gif"



/**
 * 执行功能并添加组件
 */
async function setAll() {
    const questionList = document.querySelector(".questionBox .questionList");
    var questionFactor = new TemplateFactor(Question);
    // for (let index = 0; index < 300; index++) {
    //     var newDiv = document.createElement('div');
    //     newDiv.className = "theQuestion";
    //     /**
    //      * @type {Question}
    //      */
    //     // @ts-ignore
    //     var question = await questionFactor.create(newDiv);
    //     question.setConfig(new Question.Config(null, null, ImgPath, (value) => {
    //         console.log(value);
    //     }));
    //     questionList?.appendChild(newDiv);
    // }

    gifJsonList1.forEach(async (gifJson) => {
        var newDiv = document.createElement('div');
        newDiv.className = "theQuestion";
        /**
         * @type {Question}
         */
        // @ts-ignore
        var question = await questionFactor.create(newDiv);
        question.setConfig(new Question.Config(null, null, gifJson.src, (value) => {
            console.log(value);
        }));
        questionList?.appendChild(newDiv);
    })
}

export { setAll };