import Button from "../../Component/Button/Button.js";
import ProgressBar from "../../Component/ProgressBar/ProgressBar.js";
import { TemplateFactor } from "../../Component/Template/Template.js"
import { gifJsonList } from "./questionBox.js"

/**
 * 添加控制栏浮空
 */
function addFloat() {
    const embedBox = document.querySelector(".coreBox .embedBox");
    const floatBox = document.querySelector(".coreBox .floatBox");
    window.addEventListener("scroll", () => {
        if (!(embedBox instanceof HTMLElement) || !(floatBox instanceof HTMLElement)) return;
        // 获取顶部位置信息
        let topDis = embedBox.getBoundingClientRect().top;
        if (topDis >= 0) {
            floatBox.style.position = "static";
            floatBox.style.boxShadow = "none";
            floatBox.style.width = "100%"
            return;
        }
        floatBox.style.position = "fixed";
        floatBox.style.top = "0";
        floatBox.style.width = "80%"
        floatBox.style.boxShadow = "0 5px 10px -5px rgba(0, 0, 0, 0.5)";
    });
}

/**
 * 跳转到未完成题目回调函数
 */
function scrollToUndone() {
    for (let index = 0; index < gifJsonList.length; index++) {
        if (gifJsonList[index].value !== 0)
            continue;
        // 获取未完成题目元素
        var undoneQuestion = document.getElementById(gifJsonList[index].fname);
        // 滚动
        undoneQuestion?.scrollIntoView({
            // 平滑滚动
            behavior: 'smooth',
            // 将目标元素置于视口中央
            block: 'center'
        })
        break;
    }
}

/**
 * 执行功能并添加组件
 */
async function setAll() {
    addFloat();

    // 添加进度条
    var barFactor = new TemplateFactor(ProgressBar);
    const progressBox = document.querySelector(".coreBox .floatBox .progressBox");
    /**
     * @type {ProgressBar}
     */
    // @ts-ignore
    var theBar = await barFactor.create(progressBox);
    theBar.setProgress(60);

    // 添加控制按钮
    var buttonFactor = new TemplateFactor(Button)

    // 保存
    const saveButtonBox = document.querySelector(".coreBox .floatBox .controlButton#save");
    /**
     * @type {Button}
     */
    // @ts-ignore
    var saveButton = await buttonFactor.create(saveButtonBox);
    saveButton.setConfig(new Button.Config("保存", "var(--MainGreen)", null));

    // 跳转
    const jumpButtonBox = document.querySelector(".coreBox .floatBox .controlButton#jump");
    /**
     * @type {Button}
     */
    // @ts-ignore
    var jumpButton = await buttonFactor.create(jumpButtonBox);
    jumpButton.setConfig(new Button.Config("跳转", "var(--MainRed)", scrollToUndone));

    // 提交
    const submitButtonBox = document.querySelector(".coreBox .floatBox .controlButton#submit");
    /**
     * @type {Button}
     */
    // @ts-ignore
    var submitButton = await buttonFactor.create(submitButtonBox);
    submitButton.setConfig(new Button.Config("提交", null, ()=>{}));
}

export { setAll };