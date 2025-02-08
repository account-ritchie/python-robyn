---
title: CORS
lang: zh-CN
---

# CORS

每当蝙蝠侠尝试访问 API 时都会收到 CORS 错误，这让他很恼火。

## 扩展应用程序

您可以通过添加以下代码来允许应用程序使用 CORS：

::: code-group

```py [untyped]
# GET /hello_world
from robyn import Robyn, ALLOW_CORS

  app = Robyn(__file__)
  ALLOW_CORS(app, origins = ["http://localhost:<PORT>/"])
```

```py [typed]
# GET /hello_world
from robyn import Robyn, ALLOW_CORS

  app = Robyn(__file__)
  ALLOW_CORS(app, origins = ["http://localhost:<PORT>/"])
```

:::

## 下一步是什么？

修复 CORS 问题后，蝙蝠侠感到很满意，但他想了解如何在服务器本身中拥有小型前端页面。

Robyn 向他介绍了模板以及如何使用模板来呈现 HTML 页面。

- [模板](./templating.md)
