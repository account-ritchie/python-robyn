---
title: 多进程执行
lang: zh-CN
---

# 多进程执行

蝙蝠侠对 Robyn 多处理环境中变量的行为感到疑惑。

Robyn 保证它确实可以支持它们！也就是说，处理程序可以被分派到多个线程。

多处理环境中使用的任何变量都在多个进程之间共享。

在 Robyn 中使用多线程时，默认情况下变量不受多线程访问保护。

如果需要在进程内保护变量，同时从不同的线程访问它，则可以使用 `multiprocessing.Value` 来实现所需的保护。

::: code-group

```py [untyped]
# GET /hello_world
import threading
import time
from multiprocessing import Value

from robyn import Robyn, Request

app = Robyn(__file__)

count = Value("i", 0)

def counter():
    while True:
        count.value += 1
        time.sleep(0.2)
        print(count.value, "added 1")

@app.get("/")
def index(request):
    return f"{count.value}"

threading.Thread(target=counter, daemon=True).start()

app.start()
```

```py [typed]
# GET /hello_world
import threading
import time
from multiprocessing import Value

from robyn import Robyn, Request

app = Robyn(__file__)

count: Value = Value("i", 0)

def counter():
    while True:
        count.value += 1
        time.sleep(0.2)
        print(count.value, "added 1")

@app.get("/")
def index(request: Request):
    return f"{count.value}"

threading.Thread(target=counter, daemon=True).start()

app.start()
```

:::

## 下一步是什么？

蝙蝠侠想知道是否可以直接从 Robyn 的代码库中使用 Rust。

罗宾向他指明了道路。

- [直接使用 Rust](./using-rust-directly.md)