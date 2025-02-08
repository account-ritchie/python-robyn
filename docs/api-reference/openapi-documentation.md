---
title: OpenAPI 文档
lang: zh-CN
---

## OpenAPI Docs，又名 Swagger

部署应用程序后，蝙蝠侠收到了来自用户的多个关于如何使用端点的询问。Robyn 向他展示了如何为他的应用程序生成 OpenAPI 规范。

开箱即用，已为您设置了以下端点：

- `/docs Swagger` 用户界面
- `/openapi.json` JSON 规范

要使用自定义 openapi 配置，您可以：

- 将 `openapi.json` 配置文件放在根目录中。
- 或者，将文件路径传递给 `Robyn()` 构造函数中的 `openapi_file_path` 参数。（该参数的优先级高于文件）。

但是，如果您不想生成 OpenAPI 文档，您可以在启动应用程序时通过传递 `--disable-openapi` 标志来禁用它。

```py
python app.py --disable-openapi
```

## 如何使用？

- 查询参数：查询参数的类型可以添加为 `def get(r: Request, query_params: GetRequestParams)`，其中 `GetRequestParams` 是 `QueryParams` 的子类
- 路径参数默认为字符串类型（参考：https://en.wikipedia.org/wiki/Query_string）

::: code-group

```py [untyped]
from robyn import Robyn
from robyn.robyn import QueryParams

app = Robyn(
    file_object=__file__,
    openapi=OpenAPI(
        info=OpenAPIInfo(
            title="Sample App",
            description="This is a sample server application.",
            termsOfService="https://example.com/terms/",
            version="1.0.0",
            contact=Contact(
                name="API Support",
                url="https://www.example.com/support",
                email="support@example.com",
            ),
            license=License(
                name="BSD2.0",
                url="https://opensource.org/license/bsd-2-clause",
            ),
            externalDocs=ExternalDocumentation(description="Find more info here", url="https://example.com/"),
            components=Components(),
        ),
    ),
)


@app.get("/")
async def welcome():
    """welcome endpoint"""
    return "hi"


class GetRequestParams(QueryParams):
    appointment_id: str
    year: int


@app.get("/api/v1/name", openapi_name="Name Route", openapi_tags=["Name"])
async def get(r, query_params: GetRequestParams):
    """Get Name by ID"""
    return r.query_params


@app.delete("/users/:name", openapi_tags=["Name"])
async def delete(r):
    """Delete Name by ID"""
    return r.path_params


if __name__ == "__main__":
    app.start()
```

```py [typed]
from robyn.robyn import QueryParams

from robyn import Robyn, Request

app = Robyn(
    file_object=__file__,
    openapi=OpenAPI(
        info=OpenAPIInfo(
            title="Sample App",
            description="This is a sample server application.",
            termsOfService="https://example.com/terms/",
            version="1.0.0",
            contact=Contact(
                name="API Support",
                url="https://www.example.com/support",
                email="support@example.com",
            ),
            license=License(
                name="BSD2.0",
                url="https://opensource.org/license/bsd-2-clause",
            ),
            externalDocs=ExternalDocumentation(description="Find more info here", url="https://example.com/"),
            components=Components(),
        ),
    ),
)


@app.get("/")
async def welcome():
    """welcome endpoint"""
    return "hi"


class GetRequestParams(QueryParams):
    appointment_id: str
    year: int


@app.get("/api/v1/name", openapi_name="Name Route", openapi_tags=["Name"])
async def get(r: Request, query_params: GetRequestParams):
    """Get Name by ID"""
    return r.query_params


@app.delete("/users/:name", openapi_tags=["Name"])
async def delete(r: Request):
    """Delete Name by ID"""
    return r.path_params


if __name__ == "__main__":
    app.start()
```

:::

## 它如何与子路由器协同工作？

::: code-group

```py [untyped]
from robyn import SubRouter
from robyn.robyn import QueryParams

subrouter = SubRouter(__name__, prefix="/sub")


@subrouter.get("/")
async def subrouter_welcome():
    """welcome subrouter"""
    return "hiiiiii subrouter"


class SubRouterGetRequestParams(QueryParams):
    _id: int
    value: str


@subrouter.get("/name")
async def subrouter_get(r, query_params: SubRouterGetRequestParams):
    """Get Name by ID"""
    return r.query_params


@subrouter.delete("/:name")
async def subrouter_delete(r):
    """Delete Name by ID"""
    return r.path_params


app.include_router(subrouter)
```

```py [typed]
from robyn.robyn import QueryParams

from robyn import Request, SubRouter

subrouter: SubRouter = SubRouter(__name__, prefix="/sub")


@subrouter.get("/")
async def subrouter_welcome():
    """welcome subrouter"""
    return "hiiiiii subrouter"


class SubRouterGetRequestParams(QueryParams):
    _id: int
    value: str


@subrouter.get("/name")
async def subrouter_get(r: Request, query_params: SubRouterGetRequestParams):
    """Get Name by ID"""
    return r.query_params


@subrouter.delete("/:name")
async def subrouter_delete(r: Request):
    """Delete Name by ID"""
    return r.path_params


app.include_router(subrouter)
```

:::

## 其他规格参数

我们支持最新 OpenAPI 规范 (https://swagger.io/specification/) 中提到的所有参数。请参阅以下使用请求和响应主体的示例：

::: code-group

```py [untyped]
from robyn.types import JSONResponse, Body

class Initial(Body):
    is_present: bool
    letter: Optional[str]


class FullName(Body):
    first: str
    second: str
    initial: Initial


class CreateItemBody(Body):
    name: FullName
    description: str
    price: float
    tax: float


class CreateResponse(JSONResponse):
    success: bool
    items_changed: int


@app.post("/")
def create_item(request: Request, body: CreateItemBody) -> CreateResponse:
    return CreateResponse(success=True, items_changed=2)
```

```py [typed]
from robyn.types import JSONResponse, Body

class Initial(Body):
    is_present: bool
    letter: Optional[str]


class FullName(Body):
    first: str
    second: str
    initial: Initial


class CreateItemBody(Body):
    name: FullName
    description: str
    price: float
    tax: float


class CreateResponse(JSONResponse):
    success: bool
    items_changed: int


@app.post("/")
def create_item(request: Request, body: CreateItemBody) -> CreateResponse:
    return CreateResponse(success=True, items_changed=2)
```

:::

随着参考文档的部署和顺利运行，蝙蝠侠拥有了一个强大的新工具。Robyn 框架为他提供了创建有效的打击犯罪应用程序所需的灵活性、可扩展性和性能，使他在保护哥谭市的持续战斗中获得了技术优势。

## 下一步是什么？

蝙蝠侠想知道 Robyn 处理程序是否可以被分派到多个进程。

罗宾给他指明了方向！

- [多进程执行](./multiprocess-execution.md)