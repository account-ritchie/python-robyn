---
title: 模板
lang: zh-CN
---

# 模板

蝙蝠侠想要快速地在网站上呈现 html 页面。他想使用模板引擎来呈现 html 页面。Robyn 告诉他，他可以使用 Jinja2 模板引擎来呈现 html 页面。他可以使用 JinjaTemplate 类来呈现 html 页面。

蝙蝠侠很高兴地得知他可以将事件添加为函数以及装饰器。

::: code-group

```py [untyped]
# GET /hello_world
from robyn.templating import JinjaTemplate

current_file_path = pathlib.Path(__file__).parent.resolve()
JINJA_TEMPLATE = JinjaTemplate(os.path.join(current_file_path, "templates"))

@app.get("/template_render")
def template_render():
    context = {"framework": "Robyn", "templating_engine": "Jinja2"}

    template = JINJA_TEMPLATE.render_template(template_name="test.html", **context)
    return template
```

```py [typed]
# GET /hello_world
from robyn.templating import JinjaTemplate

current_file_path = pathlib.Path(__file__).parent.resolve()
JINJA_TEMPLATE = JinjaTemplate(os.path.join(current_file_path, "templates"))

@app.get("/template_render")
def template_render():
    context = {"framework": "Robyn", "templating_engine": "Jinja2"}

    template = JINJA_TEMPLATE.render_template(template_name="test.html", **context)
    return template
```

:::

test.html 文件

```html
<!-- GET /hello_world -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Results</title>
  </head>

  <body>
    Hello {{ framework }}! You're using {{ templating_engine }}.
  </body>
</html>
```

## 支持自定义模板引擎

当蝙蝠侠得知 Robyn 允许支持自定义模板引擎时，他也非常兴奋。

为此，您需要从 `robyn.templating` 导入 `TemplateInterface`

::: code-group

```py [untyped]
# GET /hello_world
from robyn.templating import TemplateInterface
```

```py [typed]
# GET /hello_world
from robyn.templating import TemplateInterface
```

:::

然后你需要在实现中有一个 render_template 方法。因此，示例如下所示：

::: code-group

```py [untyped]
# GET /hello_world
class JinjaTemplate(TemplateInterface):
  def __init__(self, directory, encoding="utf-8", followlinks=False):
      self.env = Environment(
          loader=FileSystemLoader(
              searchpath=directory, encoding=encoding, followlinks=followlinks
          )
      )

  def render_template(self, template_name, **kwargs):
      return self.env.get_template(template_name).render(**kwargs)
```

```py [typed]
# GET /hello_world
class JinjaTemplate(TemplateInterface):
  def __init__(self, directory, encoding="utf-8", followlinks=False):
      self.env = Environment(
          loader=FileSystemLoader(
              searchpath=directory, encoding=encoding, followlinks=followlinks
          )
      )

  def render_template(self, template_name: str, **kwargs):
      return self.env.get_template(template_name).render(**kwargs)
```

:::

## 下一步是什么？

现在，蝙蝠侠想要拥有重定向端点的能力。

- [重定向](./redirection.md)