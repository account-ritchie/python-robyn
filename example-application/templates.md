---
title: 模板
lang: zh-CN
---

# 模板

实现后端后，蝙蝠侠决定在他的应用程序中添加前端。他想创建一个简单的网页，以便查看他收集的数据。他还希望能够向数据库添加新数据并编辑现有数据。

这是他接触模板的时候！

模板是 Robyn 框架的一个强大功能，允许您使用 HTML 和 Python 创建动态网页。它们是向您的应用程序添加前端的好方法，无需学习新的语言或框架。

Robyn 默认支持 Jinja2 模板，但也提供了添加其他模板引擎的简单方法。

**创建模板**

要创建模板，您需要在目录中创建一个扩展名为 .html 的文件，通常惯例使用`templates`目录。例如，如果您想创建一个名为 `index.html` 的模板，您可以在`templates`目录中创建一个名为 `index.html` 的文件。

因此文件夹结构如下：

```md
├── app.py
├── templates
│   └── index.html
├── Dockerfile
└── requirements.txt
```

**渲染模板**

创建模板后，您可以使用 `render_template` 函数来渲染它。该函数以模板名称作为其第一个参数，以变量字典作为其第二个参数。

例如，如果您想呈现 `index.html` 模板，您可以使用以下代码：

```py

import os
import pathlib
from robyn.templating import JinjaTemplate


current_file_path = pathlib.Path(__file__).parent.resolve()
jinja_template = JinjaTemplate(os.path.join(current_file_path, "templates"))

@app.get("/frontend")
async def get_frontend(request):
    context = {"framework": "Robyn", "templating_engine": "Jinja2"}
    return jinja_template.render_template("index.html", **context)

app.include_router(frontend)
```

现在蝙蝠侠非常高兴申请已经完成。然而，他对应用程序的现状并不满意。他觉得代码都挤在一个文件中，于是问 Robyn 是否有办法将代码库拆分成其他部分。

这是Robyn向他介绍路由器和视图的概念。