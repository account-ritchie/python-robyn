---
title: 高级功能
lang: zh-CN
---

## 跟踪客户端的 IP 地址

现在门户已经启动并准备就绪，蝙蝠侠意识到小丑也在使用 Gotham 警察仪表板。因此，他想跟踪访问其应用程序的客户端的 IP 地址。他使用了以下代码来实现这一点：

蝙蝠侠将他的应用程序扩展到多个核心以获得更好的性能。他使用了以下命令：

```py
from robyn import Robyn

app = Robyn(__file__)

@app.get("/")
async def h(request):
    return f"hello to you, {request.ip_addr}"
```

## 下一步是什么？

蝙蝠侠想知道如何帮助用户探索他的应用程序中的端点。

Robyn 向他展示了 OpenAPI 文档！

- [OpenAPI 文档](./openapi-documentation.md)

