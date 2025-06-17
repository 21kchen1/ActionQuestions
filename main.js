import ProgressBar from "./Component/ProgressBar/ProgressBar.js";

/**
 * 设置控制全局组件比例的 controllLen
 */
function setSize() {
    // 获取窗口宽度
    let windowWide = window.innerWidth;
    document.documentElement.style.setProperty('--controlLen', String(windowWide));
}

document.addEventListener("DOMContentLoaded", () => {
    const baseBox = document.querySelector(".progressBox");
    const progressBar = new ProgressBar(baseBox);
    const baseBox1 = document.querySelector(".controlBox");
    const progressBar1 = new ProgressBar(baseBox1);
    progressBar1.setSizeRatio(0.4);
    // 初始化
    setSize();
    // 添加监视器
    window.addEventListener("resize", () => {
        setSize();
    })
});
