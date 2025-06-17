const TYPE = ["radio", "checkbox", "text"];

const questionsList = [
    {
        question: "您外出就餐的频率?",
        type: TYPE[0],
        options: ["一个月1次", "半个月1次", "每周1次"],
        must: "*",
    },
    {
        question: "您经常在外就餐的原因?",
        type: TYPE[1],
        options: ["没有时间自己做饭", "朋友邀请", "交际应酬", "休闲放松", "品尝特色美食"],
        must: "*",
    },
    {
        question: "和亲戚朋友聚餐时人均支出：",
        type: TYPE[0],
        options: ["20元以内", "21-50元", "51-100元", "101-150元", "151-200元", "201-300元", "301-500元", "501元以上"],
        must: "*",
    },
    {
        question: "交际或商务应酬就餐时人均支出：",
        type: TYPE[0],
        options: ["20元以内", "21-50元", "51-100元", "101-150元", "151-200元", "201-300元", "301-500元", "501元以上"],
        must: "*",
    },
    {
        question: "您每月在外餐饮消费支出大概为：",
        type: TYPE[0],
        options: ["200元以内", "201-500元", "501-1000元", "1001-1500元", "1501-2500元", "2500元以上"],
        must: "*",
    },
    {
        question: "每月在外餐饮消费支出占所有食品消费支出的比例：",
        type: TYPE[0],
        options: ["20%以内", "21%-40%", "41%-60%", "61%-80%", "80%以上"],
        must: "*",
    },
    {
        question: "您认为您身边环境的餐饮消费价格?",
        type: TYPE[0],
        options: ["很低", "较低", "一般", "较高", "很高"],
        must: "*",
    },
    {
        question: "您选择餐馆消费时，最看重什么?",
        type: TYPE[1],
        options: ["价格便宜", "菜式新颖", "装饰格调好", "服务周到", "朋友推荐", "口味适合", "品牌档次佳"],
        must: "*",
    },
    {
        question: "您更喜欢选择哪类菜系?",
        type: TYPE[1],
        options: ["粤菜", "川湘菜", "其他地方菜系（江浙菜、西北菜等）", "火锅", "西餐", "日韩料理", "南亚（泰国，越南）"],
        must: "*",
    },
    {
        question: "您最常和谁一起就餐?",
        type: TYPE[1],
        options: ["朋友", "家人", "爱人", "同事", "客户", "领导", "同学", "安静独处"],
        must: "*",
    },
    {
        question: "您经常选择的餐饮消费档次?",
        type: TYPE[0],
        options: ["高档餐", "大众化经济餐", "特色小吃", "小摊小贩"],
        must: "*",
    },
    {
        question: "请输入您的邮箱，以便反馈：",
        type: TYPE[2],
        options: ["请输入邮箱"],
        must: "",
    },
];

// 批量生产问题

function createQuestions () {
    // 获取容器
    const questionsContainer = document.getElementById("questionsContainer");
    // 清空容器
    if (questionsContainer == null)
        return false;
    questionsContainer.innerHTML = "";

    // 批量生产问题
    questionsList.forEach((questionObj, index) => {
        // 定义模板
        var questionTemplate = "";
        // 最大位数
        var maxBit = 0;
        var questionLen = questionsList.length;
        while (questionLen > 0) {
            questionLen = Math.floor(questionLen / 10);
            maxBit++;
        }
        var indexStr = (index + 1).toString().padStart(maxBit, "0")
        switch(questionObj.type) {
            case TYPE[1]:
                questionTemplate = itemQuestion(questionObj, indexStr, "多选");
                break;
            case TYPE[0]:
                questionTemplate = itemQuestion(questionObj, indexStr, "");
                break;
            case TYPE[2]:
                questionTemplate = itemQuestion(questionObj, indexStr, "");
                break
            default:
                questionTemplate = "";
        }

        questionsContainer.innerHTML += questionTemplate;
    });
}

// 选择生产
function itemQuestion(questionObj, indexStr, sign) {
    const questionTemplate = `
    <div class="question ${questionObj.type} ${indexStr}">
        <div class="sign">
            <p> ${sign} </p>
        </div>
        <div class="stem">
            <h2>
                <span class="must"> ${questionObj.must} </span>
                <span class="index"> ${indexStr}. </span>
                <span class="content"> ${questionObj.question} </span>
            </h2>
        </div>
        <div class="itemList">
            ${buildOptions(questionObj, indexStr)}
        </div>
    </div>
    `;
    return questionTemplate
}

// 生成选项
function buildOptions(questionObj, index1) {
    const optionsStr = questionObj.options.map((option, index2) => {
        index2 = index2.toString();
        var optionStr = ""

        // 填写型
        if (questionObj.type == "text") {
            optionStr = `
            <div class="item"> <input type="${questionObj.type}" name="${index1}" id="${index1 + index2}" placeholder="${option}"> <label for="${index1 + index2}">  </label> </div>
            `;
            return optionStr
        }

        // 选择型
        optionStr = `
        <div class="item"> <input type="${questionObj.type}" name="${index1}" id="${index1 + index2}" value="${option}"> <label for="${index1 + index2}"> ${option} </label> </div>
        `;
        return optionStr;
    });

    return optionsStr.join("");
}

createQuestions();