# 🚀 快速启动指南

## 第一步：安装前置依赖

### 1. 安装 Node.js

访问 https://nodejs.org/ 下载并安装 Node.js 18 或更高版本

验证安装：
```bash
node --version  # 应显示 v18.x.x 或更高
npm --version
```

### 2. 安装 Rust

#### Windows
下载并运行：https://www.rust-lang.org/tools/install

#### macOS 和 Linux
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

验证安装：
```bash
rustc --version
cargo --version
```

### 3. 安装系统依赖

#### Windows
✅ 无需额外依赖

#### macOS
```bash
xcode-select --install
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install libwebkit2gtk-4.0-dev \
  build-essential \
  curl \
  wget \
  libssl-dev \
  libgtk-3-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev
```

#### Linux (Fedora)
```bash
sudo dnf install webkit2gtk4.0-devel \
  openssl-devel \
  curl \
  wget \
  libappindicator-gtk3 \
  librsvg2-devel
```

## 第二步：安装项目依赖

```bash
cd tauri-task-manager
npm install
```

这会安装所有前端依赖。Rust 依赖会在首次运行时自动下载。

## 第三步：运行项目

### 开发模式（推荐）

```bash
npm run tauri dev
```

首次运行会：
1. 下载 Rust 依赖（约 5-10 分钟）
2. 编译 Rust 代码
3. 启动前端开发服务器
4. 打开应用窗口

**注意**: 首次编译时间较长，请耐心等待。后续启动会快很多。

### 生产构建

```bash
npm run tauri build
```

构建产物位于：
- Windows: `src-tauri/target/release/bundle/`
- macOS: `src-tauri/target/release/bundle/`
- Linux: `src-tauri/target/release/bundle/`

## 第四步：开始使用

应用启动后：

1. **创建第一个任务**
   - 点击右上角"新建任务"按钮
   - 输入任务标题
   - 选择优先级
   - 点击"创建"

2. **拖拽任务**
   - 按住任务卡片
   - 拖到其他列（进行中/已完成）

3. **搜索任务**
   - 使用顶部搜索框
   - 输入关键词即可

## 常见问题解决

### 问题 1: `npm install` 失败

**解决方案**:
```bash
# 清理缓存
npm cache clean --force

# 删除 node_modules
rm -rf node_modules

# 重新安装
npm install
```

### 问题 2: Rust 编译失败

**解决方案**:
```bash
# 更新 Rust
rustup update

# 清理构建缓存
cd src-tauri
cargo clean
cd ..

# 重新运行
npm run tauri dev
```

### 问题 3: 端口 1420 被占用

**解决方案**:
1. 关闭占用端口的程序
2. 或修改 `vite.config.js` 中的端口号

### 问题 4: Windows 上缺少 WebView2

**解决方案**:
访问 https://developer.microsoft.com/microsoft-edge/webview2/ 下载并安装

### 问题 5: Linux 上缺少依赖

**错误信息**: `error while loading shared libraries`

**解决方案**:
```bash
# 重新安装所有依赖
sudo apt install libwebkit2gtk-4.0-dev \
  build-essential \
  curl \
  wget \
  libssl-dev \
  libgtk-3-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev
```

## 开发技巧

### 1. 热重载

前端代码修改会自动热重载，无需重启应用。

### 2. Rust 代码修改

修改 Rust 代码后需要重启应用：
1. 关闭应用窗口
2. 终端按 `Ctrl+C` 停止
3. 重新运行 `npm run tauri dev`

### 3. 查看日志

开发模式下，日志会显示在终端。

### 4. 调试工具

- 打开开发者工具: `F12` 或 `Cmd+Option+I` (macOS)
- 查看 React DevTools
- 查看 Network 请求

## 下一步

✅ 项目已成功运行！

现在你可以：
1. 查看 `README.md` 了解详细功能
2. 探索源代码结构
3. 添加自己的功能
4. 构建生产版本

## 需要帮助？

- 查看 `README.md` 中的常见问题
- 查看源代码注释
- 参考 [Tauri 官方文档](https://tauri.app/)
- 参考 [React 官方文档](https://react.dev/)

---

祝你开发愉快！ 🎉
