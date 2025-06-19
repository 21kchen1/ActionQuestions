import os
from typing import List

def getFilePaths(rootPath: str) -> List[str]:
    """
    获取根目录中所有文件路径

    Args:
        rootPath (str): 根目录

    Returns:
        list: 文件路径列表
    """
    filePaths = []
    for root, _, fileNames in os.walk(rootPath):
        filePaths.extend([os.path.join(root, fileName) for fileName in fileNames])
    return filePaths

def getAllGIF(path: str) -> List[str]:
    return [gifPath for gifPath in getFilePaths(path) if gifPath.endswith(".gif")]

# print(getAllGIF("1"))

class GIFJson:
    def __init__(self, src, fname, atype, value) -> None:
        self.src = src
        self.fname = fname
        self.atype = atype
        self.value = value

atypeDict = {
    "BackhandTransition": "反手过渡球",
    "ForehandHigh": "正手高远球",
    "ForehandKill": "正手杀球",
    "ForehandLob": "正手吊球",
}

def buildJSON(name: str) -> str:
    jsonList = []
    for gifPath in getAllGIF(name):
        src = ".\\Resource\\" + gifPath
        fname = os.path.basename(gifPath)
        atype = atypeDict.get(fname.split("_")[2])
        jsonList.append(GIFJson(src, fname, atype,0).__dict__)

    return f"const gifJsonList{name} = {jsonList};\nexport default gifJsonList{name};"

for index in range(1, 4):
    with open(f"{index}.js", "w", encoding= "utf-8") as file:
        file.write(buildJSON(f"{index}"))