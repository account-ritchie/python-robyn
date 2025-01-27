---
title: 直接使用 Rust
lang: zh-CN
---

## 使用 Rust 扩展 Robyn

有时蝙蝠侠可能会执行高计算量任务，或需要大量内存的任务。在这种情况下，他可能想使用 Rust 来实现该任务。Robyn 介绍了一种特殊的方法来实现这一点。你不仅可以使用 Rust 来扩展 Python 代码，还可以在保持代码库热重载特性的同时做到这一点。在许多情况下，它感觉就像一个解释版本。

您需要做的第一件事是创建一个 Rust 文件。我们将其命名为 hello_world.rs。您可以使用 cli 执行此操作：

::: code-group

```py [untyped]
# GET /hello_world
python -m robyn --create-rust-file hello_world
```

```py [typed]
# GET /hello_world
python -m robyn --create-rust-file hello_world
```

:::

然后你就可以打开文件并编写你的 Rust 代码了。例如，让我们编写一个返回字符串的函数。

```rs
// GET /hello_world
// hello_world.rs

// rustimport:pyo3

use pyo3::prelude::*;

#[pyfunction]
fn square(n: i32) -> i32 {
    n * n
    // this is another comment
}
```

使用 cli 创建的每个 Rust 文件在文件顶部都会有一个特殊注释。Robyn 会根据此注释来了解要导入哪些依赖项。在本例中，我们导入的是 pyo3 包。您可以根据需要导入任意数量的包。您还可以从 crates.io 导入 crate。例如，如果您想使用 rusqlite crate，您可以这样做：

```rs
// GET /hello_world
// rustimport:pyo3

//:
//: [dependencies]
//: rusqlite = "0.19.0"

use pyo3::prelude::*;

#[pyfunction]
fn square(n: i32) -> i32 {
    n * n * n
    // this is another comment
}
```

然后您可以在 Python 代码中导入该函数并使用它。

::: code-group

```py [untyped]
# GET /hello_world
from hello_world import square

print(square(5))
```

```py [typed]
# GET /hello_world
from hello_world import square

print(square(5))
```

:::

要运行代码，您需要使用 --compile-rust-path 标志。这将编译 Rust 代码并运行它。您还可以使用 --dev 标志来监视 Rust 代码中的变化并动态重新编译它。

::: code-group

```py [untyped]
# GET /hello_world
python -m robyn --compile-rust-path "." --dev
```

```py [typed]
# GET /hello_world
python -m robyn --compile-rust-path "." --dev
```

:::

Robyn 应用程序的示例，其中包含一个 Rust 文件，使用 rusqlite 包连接到数据库并返回表中的行数：https://github.com/sansyrox/rusty-sql

## 下一步是什么？

蝙蝠侠很好奇想知道他还能对罗宾做什么。

Robyn 告诉他要关注 GraphQl 支持。

- [GraphQl 支持](./graphql-support.md)
