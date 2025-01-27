---
title: 实时通知
lang: zh-CN
---

# 实时通知

蝙蝠侠决定使用 WebSockets 为警察提供实时通知。这样警察就可以即时收到犯罪活动的最新消息，并在报告新的犯罪时收到警报。

```py
from robyn import WebSocket

websocket = WebSocket(app, "/notifications")

@websocket.on("connect")
async def notify_connect():
    return "Connected to notifications"

@websocket.on("message")
async def notify_message(message):
    return f"Received: {message}"

@websocket.on("close")
async def notify_close():
    return "Disconnected from notifications"
```

## 高级搜索和过滤

为了让警察更容易地搜索特定的罪行或罪犯，蝙蝠侠在应用程序中添加了高级搜索和过滤选项。他实现了一个新的端点，允许用户根据犯罪类型、日期、地点和状态等各种标准进行搜索。

```py
@app.get("/crimes/search")
async def search_crimes(request):
    crime_type = request.query_params.get("crime_type")
    date = request.query_params.get("date")
    location = request.query_params.get("location")
    status = request.query_params.get("status")

    crimes = crud.search_crimes(db, crime_type=crime_type, date=date, location=location, status=status)
    return crimes
```

有了新的功能，哥谭市警察局能够更有效地利用网络应用程序来追踪犯罪活动并有效部署资源。蝙蝠侠在 Robyn 网络框架方面的工作对哥谭市的打击犯罪工作产生了重大影响，使其成为公民更安全的地方。

尽管蝙蝠侠在当前的实施中取得了巨大的成功，但他知道总会有改进的空间和可以添加的新功能。但现在，他可以花点时间欣赏自己的工作并专注于他的首要职责——作为黑暗骑士保护哥谭市。
