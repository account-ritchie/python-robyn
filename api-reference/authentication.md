---
title: 身份验证
lang: zh-CN
---

在创建了应用程序的基本版本后，蝙蝠侠想要限制对哥谭警察局的访问。因此，他询问了 Robyn 中的身份验证功能。

# 身份验证

正如蝙蝠侠发现的那样，Robyn 提供了一种向应用程序添加身份验证中间件的简单方法。然后，您可以在路由中指定 auth_required=True，以使它们仅供经过身份验证的用户访问。

::: code-group

```py [untyped]
# GET /hello_world
@app.get("/auth", auth_required=True)
async def auth(request: Request):
    # 仅当用户通过身份验证后，才会执行此路由方法
    # 否则将返回 401 响应
    return "Hello, world"
```

```py [typed]
# GET /hello_world
@app.get("/auth", auth_required=True)
async def auth(request: Request):
    # 仅当用户通过身份验证后，才会执行此路由方法
    # 否则将返回 401 响应
    return "Hello, world"
```

:::

要添加身份验证中间件，可以使用 `configure_authentication` 方法。此方法需要一个 `AuthenticationHandler` 对象作为参数。该对象指定如何验证用户，并使用 `TokenGetter` 对象从请求中检索令牌。Robyn 目前确实提供了一个 `BearerGetter` 类，该类使用 `Bearer` 方案从 `Authorization` 标头获取令牌。以下是基本身份验证处理程序的示例：

::: code-group

```py [untyped]
# GET /hello_world
class BasicAuthHandler(AuthenticationHandler):
  def authenticate(self, request: Request) -> Optional[Identity]:
      token = self.token_getter.get_token(request)
      if token == "valid":
          return Identity(claims={})
      return None

app.configure_authentication(BasicAuthHandler(token_getter=BearerGetter()))
```

```py [typed]
# GET /hello_world
class BasicAuthHandler(AuthenticationHandler):
  def authenticate(self, request: Request) -> Optional[Identity]:
      token = self.token_getter.get_token(request)
      if token == "valid":
          return Identity(claims={})
      return None

app.configure_authentication(BasicAuthHandler(token_getter=BearerGetter()))
```

:::

如果用户通过了身份验证，则 authenticate 方法应该返回 Identity 对象，否则返回 None。Identity 对象可以包含您想要的任何数据，并且可以使用 request.identity 属性在路由方法中访问。

::: tip

该身份验证系统基本上只使用后台的请求中间件。

这意味着您可以忽略它并使用中间件创建自己的身份验证系统（如果您愿意）。但是，Robyn 仍然提供了这种易于实施的解决方案，应该适合大多数用例。

:::

## 下一步是什么？

现在，蝙蝠侠已经了解了身份验证，他想知道一些可以用来提高应用程序速度的优化技术。他发现了以下功能

- [Const 请求和多核扩展](./const-requests.md)

