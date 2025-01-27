---
title: 重定向
lang: zh-CN
---

# 重定向

蝙蝠侠希望将一些端点重定向到其他端点。罗宾通过以下方式帮助他实现了这一目标：

```py
from robyn import Robyn, Response
app = Robyn(__file__)

@app.get("/")
async def index():
  return Response(
    status_code=307,
    description="",
    headers={"Location": "landing"},
  )

@app.get("/landing")
def landing():
  return "hii!"
```

## 下一步是什么？

现在，蝙蝠侠希望能够在出现新的反派时将文件上传到服务器。罗宾向他介绍了文件上传和一些表单数据功能。

- [文件上传](./file-uploads.md)