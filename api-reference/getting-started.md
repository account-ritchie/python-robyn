---
title: 快速开始
lang: zh-CN
---

## 同步和异步请求

首先，罗宾向蝙蝠侠讲解了处理同步和异步请求的能力。蝙蝠侠很高兴了解到这些功能并开始在应用程序中实现它们。

对于一个简单的同步请求，蝙蝠侠写道：

::: code-group

```py [untyped]
# GET /hello_world
from robyn import Robyn

app = Robyn(__file__)

@app.get("/")
def h(request):
    return "Hello, world"

app.start(port=8080, host="0.0.0.0") # 主机是可选的，默认为 127.0.0.1
```

```py [typed]
# GET /hello_world
from robyn import Robyn, Request

app = Robyn(__file__)

@app.get("/")
def h(request: Request):
    return "Hello, world"

app.start(port=8080, host="0.0.0.0")
```

:::

对于异步请求，Batman 使用：

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

## 运行应用程序

蝙蝠侠对如何运行该应用程序感到好奇。罗宾解释说，他可以通过一个简单的命令 `python3 app.py` 来运行该应用程序。

Robyn 应用程序向用户公开某些命令。这些命令可用于运行应用程序或生成新项目。

```bash
# GET /hello_world

usage: app.py [-h] [--processes PROCESSES] [--workers WORKERS] [--log-level LOG_LEVEL] [--create] [--docs] [--open-browser] [--version]

Robyn, a fast async web framework with a rust runtime.

options:
  -h, --help            show this help message and exit
  --processes PROCESSES
                        Choose the number of processes. [Default: 1]
  --workers WORKERS     Choose the number of workers. [Default: 1]
  --dev                 Development mode. It restarts the server based on file changes.
  --log-level LOG_LEVEL
                        Set the log level name
  --create              Create a new project template.
  --docs                Open the Robyn documentation.
  --open-browser        Open the browser on successful start.
  --version             Show the Robyn version.
  --compile-rust-path COMPILE_RUST_PATH
                        Compile rust files in the given path.
  --create-rust-file CREATE_RUST_FILE
                        Create a rust file with the given name.
  --disable-openapi     Disable the OpenAPI documentation.
  --fast                Fast mode. It sets the optimal values for processes, workers and log level. However, you can override them.
```

或者可以使用 Robyn 的 CLI 运行该应用程序，即使用 `python -m robyn app.py`

```bash
# GET /hello_world

usage: python -m robyn app.py [-h] [--processes PROCESSES] [--workers WORKERS] [--dev] [--log-level LOG_LEVEL] [--create] [--docs] [--open-browser] [--version]

Robyn, a fast async web framework with a rust runtime.

options:
  -h, --help            show this help message and exit
  --processes PROCESSES
                        Choose the number of processes. [Default: 1]
  --workers WORKERS     Choose the number of workers. [Default: 1]
  --dev                 Development mode. It restarts the server based on file changes.
  --log-level LOG_LEVEL
                        Set the log level name
  --create              Create a new project template.
  --docs                Open the Robyn documentation.
  --open-browser        Open the browser on successful start.
  --version             Show the Robyn version.
  --compile-rust-path COMPILE_RUST_PATH
                        Compile rust files in the given path.
  --create-rust-file CREATE_RUST_FILE
                        Create a rust file with the given name.
  --disable-openapi     Disable the OpenAPI documentation.
  --fast                Fast mode. It sets the optimal values for processes, workers and log level. However, you can override them.
```

## 处理不同的 HTTP 请求

随后，Robyn 教 Batman 如何处理各种 HTTP 请求，例如 GET、POST、PUT、PATCH 和 DELETE。在 Robyn 的指导下，Batman 可以为每种请求类型创建端点，从而使应用程序变得多功能且高效。

例如，蝙蝠侠学会了创建这样的 POST 请求：

::: code-group

```py [untyped]
# GET /hello_world
@app.post("/")
async def h(request):
    return "Hello World"
```

```py [typed]
# GET /hello_world
from robyn import Request

@app.post("/")
async def h(request: Request):
    return "Hello World"
```

