---
title: 中间件
lang: zh-CN
---

## 身份验证和授权中间件

蝙蝠侠在 Robyn 应用程序中添加了中间件，以验证 JWT 令牌并根据用户的角色限制对某些端点的访问。

```py
from robyn.authentication import AuthenticationHandler, BearerGetter, Identity


class BasicAuthHandler(AuthenticationHandler):
    def authenticate(self, request: Request):
        token = self.token_getter.get_token(request)

        try:
            payload = crud.decode_access_token(token)
            username = payload["sub"]
        except Exception:
            return

        with SessionLocal() as db:
            user = crud.get_user_by_username(db, username=username)

        return Identity(claims={"user": f"{ user }"})


app.configure_authentication(BasicAuthHandler(token_getter=BearerGetter()))


@app.get("/users/me", auth_required=True)
async def get_current_user(request):
    user = request.identity.claims["user"]
    return user
```

有了网络应用程序，哥谭市警察局现在可以有效地管理犯罪数据并实时追踪犯罪活动。蝙蝠侠已成功利用 Robyn 网络框架构建了一个现实世界的应用程序，以帮助打击哥谭市的犯罪。
