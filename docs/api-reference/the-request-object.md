---
title: 请求对象
lang: zh-CN
---

## 请求对象

请求对象是一个包含有关请求的所有信息的数据类。它在路由处理程序中可用作第一个参数。

请求对象在 Rust 端创建，但作为数据类暴露给 Python。

- 属性：
- query_params (QueryParams)：请求的查询参数。例如 `/user?id=123 -> {"id": [ "123" ]}`
- headers (dict[str, str]): 请求的标头。例如 `{"Content-Type": "application/json"}`
- params (dict[str, str]): 请求的参数。例如 `/user/:id -> {"id": "123"}`
- body (Union[str, bytes])：请求的主体。如果请求是 JSON，它将是一个字典。
- method (str): 请求的方法。例如 `GET、POST、PUT、DELETE`
- ip_addr (可选[str]): 客户端的 IP 地址
- identity（可选[Identity]）：客户端的身份

::: code-group

```py [untyped]
# GET /hello_world
@dataclass
class Request:
  """
  query_params: QueryParams
  headers: Headers
  path_params: dict[str, str]
  body: Union[str, bytes]
  method: str
  url: Url
  form_data: dict[str, str]
  files: dict[str, bytes]
  ip_addr: Optional[str]
  identity: Optional[Identity]
  """
```

```py [typed]
# GET /hello_world
@dataclass
class Request:
  """
  query_params: QueryParams
  headers: Headers
  path_params: dict[str, str]
  body: Union[str, bytes]
  method: str
  url: Url
  form_data: dict[str, str]
  files: dict[str, bytes]
  ip_addr: Optional[str]
  identity: Optional[Identity]
  """
```

:::

## 额外路径参数

Robyn 支持在路由定义中使用 `extra` 语法捕获额外的路径参数。这样您就可以捕获定义路由之后的 URL 路径中的任何其他段。

例如，如果你定义这样的路线：

```py
@app.get("/sync/extra/*extra")
def sync_param_extra(request: Request):
    extra = request.path_params["extra"]
    return extra
```

`/sync/extra/` 之后的任何其他路径段都将被捕获到 `extra` 参数中。例如：

- 对 `/sync/extra/foo/bar` 的请求将导致 `extra = "foo/bar"`
- 对 `/sync/extra/123/456/789` 的请求将导致 `extra = "123/456/789"`

您可以通过路由处理程序中的 `request.path_params["extra"]` 访问额外的路径参数。

当您需要处理动态、嵌套路线或想要捕获未知数量的路径段时，此功能特别有用。

## 下一步是什么？

现在，蝙蝠侠想要了解 Robyn 服务器的配置。然后他了解到了 Robyn 环境文件的概念。

- [Robyn Env](./robyn-env.md)