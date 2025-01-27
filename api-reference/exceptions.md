---
title: 异常
lang: zh-CN
---

## 自定义异常处理程序

蝙蝠侠学会了如何在应用程序中为不同的异常类型创建自定义错误处理程序。他编写了以下代码来处理异常并返回自定义错误响应：

::: code-group

```py [untyped]
# GET /hello_world
@app.exception
def handle_exception(error):
    return Response(status_code=500, description=f"error msg: {error}", headers={})
```

```py [typed]
# GET /hello_world
@app.exception
def handle_exception(error: Exception):
    return Response(status_code=500, description=f"error msg: {error}", headers={})
```

:::

## 下一步是什么？

现在，Batman 想要将他的应用程序扩展到多个核心。Robyn 引导他进行扩展。

- [扩展](./scaling.md)