---
title: Robyn 环境文件
lang: zh-CN
---

## 通过环境文件配置服务器

蝙蝠侠希望通过环境文件来配置服务器。不断更改代码会带来出错的风险。

## 环境变量

- `ROBYN_PORT`：指定 Robyn 服务器将监听的端口。
  - 默认值： `8080`
  - 例如：`ROBYN_PORT=3000`
- `ROBYN_HOST`：指定 Robyn 服务器的主机地址。
  - 默认值：`127.0.0.1`
  - 例如：`ROBYN_HOST=0.0.0.0`
- `ROBYN_BROWSER_OPEN`：成功启动后打开浏览器
  - 默认值：`False`
  - 例如：`ROBYN_BROWSER_OPEN=True`
- `ROBYN_DEV_MODE`：配置开发模式
  - 默认值：False
  - 例如：ROBYN_DEV_MODE=True
- `ROBYN_MAX_PAYLOAD_SIZE`：设置请求的最大有效负载大小（以字节为单位）
  - 默认值：`1000000` 字节
  - `ROBYN_MAX_PAYLOAD_SIZE=1000000`

您可以使用 `robyn.env` 文件在您的环境中自动加载它们。

这些环境变量通常在位于项目根目录的 `robyn.env` 文件中设置。服务器在启动时解析此文件以进行相应的配置。

有关 `robyn.env` 文件的结构和用法的更多详细信息，请参阅文档片段：

```md
--project/
  --robyn.env
  --index.py
  ...
```

示例 robyn.env 文件：
```
ROBYN_PORT=8080
ROBYN_HOST=127.0.0.1
RANDOM_ENV=123
ROBYN_BROWSER_OPEN=True
ROBYN_DEV_MODE=True
ROBYN_MAX_PAYLOAD_SIZE=1000000
```

随着网络应用程序的部署和顺利运行，蝙蝠侠拥有了一个强大的新工具。Robyn 框架为他提供了创建有效的打击犯罪应用程序所需的灵活性、可扩展性和性能，使他在保护哥谭市的持续战斗中获得了技术优势。

## 下一步是什么？

蝙蝠侠 - 谢谢，罗宾。现在告诉我更多。罗宾 - 现在让我们了解中间件和事件！

- [中间件](./middlewares.md)