---
title: 表单数据
lang: zh-CN
---

## 表单数据和多部分表单数据

蝙蝠侠学会了如何使用 Robyn 处理文件上传。现在，他想处理表单数据。

## 处理多部分表单数据

蝙蝠侠上传了一些多部分表单数据，并希望使用以下代码来处理它：

::: code-group

```py [untyped]
# GET /hello_world
@app.post("/upload")
async def upload(request):
  form_data = request.form_data

  return form_data
```

```py [typed]
# GET /hello_world
@app.post("/upload")
async def upload(request: Request):
  form_data = request.form_data

  return form_data
```

:::

## 下一步是什么？

现在，蝙蝠侠准备了解 Robyn 的高级功能。他想找到一种方法来在仪表板上获取实时更新。

- [WebSockets](./web-sockets.md)