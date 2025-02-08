---
title: 子路由器
lang: zh-CN
---

## 使用子路由器 SubRouter 来组织代码

随着应用程序的发展，蝙蝠侠需要一种更好的方法来组织路线。他决定使用 Robyn 的 SubRouter 功能将相关路线分组在一起。

```py
from robyn import SubRouter

# Create a subrouter for crime-related routes
crime_router = SubRouter(__file__, prefix="/crimes")

@crime_router.get("/list")
def list_crimes():
    return {"crimes": get_all_crimes()}

@crime_router.post("/report")
def report_crime(request):
    crime_data = request.json()
    return {"id": create_crime_report(crime_data)}

# Create a subrouter for suspect-related routes
suspect_router = SubRouter(__file__, prefix="/suspects")

@suspect_router.get("/list")
def list_suspects():
    return {"suspects": get_all_suspects()}

@suspect_router.get("/:id")
def get_suspect(request, path_params):
    suspect_id = path_params.id
    return {"suspect": get_suspect_by_id(suspect_id)}

# Include the subrouters in the main app
app.include_router(crime_router)
app.include_router(suspect_router)
```

子路由器 SubRouters 有助于将相关路由组织在一个通用前缀下，从而使代码更易于维护和理解。在此示例中：

- 所有与犯罪相关的路线都在 `/crimes` 下
- 所有与嫌疑人相关的路线都在 `/suspects` 下

这种组织方式明确了哪些路线处理哪些功能，并将相关代码放在一起。