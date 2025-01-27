---
title: 快速开始
lang: zh-CN
features:
  - icon:
      src: images/logo.png
---

**Robyn 的真实 Web 应用程序**

蝙蝠侠的任务是构建一个网络应用程序来管理哥谭市的犯罪数据。该应用程序将允许哥谭警察局存储和检索有关犯罪活动、嫌疑人及其位置的数据。他决定使用 Robyn Web 框架来高效快速地构建此应用程序。

您可以在[此处](https://github.com/sparckles/example_robyn_app)找到此应用程序的源代码。

## 安装 Robyn

第一步是安装 Robyn。蝙蝠侠创建了一个虚拟环境并使用 pip 安装了 Robyn。

```sh
$ python3 -m venv venv
$ source venv/bin/activate
$ pip install robyn
```

## 创建 Robyn 应用程序

蝙蝠侠想要创建一个 Robyn 应用程序，正要创建一个 src/app.py 时，他被告知 Robyn 附带了一个 CLI 工具来创建新应用程序。他运行以下命令来创建一个新的 Robyn 应用程序。

```sh
$ python -m robyn --create
```

这将导致以下输出。

```sh
$ python3 -m robyn --create
? Directory Path: .
? Need Docker? (Y/N) Y
? Please select project type (Mongo/Postgres/Sqlalchemy/Prisma):
❯ No DB
  Sqlite
  Postgres
  MongoDB
  SqlAlchemy
  Prisma
```

以及以下目录结构。

蝙蝠侠被问了一组问题来配置应用程序。他选择对大多数问题使用默认值。

他完成了！ Robyn CLI 创建了一个具有以下结构的新应用程序。

```md
├── src
│   ├── app.py
├── Dockerfile
```