---
title: GraphQl 支持
lang: zh-CN
---

# GraphQL 支持（带有 Strawberry 🍓）

目前还处于早期阶段。当我们拥有稳定的视图和视图控制器 API 时，我们将拥有更加稳定的版本。

## 步骤 1：创建虚拟环境

为了确保存在隔离的依赖关系，我们将使用虚拟环境。

```py
python3 -m venv venv
```

## 步骤 2：激活虚拟环境并安装 Robyn

```py
source venv/bin/activate
```

```py
pip install robyn strawberry-graphql
```

## 步骤 3：编写应用程序代码

```py
from typing import List, Optional
from robyn import Robyn, jsonify
import json

import dataclasses
import strawberry
import strawberry.utils.graphiql


@strawberry.type
class User:
  name: str


@strawberry.type
class Query:
  @strawberry.field
  def user(self) -> Optional[User]:
      return User(name="Hello")


schema = strawberry.Schema(Query)

app = Robyn(__file__)


@app.get("/", const=True)
async def get():
  return strawberry.utils.graphiql.get_graphiql_html()


@app.post("/")
async def post(request):
  body = request.json()
  query = body["query"]
  variables = body.get("variables", None)
  context_value = {"request": request}
  root_value = body.get("root_value", None)
  operation_name = body.get("operation_name", None)

  data = await schema.execute(
      query,
      variables,
      context_value,
      root_value,
      operation_name,
  )

  return jsonify(
      {
          "data": (data.data),
          **({"errors": data.errors} if data.errors else {}),
          **({"extensions": data.extensions} if data.extensions else {}),
      }
  )


if __name__ == "__main__":
  app.start(port=8080, host="0.0.0.0")
```

让我们尝试逐行解读其用法。

这些语句只是导入依赖项。

```py
from typing import List, Optional

from robyn import Robyn, jsonify
import json

import dataclasses
import strawberry
import strawberry.utils.graphiql
```

在这里，我们创建一个具有名称属性的基本用户类型。

然后我们创建一个返回用户的 GraphQl 查询。

```py
@strawberry.type
class User:
    name: str


@strawberry.type
class Query:
    @strawberry.field
    def user(self) -> Optional[User]:
        return User(name="Hello")


schema = strawberry.Schema(Query)
```

现在，我们正在初始化 Robyn 应用程序。对于我们来说，要提供 GraphQl 应用程序，我们需要有一个 get 路由来返回 GraphiQL(ide)，然后有一个 post 路由来处理 GraphQl 请求。

```py
app = Robyn(__file__)
```

我们使用 strawberry 和 GraphiQL IDE 填充 html 页面。我们使用 const=True 来预先计算这个填充。本质上，这使得它非常快，并绕过了这个 get 请求中的执行开销。

```py
@app.get("/", const=True)
async def get():
return strawberry.utils.graphiql.get_graphiql_html()
```

最后，我们从请求对象中获取参数（主体、查询、变量、context_value、root_value、operation_name）。

```py
@app.post("/")
async def post(request):
body = request.json()
query = body["query"]
variables = body.get("variables", None)
context_value = {"request": request}
root_value = body.get("root_value", None)
operation_name = body.get("operation_name", None)

data = await schema.execute(
    query,
    variables,
    context_value,
    root_value,
    operation_name,
)

return jsonify(
    {
        "data": (data.data),
        **({"errors": data.errors} if data.errors else {}),
        **({"extensions": data.extensions} if data.extensions else {}),
    }
)
```

以上只是一条路线的示例。您可以对任意多条路线执行相同操作。:)

## 下一步是什么？

就这些了。:D 请关注此页面上的更多更新。我们将逐步添加更多示例和文档。