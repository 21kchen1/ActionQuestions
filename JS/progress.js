// 获取进度
const preProBox = document.querySelector(".preProBox");
const proBox = document.querySelector(".proBox");

// 进度条悬浮
window.addEventListener("scroll", () => {
    if(!preProBox || !proBox) return false;
    // 获取导航栏位置信息
    let guideWinDisTop = preProBox.getBoundingClientRect().top;

    if(guideWinDisTop >= 0) {
        // @ts-ignore
        proBox.style.position = "static";
        // @ts-ignore
        proBox.style.boxShadow = "none";
        // @ts-ignore
        proBox.style.width = "100%"
        return;
    }
    // @ts-ignore
    proBox.style.position = "fixed";
    // @ts-ignore
    proBox.style.top = "0";
    // @ts-ignore
    proBox.style.width = "80%"
    // @ts-ignore
    proBox.style.boxShadow = "0 5px 10px -5px rgba(0, 0, 0, 0.5)";
})

// 答题进度条计算
const questions = document.querySelectorAll(".question");
// 已完成题目数
var allNum = questions.length;
var completeNum = 0;
// 获取进度条
const fillerFinsh = document.querySelector(".filler.finsh")
// 访问判定
var vister = new Map()

function toStringNum(num) {
    return (num * 100).toString() + "%";
}

// 加入监听器
questions.forEach((question) => {
    // 使用 change 监听
    vister.set(question.className, false)
    question.addEventListener("change", () => {
        const selectedOptions = question.querySelectorAll("input:checked");
        const textInput = question.querySelector("input[type='text']");
        // 如果有选择 或有填空且有内容 且 未触发
        // @ts-ignore
        if ((selectedOptions.length !== 0 || (textInput && textInput.value.trim() !== '')) && (vister.get(question.className) == false)) {
            completeNum += 1;
            vister.set(question.className, true)
        // 当没有选择 或 填空为空
        // @ts-ignore
        }else if(((selectedOptions.length == 0 && !textInput) || (textInput && textInput.value.trim() == '')) && (vister.get(question.className) == true)){
            completeNum -= 1;
            vister.set(question.className, false)
        }
        if(allNum == 0 || !fillerTime) return null;
        // @ts-ignore
        fillerFinsh.style.width = toStringNum(completeNum / allNum);
    });
})

// 计时进度条
// 获取时间进度条
const fillerTime = document.querySelector(".filler.time");
// 总时间
const limitTime = 120;
// 现在时间
var seconds = 0;

// 计时器
setInterval(() => {
    if(seconds >= limitTime) {
        seconds = 0;
        alert("调查时间结束");
        timeOut();
    }
    seconds += 1;
    if(!fillerTime) return null;
    // @ts-ignore
    fillerTime.style.width = toStringNum(seconds / limitTime);
}, 1000);


// 超时函数
function timeOut() {

    // 遍历问题 清空
    questions.forEach((question) => {
        const selectedOptions = question.querySelectorAll("input:checked");
        const textInputs = question.querySelectorAll("input[type='text']");

        selectedOptions.forEach((select) => {
            // @ts-ignore
            select.checked = false;
        });

        if(textInputs) {
            textInputs.forEach((text) => {
                // @ts-ignore
                text.value = "";
                const label = text.nextElementSibling;
                if(!label) return null;
                // 清空标签
                label.textContent = "";
            });
        }

        if(!fillerFinsh) return null;
        // @ts-ignore
        fillerFinsh.style.width = toStringNum(0);
        // @ts-ignore
        fillerTime.style.width = toStringNum(0);
        // 触发监视器
        var event = new Event('change');
        question.dispatchEvent(event);
        textInputs.forEach((text) => {
            text.dispatchEvent(event);
            // @ts-ignore
            text.style.borderColor = "#aaa";
        })
    });
}

// 数据保存到本地
function saveData() {
    questions.forEach((question, index) => {
        const selectedOptions = question.querySelectorAll("input:checked");
        const textInput = question.querySelector("input[type='text']");

        // 存储答案
        var ansString = "";
        selectedOptions.forEach((option) => {
            // @ts-ignore
            ansString += option.value;
        })

        // 如果没有 或者 为空
        // @ts-ignore
        if(textInput && textInput.value.trim() !== "") {
            // @ts-ignore
            ansString += textInput.value;
        }

        localStorage.setItem(index.toString(), ansString)
    });
}

// 提交
const button = document.querySelector(".submitBox button");

button?.addEventListener("click", () => {
    // 计算分数
    var grade = 0;

    var flag = true;

    questions.forEach((question) => {
        const selectedOptions = question.querySelectorAll("input:checked");
        const textInput = question.querySelector("input[type='text']");

        // @ts-ignore
        if((selectedOptions.length == 0 && !textInput) || (textInput && textInput.value.trim() == '')) {
            flag = false;
            return null;
        }

        grade += selectedOptions.length;
        if(textInput)
            grade += 1;
    });

    if(flag) {
        saveData();
        timeOut();
        var respon = "用时：" + seconds.toString() + "s\n" + "分数：" + grade.toString();
        alert(respon);
        seconds = 0;
    }else {
        alert("题目未完成");
    }
})

