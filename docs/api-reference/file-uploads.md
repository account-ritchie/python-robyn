---
title: 文件上传
lang: zh-CN
---

# 文件上传 

蝙蝠侠学会了如何使用 Robyn 处理文件上传。他使用以下代码创建了一个端点来处理文件上传：

## 发送不包含多部分表单数据的文件

蝙蝠侠将他的应用程序扩展到多个核心以获得更好的性能。他使用了以下命令：

::: code-group

```py [untyped]
# GET /hello_world
@app.post("/upload")
async def upload():
  body = request.body
  file = bytearray(body)

  # 写任意文件名
  with open('test.txt', 'wb') as f:
      f.write(body)

  return {'message': 'success'}
```

```py [typed]
# GET /hello_world
@app.post("/upload")
async def upload():
  body = request.body
  file = bytearray(body)

  # 写任意文件名
  with open('test.txt', 'wb') as f:
      f.write(file)

  return {'message': 'success'}
```

:::

## 发送包含多部分表单数据的文件

蝙蝠侠将他的应用程序扩展到多个核心以获得更好的性能。他使用了以下命令：

::: code-group

```py [untyped]
# GET /hello_world
@app.post("/sync/multipart-file")
def sync_multipart_file(request: Request):
    files = request.files
    file_names = files.keys()
    return {"file_names": list(file_names)}
```

```py [typed]
# GET /hello_world
@app.post("/sync/multipart-file")
def sync_multipart_file(request: Request):
    files = request.files
    file_names = files.keys()
    return {"file_names": list(file_names)}
```

:::

## 文件下载

蝙蝠侠现在想允许用户从他的应用程序下载文件。他使用以下代码创建了一个端点来处理文件下载：

**提供简单的 HTML 文件**

蝙蝠侠将他的应用程序扩展到多个核心以获得更好的性能。他使用了以下命令：

::: code-group

```py [untyped]
# GET /hello_world
from robyn import Robyn, serve_html

app = Robyn(__file__)


@app.get("/")
async def h(request):
    return serve_html("./index.html")

app.start(port=8080)
```

```py [typed]
# GET /hello_world
from robyn import Robyn, Request, serve_html

app = Robyn(__file__)


@app.get("/")
async def h(request: Request):
    return serve_html("./index.html")

app.start(port=8080)
```

:::

**提供简单的 HTML 字符串**

说到 HTML 文件，蝙蝠侠想要提供简单的 HTML 字符串。他被建议使用以下代码：

::: code-group

```py [untyped]
# GET /hello_world
from robyn import Robyn, html

app = Robyn(__file__)


@app.get("/")
async def h(request):
    html_string = "<h1>Hello World</h1>"
    return html(html_string)

app.start(port=8080)
```

```py [typed]
# GET /hello_world
from robyn import Robyn, Request, html

app = Robyn(__file__)


@app.get("/")
async def h(request: Request):
    html_string = "<h1>Hello World</h1>"
    return html(html_string)

app.start(port=8080)
```

:::

**提供其他文件**

现在，Batman 已经能够提供 HTML 文件了，他想提供其他文件，如 CSS、JS 和图像。他被建议使用以下代码：

::: code-group

```py [untyped]
# GET /hello_world
from robyn import Robyn, serve_file

app = Robyn(__file__)


@app.get("/")
async def h(request):
    return serve_file("./index.html", file_name="index.html") # file_name is optional

app.start(port=8080)
```

```py [typed]
# GET /hello_world
from robyn import Robyn, serve_file, Request

app = Robyn(__file__)


@app.get("/")
async def h(request: Request):
    return serve_file("./index.html", file_name="index.html") # file_name is optional

app.start(port=8080)
```

:::

**服务目录**

在提供其他文件后，Batman 想要提供目录，例如提供 React 构建目录或只是简单的 HTML/CSS/JS 目录。他被建议使用以下代码：


::: code-group

```py [untyped]
# GET /hello_world
from robyn import Robyn, serve_file

app = Robyn(__file__)


app.serve_directory(
    route="/test_dir",
    directory_path=os.path.join(current_file_path, "build"),
    index_file="index.html",
)

app.start(port=8080)
```

```py [typed]
# GET /hello_world
from robyn import Robyn, serve_file, Request

app = Robyn(__file__)


app.serve_directory(
    route="/test_dir",
    directory_path=os.path.join(current_file_path, "build"),
    index_file="index.html",
)

app.start(port=8080)
```

:::

## 下一步是什么？

现在，蝙蝠侠准备学习 Robyn 的高级功能。他想找到一种方法来处理表单数据

- [表单数据](./form-data.md)