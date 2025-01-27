---
title: WebSockets
lang: zh-CN
---

# WebSockets

为了处理实时通信，蝙蝠侠学习了如何使用 WebSockets。他创建了一个 WebSocket 类并将其包装在他的 Robyn 应用程序中：

::: code-group

```py [untyped]
# GET /hello_world
from robyn import Robyn, jsonify, WebSocket

app = Robyn(__file__)
websocket = WebSocket(app, "/web_socket")

@websocket.on("message")
def connect():
    return "Hello world, from ws"

@websocket.on("close")
def close():
    return "Goodbye world, from ws"

@websocket.on("connect")
def message():
    return "Connected to ws"
```

```py [typed]
# GET /hello_world
from robyn import Robyn, jsonify, WebSocket

app = Robyn(__file__)
websocket = WebSocket(app, "/web_socket")

@websocket.on("message")
def connect():
    return "Hello world, from ws"

@websocket.on("close")
def close():
    return "Goodbye world, from ws"

@websocket.on("connect")
def message():
    return "Connected to ws"
```

:::

为了向客户端发送消息，蝙蝠侠使用了 `sync_send_to` 方法。

::: code-group

```py [untyped]
# GET /hello_world
@websocket.on("message")
  def message(ws, msg, global_dependencies) -> str:
      websocket_id = ws.id
      ws.sync_send_to(websocket_id, "This is a message to self")
      return ""
```

```py [typed]
# GET /hello_world
@websocket.on("message")
  def message(ws: WebSocketConnector, msg: str, global_dependencies) -> str:
      websocket_id = ws.id
      state = websocket_state[websocket_id]
      ws.sync_send_to(websocket_id, "This is a message to self")
      return ""
```

:::

为了以异步方式向客户端发送消息，Batman 使用了 `async_send_to` 方法。

::: code-group

```py [untyped]
# GET /hello_world
@websocket.on("message")
  async def message(ws, msg, global_dependencies) -> str:
      websocket_id = ws.id
      await ws.async_send_to(websocket_id, "This is a message to self")
      return ""
```

```py [typed]
# GET /hello_world
@websocket.on("message")
  async def message(ws: WebSocketConnector, msg: str, global_dependencies) -> str:
      websocket_id = ws.id
      state = websocket_state[websocket_id]
      await ws.async_send_to(websocket_id, "This is a message to self")
      return ""
```

:::

为了发送广播消息，蝙蝠侠使用了 `sync_broadcast` 方法。

::: code-group

```py [untyped]
# GET /hello_world
@websocket.on("message")
  def message(ws, msg, global_dependencies) -> str:
      websocket_id = ws.id
      ws.sync_broadcast("This is a message to self")
      return ""
```

```py [typed]
# GET /hello_world
@websocket.on("message")
  def message(ws: WebSocketConnector, msg: str, global_dependencies) -> str:
      websocket_id = ws.id
      ws.sync_broadcast("This is a message to self")
      return ""
```

:::

为了以异步方式发送广播消息，蝙蝠侠使用了 `async_broadcast` 方法。

::: code-group

```py [untyped]
# GET /hello_world
@websocket.on("message")
  async def message(ws, msg, global_dependencies) -> str:
      websocket_id = ws.id
      await ws.async_broadcast("This is a message to self")
      return ""
```

```py [typed]
# GET /hello_world
@websocket.on("message")
  async def message(ws: WebSocketConnector, msg: str, global_dependencies) -> str:
      websocket_id = ws.id
      await ws.async_broadcast("This is a message to self")
      return ""
```

:::

Robyn 还向蝙蝠侠展示了如何使用查询参数。

::: code-group

```py [untyped]
# GET /hello_world
@websocket.on("message")
  async def message(ws, msg, global_dependencies) -> str:
      websocket_id = ws.id
      if (ws.query_params.get("name") == "gordon" and ws.query_params.get("desg") == "commissioner"):
        ws.sync_broadcast("Gordon authorized to login!")
      return ""
```

```py [typed]
# GET /hello_world
@websocket.on("message")
  async def message(ws: WebSocketConnector, msg: str, global_dependencies) -> str:
      websocket_id = ws.id
      if (ws.query_params.get("name") == "gordon" and ws.query_params.get("desg") == "commissioner"):
        ws.sync_broadcast("Gordon authorized to login!")
      return ""
```

:::

为了以编程方式从服务器端关闭 WebSocket 连接，Batman 学会了使用 `close()` 方法：`close()` 方法执行以下操作：

1. 向客户端发送关闭消息。  
2. 从 WebSocket 注册表中删除客户端。  
3. 关闭 WebSocket 连接。

此方法对于需要根据服务器端的某些条件或事件以编程方式结束 WebSocket 连接的场景很有用。

::: code-group

```py [untyped]
# GET /hello_world
@websocket.on("message")
def message(ws, msg):
    if msg == "disconnect":
        ws.close()
        return "Closing connection"
    return "Message received"
```

```py [typed]
# GET /hello_world
@websocket.on("message")
def message(ws: WebSocketConnector, msg: str) -> str:
    if msg == "disconnect":
        ws.close()
        return "Closing connection"
    return "Message received"
```

:::

## 下一步是什么？

随着代码库的增长，蝙蝠侠希望加入正义联盟来帮助他管理应用程序。

Robyn 向他介绍了扩展应用程序的不同方法，以及如何使用视图和子路由器使代码更具可读性。

- [视图和子路由器](./views-subrouters.md)