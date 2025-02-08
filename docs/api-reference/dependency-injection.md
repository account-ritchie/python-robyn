---
title: 依赖注入
lang: zh-CN
---

# 依赖注入

Batman 想要了解 Robyn 中的依赖注入。Robyn 向他介绍了依赖注入的概念以及如何在 Robyn 中使用它。

Robyn 有两种类型的依赖注入：一种是应用程序级别，另一种是路由器级别。

**应用程序级依赖注入**

应用程序级依赖注入用于将依赖项注入应用程序。这些依赖项可供所有请求使用。

::: code-group

```py [untyped]
# GET /hello_world
from robyn import Robyn, ALLOW_CORS

app = Robyn(__file__)
GLOBAL_DEPENDENCY = "GLOBAL DEPENDENCY"

app.inject_global(GLOBAL_DEPENDENCY=GLOBAL_DEPENDENCY)

@app.get("/sync/global_di")
def sync_global_di(request, global_dependencies):
return global_dependencies["GLOBAL_DEPENDENCY"]
```

```py [typed]
# GET /hello_world
from robyn import Robyn, ALLOW_CORS

app = Robyn(__file__)
GLOBAL_DEPENDENCY = "GLOBAL DEPENDENCY"

app.inject_global(GLOBAL_DEPENDENCY=GLOBAL_DEPENDENCY)

@app.get("/sync/global_di")
def sync_global_di(request, global_dependencies):
return global_dependencies["GLOBAL_DEPENDENCY"]
```

:::

**路由器级依赖注入**

路由器级依赖注入用于将依赖项注入路由器。这些依赖项可用于该路由器的所有请求。

::: code-group

```py [untyped]
# GET /hello_world
from robyn import Robyn, ALLOW_CORS

app = Robyn(__file__)
ROUTER_DEPENDENCY = "ROUTER DEPENDENCY"

app.inject(ROUTER_DEPENDENCY=ROUTER_DEPENDENCY)

@app.get("/sync/global_di")
def sync_global_di(r, router_dependencies): # r is the request object
return router_dependencies["ROUTER_DEPENDENCY"]
```

```py [typed]
# GET /hello_world
from robyn import Robyn, ALLOW_CORS, Request

app = Robyn(__file__)
ROUTER_DEPENDENCY = "ROUTER DEPENDENCY"

app.inject(ROUTER_DEPENDENCY=ROUTER_DEPENDENCY)

@app.get("/sync/global_di")
def sync_global_di(r: Request, router_dependencies):
return router_dependencies["ROUTER_DEPENDENCY"]
```

:::

:::tip

`router_dependencies`、`global_dependencies` 是保留参数，必须这样命名。这些参数的顺序无关紧要。

但是，`router_dependencies` 和 `global_dependencies` 必须位于请求参数之后。

:::

## 下一步是什么？

蝙蝠侠熟悉黑暗面，他想知道异常！

Robyn 向他介绍了异常的概念以及如何使用异常来处理应用程序中的错误。

- [异常](./exceptions.md)