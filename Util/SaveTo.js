/**
 * 保存数据为 json 并下载
 * @param {*} object 需要保存的对象
 * @param {string} fileName 保存文件名称
 */
function saveToJSONandDownload(object, fileName) {
    // 将数据转换为 JSON 字符串
    const jsonContent = JSON.stringify(object, null, 4);

    // 创建一个 Blob 对象
    const blob = new Blob([jsonContent], { type: 'application/json' });

    // 创建一个指向该 Blob 的 URL
    const url = URL.createObjectURL(blob);

    // 创建一个 <a> 标签并触发下载
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.json`; // 设置下载文件的名称
    a.click();

    // 释放 URL 对象
    URL.revokeObjectURL(url);
}

export {saveToJSONandDownload}