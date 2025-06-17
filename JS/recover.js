// 恢复数据
const newquestions = document.querySelectorAll(".question");

function recoverData() {
    // 遍历每一题
    newquestions.forEach((question, index) => {
        // 遍历每一个选项
        const options = question.querySelectorAll("input");
        const reData = localStorage.getItem(index.toString()) || "";
        options.forEach((option) => {
            // 如果是文本
            if(option.type == "text") {
                option.value = reData;
            }
            // 如果是选择
            if(reData.includes(option.value)) {
                option.checked = true;
            }
        })

        // 触发监视器
        var event = new Event('change');
        question.dispatchEvent(event);
        options.forEach((option) => {
            option.dispatchEvent(event);
        })
    });
}

recoverData();