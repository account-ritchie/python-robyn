---
title: Const 请求和多核扩展
lang: zh-CN
---

经过身份验证后，蝙蝠侠担心高峰时段的网站流量。他担心当小丑再次试图将所有罪犯从阿卡姆疯人院救出来时，服务器会崩溃。因此，Robyn 向他介绍了 Const Requests 功能和多核扩展潜力。

## Const 请求

罗宾告诉蝙蝠侠，你可以预先计算每条路线的响应。这将在执行之前计算响应。这将缩短响应时间，无需访问路由器。

::: code-group

```py [untyped]
# GET /hello_world
@app.get("/", const=True)
async def h():
    return "Hello, world"
```

```py [typed]
# GET /hello_world
@app.get("/", const=True)
async def h():
    return "Hello, world"
```

:::

## 多核扩展

Robyn 告诉蝙蝠侠，他可以使用 --workers 标志将应用程序扩展到多个核心。这将创建应用程序的多个实例，并在它们之间分配负载。这将提高应用程序的性能。

::: code-group

```py [untyped]
python3 app.py --workers=N --process=M
```

```py [typed]
python3 app.py --workers=N --process=M
```

:::

如果用户通过了身份验证，则 authenticate 方法应该返回 Identity 对象，否则返回 None。Identity 对象可以包含您想要的任何数据，并且可以使用 request.identity 属性在路由方法中访问。

::: tip

该身份验证系统基本上只使用后台的请求中间件。

这意味着如果您愿意的话，您可以忽略它并使用中间件创建自己的身份验证系统。不过，Robyn 仍然提供了这个易于实施的解决方案，它应该适合大多数用例。

:::


## 下一步是什么？

在应用程序运行得更快之后，蝙蝠侠很高兴，并想从他的前端仪表板发出请求。

但他遇到了 CORS 问题！他向 Robyn 询问如何解决这个问题。Robyn 告诉他以下功能

- [CORS](./cors.md)