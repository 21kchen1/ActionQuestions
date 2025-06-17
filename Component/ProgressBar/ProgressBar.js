import Template from "../Template/Template.js";

/**
 * 进度条组件
 */
class ProgressBar extends Template {
    /**
     * 构造函数
     * @param {HTMLElement} cup 模板容器
     */
    constructor(cup) {
        const scriptPath = new URL(import.meta.url).pathname;
        const scriptDir = scriptPath.substring(0, scriptPath.lastIndexOf("/"));
        super(cup, scriptDir);
        this.loadCSS();
        this.loadHTML();
    }
}

export default ProgressBar;