import {Template} from "../Template/Template.js";

/**
 * 问题组件
 */
class Question extends Template {
    static scriptPath = new URL(import.meta.url).pathname;
    static scriptDir = this.scriptPath.substring(0, this.scriptPath.lastIndexOf("/"));
    /**
     * 构造函数
     * @param {HTMLElement} cup 模板容器
     */
    constructor(cup) {
        super(cup);
        this.inputSlider = this.getElement(".Rating input");
        this.inputLabel = this.getElement(".Rating .RatingValue");;

        this.inputSlider.addEventListener("input", () => {
            // @ts-ignore
            this.inputLabel.textContent = this.inputSlider.value;
            // 设置完成后的颜色
            this.controlElement.classList.remove("finish");
            // @ts-ignore
            if (this.inputSlider.value !== "0") {
                this.controlElement.classList.add("finish");
            }
        });
    }

    /**
     * 配置按钮
     * @param {Question.Config} config
     */
    setConfig(config) {
        if (config.color)
            this.setMainColor(config.color);
    }
}

/**
 * 配置子类
 */
Question.Config = class {
    /**
     * @param {string | null} color 颜色
     */
    constructor(color) {
        this.color = color;
    }
}

export default Question;