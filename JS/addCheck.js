// 为 text 添加监听器

// 获取邮件
// /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

function addCheck() {
    const textEmailList = document.querySelectorAll(".question.text input");
    if(textEmailList.length == 0) return null;

    textEmailList.forEach((textEmail) => {
        // 获取 label
        const label = textEmail.nextElementSibling;
        if(!label) return null;
        // 正则表达式
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        textEmail.addEventListener("change", () => {
            // @ts-ignore
            const content = textEmail.value.trim();
            if(content == "" || regex.test(content)) {
                // @ts-ignore
                textEmail.style.borderColor = "#6699ff";
                label.textContent = "";
                return null;
            }
            // @ts-ignore
            textEmail.style.borderColor = "#ff6666";
            label.textContent = "输入格式错误";
        });

        textEmail.addEventListener("focus", () => {
            // @ts-ignore
            const content = textEmail.value.trim();
            if(content == "" || regex.test(content))
                // @ts-ignore
                textEmail.style.borderColor = "#6699ff";
        })

        textEmail.addEventListener("blur", () => {
            // @ts-ignore
            const content = textEmail.value.trim();
            // @ts-ignore
            if(content == "" || regex.test(content)) {
                // @ts-ignore
                textEmail.style.borderColor = "#aaa";
            }
        })
    })
}

addCheck()