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
    def __init__(self, src, name, value) -> None:
        self.src = src
        self.name = name
        self.value = value

def buildJSON(name: str) -> str:
    jsonList = []
    for gifPath in getAllGIF(name):
        jsonList.append(GIFJson(".\\Resource\\" + gifPath, os.path.basename(gifPath), 0).__dict__)

    return f"const gifJsonList{name} = {jsonList};\nexport default gifJsonList{name};"

with open("1.js", "w") as file:
    file.write(buildJSON("1"))