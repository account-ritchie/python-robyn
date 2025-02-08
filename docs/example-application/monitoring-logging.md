---
title: 监控和日志记录
lang: zh-CN
---

# 监控和日志记录

为了关注应用程序的性能并解决问题，蝙蝠侠决定实施监控和日志记录。他使用第三方库来集成日志中间件，从而使他能够跟踪请求、错误和性能指标。

```py
from robyn import Logger

logger = Logger(app)

@app.before_request()
async def log_request(request: Request):
    logger.info(f"Received request: %s", request)

@app.after_request()
async def log_response(response: Response):
    logger.info(f"Sending response: %s", response)
```

通过监控和日志记录，蝙蝠侠现在可以轻松检测问题并分析其网络应用程序的性能，确保它始终以最佳状态运行并随时准备协助他打击犯罪。

