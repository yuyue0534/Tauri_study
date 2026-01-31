# 🚀 快速启动指南

## 一、环境要求

- Node.js 20+
- Rust 1.75+
- 系统依赖（见 DEPLOYMENT_GUIDE.md）

## 二、快速安装（3步）

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务
```bash
npm run tauri:dev
```

### 3. 登录系统
- 用户名: `admin`
- 密码: `admin123`

## 三、项目打包

### Windows
```bash
npm run tauri:build
```
输出: `src-tauri/target/release/bundle/msi/*.msi`

### macOS
```bash
npm run tauri:build
```
输出: `src-tauri/target/release/bundle/dmg/*.dmg`

### Linux
```bash
npm run tauri:build
```
输出: `src-tauri/target/release/bundle/deb/*.deb`

## 四、目录说明

- `src/` - React前端代码
- `src-tauri/` - Rust后端代码
- `database/` - 数据库建表SQL
- `docs/` - 文档目录

## 五、常用命令

```bash
# 开发模式
npm run tauri:dev

# 仅启动前端
npm run dev

# 格式化代码
npm run format

# 清理构建
cd src-tauri && cargo clean
```

## 六、问题排查

遇到问题请查看:
1. `DEPLOYMENT_GUIDE.md` - 完整部署指南
2. `00-START_HERE.md` - 项目导航
3. GitHub Issues - 搜索相关问题

---

**提示**: 首次运行会自动创建数据库，请耐心等待。
