# 🚀 Tauri 入门指南（新手友好版）

## 1️⃣ Tauri 是什么？

**Tauri** 是一个用于构建 **跨平台桌面应用** 的框架。

一句话理解：

> **用前端技术（HTML / CSS / JS）做界面，用 Rust 做底层，把网页打包成原生桌面应用。**

### 和 Electron 的区别（先有个概念）

| 对比项 | Tauri | Electron |
|------|------|--------|
| 内核 | 系统自带 WebView | 内置 Chromium |
| 体积 | 非常小（几 MB） | 非常大（几十到上百 MB） |
| 性能 | 更省内存 | 占用较高 |
| 安全性 | 权限更细粒度 | 默认权限较大 |
| 底层语言 | Rust | Node.js |

👉 **如果你是新项目 / 对体积和性能敏感 → Tauri 更合适**

---

## 2️⃣ Tauri 能做什么？

你可以用 Tauri 来开发：

- ✅ 桌面工具软件（表单设计器、管理工具、编辑器）
- ✅ 内部办公系统（ERP / CRM / 运维工具）
- ✅ 跨平台应用（Windows / macOS / Linux）
- ✅ 前端 + 本地能力（文件读写、系统调用）

---

## 3️⃣ Tauri 的整体架构（非常重要）

```
┌────────────────────────┐
│        前端界面         │
│  React / Vue / Svelte  │
│  HTML / CSS / JS       │
└─────────▲──────────────┘
          │  JS API 调用
┌─────────┴──────────────┐
│        Tauri Core      │
│   JS ↔ Rust 桥接层     │
└─────────▲──────────────┘
          │
┌─────────┴──────────────┐
│        Rust 后端        │
│ 文件系统 / 系统能力    │
└────────────────────────┘
```

**核心思想：**
- UI：前端负责（你熟悉的技术）
- 能力：Rust 负责（安全 + 高性能）
- 两者通过 Tauri API 通信

---

## 4️⃣ 开发前的环境准备

### ✅ 必须安装的工具

#### ① Node.js（前端用）

- 推荐版本：**LTS**

```bash
node -v
npm -v
```

---

#### ② Rust（Tauri 的核心）

安装 Rust（官方方式）：

```bash
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

验证安装：

```bash
rustc --version
cargo --version
```

---

#### ③ 系统依赖（非常重要）

- **Windows**
  - 安装 Visual Studio Build Tools
  - 勾选「使用 C++ 的桌面开发」

- **macOS**
```bash
xcode-select --install
```

- **Linux（Ubuntu 示例）**
```bash
sudo apt install libwebkit2gtk-4.0-dev build-essential
```

---

## 5️⃣ 创建第一个 Tauri 项目

### 🧩 Step 1：创建前端项目（React + Vite 示例）

```bash
npm create vite@latest tauri-demo -- --template react
cd tauri-demo
npm install
npm run dev
```

---

### 🧩 Step 2：初始化 Tauri

```bash
npm install -D @tauri-apps/cli
npx tauri init
```

初始化完成后目录结构：

```
├─ src/
├─ src-tauri/
│  ├─ src/main.rs
│  ├─ tauri.conf.json
│  └─ Cargo.toml
```

---

## 6️⃣ 运行 Tauri（开发模式）

```bash
npm run tauri dev
```

🎉 启动一个原生桌面窗口，加载你的前端页面。

---

## 7️⃣ 核心文件讲解

### 📁 src-tauri/main.rs

```rust
fn main() {
  tauri::Builder::default()
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
```

---

### 📁 tauri.conf.json

```json
{
  "package": {
    "productName": "My App",
    "version": "0.1.0"
  },
  "tauri": {
    "windows": [
      {
        "title": "Tauri App",
        "width": 800,
        "height": 600
      }
    ]
  }
}
```

---

## 8️⃣ 前端调用 Rust（核心能力）

### Rust 定义命令

```rust
#[tauri::command]
fn greet(name: String) -> String {
  format!("Hello, {}!", name)
}
```

注册：

```rust
taura::Builder::default()
  .invoke_handler(tauri::generate_handler![greet])
```

---

### 前端调用

```ts
import { invoke } from "@tauri-apps/api/tauri";

const msg = await invoke("greet", { name: "Tauri" });
console.log(msg);
```

---

## 9️⃣ 常用 API 能力

### 📂 文件系统

```ts
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
```

### 🪟 窗口管理

```ts
import { appWindow } from "@tauri-apps/api/window";
appWindow.minimize();
```

### 🧠 系统信息

```ts
import { platform } from "@tauri-apps/api/os";
```

---

## 🔐 10️⃣ 安全模型（非常重要）

- 默认禁止文件访问
- 默认禁止系统 API
- 权限需在 `tauri.conf.json` 中显式开启

👉 **安全是 Tauri 的核心优势之一**

---

## 📦 11️⃣ 打包发布

```bash
npm run tauri build
```

生成：
- Windows：`.exe`
- macOS：`.dmg`
- Linux：`.AppImage`

---

## 12️⃣ 新手常见误区

❌ 把 Tauri 当 Electron
❌ 前端和 Rust 混写
❌ 一开始就写复杂 Rust

✅ 正确方式：
- 前端做 UI
- Rust 做能力
- 小步迭代

---

## 13️⃣ 学习路线建议

1. Tauri 基础
2. 前端 ↔ Rust 通信
3. 文件系统
4. 窗口管理
5. 权限配置
6. 打包发布
7. 高级特性

---

## 🎯 总结

> **Tauri = 小体积 + 高安全 + 前端友好 + 原生桌面能力**