:::

## 返回 JSON 响应

蝙蝠侠对应用程序返回 JSON 响应的能力很好奇。罗宾向他展示了如何使用 `jsonify` 函数来实现这一点。

蝙蝠侠现在可以从他的应用程序返回 JSON 响应，从而更容易在前端解析数据。

::: code-group

```py [untyped]
# GET /hello_world
from robyn import jsonify

@app.post("/jsonify")
async def json(request):
    return {"hello": "world"}
```

```py [typed]
# GET /hello_world
from robyn import jsonify, Request

@app.post("/jsonify")
async def json(request: Request):
    return {"hello": "world"}
```

:::

## 访问路径参数和查询参数

蝙蝠侠对如何从传入请求中访问路径参数和查询参数感到好奇。这使得蝙蝠侠能够创建动态路由并从请求中收集特定信息。

Robyn 还向蝙蝠侠展示了如何从传入请求中访问路径参数和查询参数。

例如，蝙蝠侠可以创建一个带有路径参数的路线并像这样访问它：

::: code-group

```py [untyped]
# POST /http_requests
from robyn import jsonify

@app.post("/jsonify/:id")
async def json(request, path_params):
    print(request.path_params["id"])
    print(path_params["id"])
    assert request.path_params["id"] == path_params["id"]
    return {"hello": "world"}
```

```py [typed]
# POST /http_requests
from robyn import jsonify
from robyn.types import PathParams

@app.post("/jsonify/:id")
async def json(req_obj: Request, path_parameters: PathParams):
    print(req_obj.path_params["id"])
    print(path_params["id"])
    assert req_obj.path_params["id"] == path_parameters["id"]
    return {"hello": "world"}
```

:::

为了访问查询参数，蝙蝠侠可以使用以下代码片段：

::: code-group

```py [untyped]
# POST /http_requests
@app.get("/query")
async def query_get(request, query_params):
    query_data = query_params.to_dict()
    assert query_data == request.query_params.to_dict()
    return jsonify(query_data)
```

```py [typed]
# POST /http_requests
from robyn import Request
from robyn.robyn import QueryParams

@app.get("/query")
async def query_get(req_obj: Request, query_params: QueryParams):
    query_data = query_params.to_dict()
    assert query_data == req_obj.query_params.to_dict()
    return jsonify(query_data)
```

:::

任何请求参数都可以在处理程序函数中使用，可以使用类型注释或使用保留名称。

::: tip

请注意，类型注释将优先于保留名称。

:::

Robyn 向蝙蝠侠展示了访问请求参数的示例语法：

```py
# GET /split_request_params
from robyn.robyn import QueryParams, Headers
from robyn.types import PathParams, RequestMethod, RequestBody, RequestURL

@app.get("/untyped/query_params")
def untyped_basic(query_params):
    return query_params.to_dict()


@app.get("/typed/query_params")
def typed_basic(query_data: QueryParams):
    return query_data.to_dict()


@app.get("/untyped/path_params/:id")
def untyped_path_params(query_params: PathParams):
    return query_params  # contains the path params since the type annotations takes precedence over the reserved names


@app.post("/typed_untyped/combined")
def typed_untyped_combined(
        query_params,
        method_data: RequestMethod,
        body_data: RequestBody,
        url: RequestURL,
        headers_item: Headers,
):
    return {
        "body": body_data,
        "query_params": query_params.to_dict(),
        "method": method_data,
        "url": url.path,
        "headers": headers_item.get("server"),
    }
```

类型别名：`Request`、`QueryParams`、`Headers`、`PathParams`、`RequestBody`、`RequestMethod`、`RequestURL`、`FormData`、`RequestFiles`、`RequestIP`、`RequestIdentity`

保留名称：`r`、`req`、`request`、`query_params`、`headers`、`path_params、body`、`method、url`、`ip_addr`、`identity`、`form_data`、`files`

随着蝙蝠侠继续与 Robyn 一起开发他的网络应用程序，他探索了更多功能并使用代码示例实现它们。

