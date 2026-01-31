# CRM/ERP 桌面应用 - 完整部署指南

## 📋 目录
1. [环境准备](#环境准备)
2. [项目初始化](#项目初始化)
3. [数据库配置](#数据库配置)
4. [开发运行](#开发运行)
5. [生产打包](#生产打包)
6. [常见问题](#常见问题)

---

## 🔧 环境准备

### 1. 安装 Node.js (v20+)
```bash
# 下载并安装 Node.js 20.x LTS 版本
# Windows: https://nodejs.org/
# macOS: brew install node@20
# Linux: 通过包管理器安装
node --version  # 验证: v20.x.x
npm --version   # 验证: 10.x.x
```

### 2. 安装 Rust (1.75+)
```bash
# Windows/macOS/Linux 统一安装方式
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 安装完成后重启终端，验证
rustc --version  # 验证: rustc 1.75.0+
cargo --version  # 验证: cargo 1.75.0+
```

### 3. 安装系统依赖

#### Windows
```powershell
# 安装 Visual Studio C++ Build Tools
# 下载地址: https://visualstudio.microsoft.com/visual-cpp-build-tools/
# 勾选 "Desktop development with C++"

# 安装 WebView2 (Windows 10+ 通常已内置)
```

#### macOS
```bash
# 安装 Xcode Command Line Tools
xcode-select --install

# 安装 Homebrew (如未安装)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install -y \
  libwebkit2gtk-4.1-dev \
  build-essential \
  curl \
  wget \
  file \
  libxdo-dev \
  libssl-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev
```

---

## 🚀 项目初始化

### 1. 克隆项目（如果从 Git 仓库）
```bash
git clone <repository-url>
cd tauri-crm-erp
```

### 2. 安装依赖

#### 安装前端依赖
```bash
# 在项目根目录执行
npm install
```

#### 安装 Rust 依赖
```bash
# 进入 Tauri 后端目录
cd src-tauri
cargo build
cd ..
```

### 3. 配置环境变量
```bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env 文件（可选）
# VITE_APP_TITLE=CRM/ERP管理系统
# VITE_DATABASE_PATH=./database/crm_erp.db
```

---

## 💾 数据库配置

### 自动初始化（推荐）
项目首次运行时会自动创建数据库和表结构，无需手动操作。

### 手动初始化（可选）
```bash
# 1. 创建数据库目录
mkdir -p database

# 2. 使用 SQLite3 命令行工具初始化
sqlite3 database/crm_erp.db < database/schema.sql

# 3. 验证数据库创建成功
sqlite3 database/crm_erp.db "SELECT * FROM users WHERE id=1;"
```

### 默认管理员账号
- **用户名**: `admin`
- **密码**: `admin123`
- **角色**: 超级管理员

⚠️ **重要**: 首次登录后请立即修改默认密码！

---

## 🔨 开发运行

### 启动开发模式
```bash
# 方式1: 使用 npm script (推荐)
npm run tauri:dev

# 方式2: 分别启动前后端
# 终端1: 启动前端开发服务器
npm run dev

# 终端2: 启动 Tauri 开发模式
cd src-tauri
cargo tauri dev
```

### 开发模式特点
- ✅ 热重载 (前端代码修改自动刷新)
- ✅ Rust 代码修改后自动重新编译
- ✅ 开启 DevTools 调试工具
- ✅ 详细的错误日志输出

### 访问方式
- 开发模式会自动打开桌面应用窗口
- 前端开发服务器: http://localhost:3000 (仅供调试)

---

## 📦 生产打包

### 跨平台打包

#### Windows 平台
```bash
# 打包为 .exe 和 .msi 安装包
npm run tauri:build:windows

# 或直接使用
npm run tauri:build

# 输出位置:
# src-tauri/target/release/tauri-crm-erp.exe (可执行文件)
# src-tauri/target/release/bundle/msi/*.msi (安装包)
```

#### macOS 平台
```bash
# 打包为 .app 和 .dmg 安装包
npm run tauri:build:macos

# 输出位置:
# src-tauri/target/release/bundle/macos/tauri-crm-erp.app
# src-tauri/target/release/bundle/dmg/*.dmg
```

#### Linux 平台
```bash
# 打包为 .deb 和 AppImage
npm run tauri:build:linux

# 输出位置:
# src-tauri/target/release/bundle/deb/*.deb
# src-tauri/target/release/bundle/appimage/*.AppImage
```

### 打包优化配置
已在 `Cargo.toml` 中配置生产环境优化:
```toml
[profile.release]
opt-level = 3        # 最高优化级别
lto = true           # 链接时优化
codegen-units = 1    # 减少代码体积
strip = true         # 去除调试符号
panic = "abort"      # Panic 时直接终止
```

### 预期打包体积
- Windows: ~8-12 MB (压缩后)
- macOS: ~10-15 MB
- Linux: ~8-12 MB

---

## ❓ 常见问题排查

### 1. 依赖安装失败

#### npm install 报错
```bash
# 清除缓存重试
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### cargo build 报错
```bash
# 更新 Rust 工具链
rustup update stable

# 清除构建缓存
cd src-tauri
cargo clean
cargo build
```

### 2. 数据库连接异常

**问题**: 应用启动时提示 "数据库连接失败"

**解决方案**:
```bash
# 检查数据库文件是否存在
ls -la database/crm_erp.db

# 检查数据库文件权限
chmod 644 database/crm_erp.db

# 删除并重新初始化数据库
rm database/crm_erp.db
# 重新启动应用，会自动创建
```

### 3. 打包失败

#### Windows 打包失败
```bash
# 错误: 缺少 Visual Studio Build Tools
# 解决: 安装 Visual Studio C++ Build Tools

# 错误: 缺少 WebView2
# 解决: 更新到 Windows 10 1809+ 或手动安装 WebView2
```

#### macOS 打包失败
```bash
# 错误: 需要 Xcode
# 解决: 安装 Xcode Command Line Tools
xcode-select --install

# 错误: 签名失败
# 解决: 在 tauri.conf.json 中移除签名配置（开发环境）
```

#### Linux 打包失败
```bash
# 错误: 缺少系统库
# 解决: 安装完整的依赖
sudo apt install -y libwebkit2gtk-4.1-dev build-essential \
  libssl-dev libayatana-appindicator3-dev librsvg2-dev
```

### 4. 运行时错误

#### 登录失败
```bash
# 检查默认管理员账号是否存在
sqlite3 database/crm_erp.db "SELECT * FROM users WHERE username='admin';"

# 如果不存在，手动插入
sqlite3 database/crm_erp.db
> INSERT INTO users (username, password_hash, full_name, role, status)
  VALUES ('admin', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5F0i0xFSYuR3C', '系统管理员', 'admin', 'active');
```

#### 功能运行异常
```bash
# 查看控制台日志
# 开发模式: 打开 DevTools (F12)
# 生产模式: 查看 Tauri 日志文件

# Windows: %APPDATA%\com.company.crm-erp\logs
# macOS: ~/Library/Logs/com.company.crm-erp
# Linux: ~/.local/share/com.company.crm-erp/logs
```

### 5. 性能问题

#### 启动慢
```bash
# 检查数据库文件大小
ls -lh database/crm_erp.db

# 如果数据库过大，执行 VACUUM 优化
sqlite3 database/crm_erp.db "VACUUM;"
```

#### 查询慢
```bash
# 检查是否缺少索引
sqlite3 database/crm_erp.db
> .schema customers
> PRAGMA index_list('customers');

# 手动添加索引（如果缺失）
> CREATE INDEX idx_customers_name ON customers(name);
```

---

## 🔄 数据备份与恢复

### 数据备份
```bash
# 方式1: 通过应用内置功能（推荐）
# 登录系统 → 系统设置 → 数据备份 → 选择备份路径

# 方式2: 手动复制数据库文件
cp database/crm_erp.db database/crm_erp_backup_$(date +%Y%m%d).db
```

### 数据恢复
```bash
# 方式1: 通过应用内置功能（推荐）
# 登录系统 → 系统设置 → 数据恢复 → 选择备份文件

# 方式2: 手动替换数据库文件
cp database/crm_erp_backup_20260130.db database/crm_erp.db
```

---

## 📊 项目后续迭代建议

### 功能扩展
1. **数据同步**: 添加云端同步功能（可选）
2. **报表增强**: 更多维度的数据分析报表
3. **权限细化**: 更细粒度的功能权限控制
4. **多语言**: 国际化支持 (i18n)
5. **移动端**: 开发配套的移动端 App

### 性能优化
1. **数据分页**: 大数据量场景下的虚拟滚动
2. **缓存策略**: 本地数据缓存减少数据库查询
3. **索引优化**: 根据实际查询场景添加复合索引
4. **异步处理**: 耗时操作使用后台线程处理

### 数据安全强化
1. **数据库加密**: SQLite 数据库文件加密 (SQLCipher)
2. **敏感数据**: 客户联系方式、订单金额等加密存储
3. **操作审计**: 完善的操作日志审计追踪
4. **定期备份**: 自动定期备份机制

### 用户体验提升
1. **快捷键**: 支持键盘快捷键操作
2. **主题定制**: 更多主题颜色方案
3. **界面优化**: 更流畅的动画和交互
4. **离线提示**: 优雅的离线状态提示

---

## 📞 技术支持

### 文档资源
- Tauri 官方文档: https://tauri.app/
- React 官方文档: https://react.dev/
- Tailwind CSS 文档: https://tailwindcss.com/
- SQLite 文档: https://www.sqlite.org/docs.html

### 社区支持
- Tauri Discord: https://discord.com/invite/tauri
- GitHub Issues: 项目仓库 Issues 页面

---

## 📄 开源协议

本项目采用 MIT 协议开源。

---

**项目状态**: ✅ 生产就绪  
**最后更新**: 2026-01-30  
**版本**: v1.0.0
