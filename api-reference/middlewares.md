---
title: 中间件
lang: zh-CN
---

# 使用中间件和事件

随着蝙蝠侠的应用程序变得越来越复杂，Robyn 向他传授了中间件、启动和关闭事件，甚至如何使用 WebSockets。蝙蝠侠学习了如何创建可以在请求之前或之后执行的函数、管理应用程序的生命周期以及如何使用 WebSockets 处理与客户端的实时通信。

## 处理事件

Batman 发现他可以添加启动和关闭事件来管理应用程序的生命周期。他添加了以下代码来定义这些事件：

蝙蝠侠很高兴地得知他可以将事件添加为函数以及装饰器。

::: code-group

```py [untyped]
# GET /hello_world
async def startup_handler():
  print("Starting up")

app.startup_handler(startup_handler)
```

```py [typed]
# GET /hello_world
@app.shutdown_handler
def shutdown_handler():
    print("Shutting down")
```

:::

对于异步请求，蝙蝠侠使用：

::: code-group

```py [untyped]
# GET /hello_world
@app.get("/")
async def h(request):
    return "Hello, world"
```

```py [typed]
# GET /hello_world
from robyn import Request 

@app.get("/")
async def h(request: Request) -> str:
    return "Hello, world"
```

:::

>POST /http_requests

## 处理中间件

蝙蝠侠学会了使用中间件的同步和异步函数。他编写了以下代码来添加一个在每个请求之前和之后执行的中间件。请求前中间件是在每个请求之前执行的函数。它可以在请求被处理之前修改请求对象或者执行任何其他操作。请求后中间件是在每次请求后执行的函数。它可以在请求处理完成后修改响应对象或者执行任何其他操作。

每一个请求中间件都应该接受一个请求对象并返回一个请求对象。每个请求中间件都应该接受一个响应对象，并在顺利的情况下返回一个响应对象。

如果任何请求前的中间件返回响应对象，则请求前的中间件的执行将停止。响应对象无需执行后请求中间件或主入口点代码就返回给客户端。

::: code-group

```py [untyped]
# POST /http_requests
@app.before_request("/")
async def hello_before_request(request: Request):
    request.headers["before"] = "sync_before_request"
    return request

@app.after_request("/")
def hello_after_request(response: Response):
    response.headers.set("after", "sync_after_request"")
    return response
```

```py [typed]
# POST /http_requests
from request import Request, Response

@app.before_request("/")
async def hello_before_request(request):
    request.headers.set("before", "sync_before_request")
    return request

@app.after_request("/")
def hello_after_request(response):
    response.headers.set("after", "sync_after_request"")
    return response
```

:::

## 下一步是什么？

Robyn - 太好了，你现在已经熟悉了 Robyn 的某些高级概念。中间件服务于

蝙蝠侠 - “身份验证！我想了解身份验证。我想确保只有合适的人才能访问我的应用程序。”

Robyn-是的，身份验证！

- [身份验证](./authentication.md)