## 自定义响应格式和标头

在了解了 Robyn 的动态特性后，Batman 现在想要能够自定义响应格式和标题。Robyn 向他展示了如何使用字典和 Robyn 的 Response 对象来实现这一点。

**使用字典**

蝙蝠侠学会了通过返回字典或使用 Robyn 的 Response 对象来自定义响应格式。他还可以为每个响应设置状态代码和标头。例如，蝙蝠侠使用字典创建了一个响应，如下所示：

::: code-group

```py [untyped]
# GET /hello_world
@app.post("/dictionary")
async def dictionary(request):
    return {
        "status_code": 200,
        "description": "This is a regular response",
        "type": "text",
        "headers": {"Header": "header_value"},
    }
```

```py [typed]
# GET /hello_world
from robyn import Request

@app.post("/dictionary")
async def dictionary(request: Request):
    return {
        "status_code": 200,
        "description": "This is a regular response",
        "type": "text",
        "headers": {"Header": "header_value"},
    }
```

:::

**使用 Response 对象**

为了使用 Response 对象，他写道：

::: code-group

```py [untyped]
# GET /hello_world
from robyn.robyn import Response

@app.get("/response")
async def response(request):
    return Response(status_code=200, headers=Headers({}), description="OK")
```

```py [typed]
# GET /hello_world
from robyn.robyn import Response, Request

@app.get("/response")
async def response(request: Request):
    return Response(status_code=200, headers=Headers({}), description="OK")
```

:::

**返回二进制输出**

然后，蝙蝠侠想要从他的应用程序返回二进制输出。他可以通过将响应类型设置为“二进制”并返回一个字节对象来实现这一点。例如，他写道：

::: code-group

```py [untyped]
# GET /hello_world
@app.get("/binary_output_response_sync")
def binary_output_response_sync(request):
    return Response(
        status_code=200,
        headers={"Content-Type": "application/octet-stream"},
        description="OK",
    )


@app.get("/binary_output_async")
async def binary_output_async(request):
    return b"OK"


@app.get("/binary_output_response_async")
async def binary_output_response_async(request):
    return Response(
        status_code=200,
        headers={"Content-Type": "application/octet-stream"},
        description="OK",
    )
```

```py [typed]
# GET /hello_world
from robyn import Request, Response

@app.get("/binary_output_response_sync")
def binary_output_response_sync(request: Request):
    return Response(
        status_code=200,
        headers={"Content-Type": "application/octet-stream"},
        description="OK",
    )


@app.get("/binary_output_async")
async def binary_output_async(request: Request):
    return b"OK"


@app.get("/binary_output_response_async")
async def binary_output_response_async(request: Request):
    return Response(
        status_code=200,
        headers={"Content-Type": "application/octet-stream"},
        description="OK",
    )
```

:::

## 响应标头

蝙蝠侠是世界上最伟大的侦探，他发现了 Response 对象中的标题字段。他自然想了解更多。Robyn 解释说，他可以使用 headers 字段来设置响应标头。例如，他可以通过以下方式将 `Content-Type` 标头设置为 `application/json`：

**本地响应标头**

或者，通过使用 Response 对象中的 headers 字段：

::: code-group

```py [untyped]
# GET /hello_world
@app.get("/")
def binary_output_response_sync(request):
    return Response(
        status_code=200,
        headers={"Content-Type": "application/octet-stream"},
        description="OK",
    )
```

```py [typed]
# GET /hello_world
from robyn import Request

@app.get("/")
def binary_output_response_sync(request: Request):
    return Response(
        status_code=200,
        headers={"Content-Type": "application/octet-stream"},
        description="OK",
    )
```

:::

**全局响应标头**

或者为每个路由器全局设置标头。

::: code-group

```py [untyped]
# GET /hello_world
app.add_response_header("content-type", "application/json")
```

```py [typed]
# GET /hello_world
app.add_response_header("content-type", "application/json")
```

:::

`add_response_header` 将标头附加到标头列表中，而 `set_response_header` 则替换标头（如果存在）。

::: code-group

```py [untyped]
# GET /hello_world
app.set_response_header("content-type", "application/json")
```

```py [typed]
# GET /hello_world
app.set_response_header("content-type", "application/json")
```

:::

为了防止标题应用到某些端点，您可以使用 `exclude_response_headers_for` 函数。

:::

`add_response_header` 将标头附加到标头列表中，而 `set_response_header` 则替换标头（如果存在）。

::: code-group

```py [untyped]
# GET /hello_world
app.exclude_response_headers_for(["/login", "/signup"])
```

```py [typed]
# GET /hello_world
app.exclude_response_headers_for(["/login", "/signup"])
```

:::

## Cookies

使用 `set_cookies` 函数设置 cookie。

::: code-group

```py [untyped]
# GET /hello_world
@app.get("/")
def binary_output_response_sync(request):
    response = Response(200, {'type': 'int'}, "desc")
    response.set_cookie(key="fakesession", value="fake-cookie-session-value")
    return response
```

```py [typed]
# GET /hello_world
from robyn import Request

@app.get("/")
def binary_output_response_sync(request: Request):
    response = Response(200, {'type': 'int'}, "desc")
    response.set_cookie(key="fakesession", value="fake-cookie-session-value")
    return response
```

:::

## 请求标头

蝙蝠侠现在想知道如何读取请求标头。 Robyn 解释说，他可以使用 `request.headers` 字段来读取请求标头。 例如，他可以通过以下方式读取 `Content-Type` 标头：

**本地请求标头**

或者，通过使用 Request 对象中的 headers 字段：

::: code-group

```py [untyped]
# GET /hello_world
@app.get("/")
def binary_output_response_sync(request):
  headers = request.headers

  print("These are the request headers: ", headers)
  existing_header = headers.get("exisiting_header")
  existing_header = headers.get("exisiting_header", "default_value")
  exisiting_header = headers["exisiting_header"] # This syntax is also valid

  headers.set("modified", "modified_value")
  headers["new_header"] = "new_value" # This syntax is also valid

  print("These are the modified request headers: ", headers)
  
  return ""
```

```py [typed]
# GET /hello_world
from robyn import Request

@app.get("/")
def binary_output_response_sync(request: Request):
  headers = request.headers

  print("These are the request headers: ", headers)
  existing_header = headers.get("exisiting_header")
  existing_header = headers.get("exisiting_header", "default_value")
  exisiting_header = headers["exisiting_header"] # This syntax is also valid

  headers.set("modified", "modified_value")
  headers["new_header"] = "new_value" # This syntax is also valid

  print("These are the modified request headers: ", headers)
  
  return ""
```

:::

或者使用全局请求标头：

::: code-group

```py [untyped]
# GET /hello_world
app.add_request_header("server", "robyn")
```

```py [typed]
# GET /hello_world
app.add_request_header("server", "robyn")
```

:::

`add_request_header` 将标头附加到标头列表中，而 `set_request_header` 则替换标头（如果存在）。

::: code-group

```py [untyped]
# GET /hello_world
app.set_request_header("server", "robyn")
```

```py [typed]
# GET /hello_world
app.set_request_header("server", "robyn")
```

:::

## 状态代码

在了解了回复格式和标题之后，蝙蝠侠学会了为他的回复设置状态代码。

::: code-group

```py [untyped]
# GET /hello_world
from robyn import status_codes

@app.get("/response")
async def response(request):
    return Response(status_code=status_codes.HTTP_200_OK, headers=Headers({}), description="OK")
```

```py [typed]
# GET /hello_world
from robyn import status_codes, Request


@app.get("/response")
async def response(request: Request):
    return Response(status_code=status_codes.HTTP_200_OK, headers=Headers({}), description="OK")
```

:::

## 下一步是什么？

太好了，罗宾，你一直在说的请求对象是什么？蝙蝠侠说。“下一节”，罗宾说。

- [请求对象](./the-request-object.md)

蝙蝠侠也对罗宾的架构很感兴趣。“下一节”，罗宾说。

- [架构](../architecture/index.md)
