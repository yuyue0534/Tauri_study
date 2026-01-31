# 📚 项目文档导航

欢迎使用 **企业级 CRM/ERP 跨平台桌面应用** 项目！

本项目是基于 Tauri v2 + React + Tailwind CSS + SQLite3 构建的生产级企业管理系统。

---

## 🚀 快速开始

如果你是第一次接触本项目，请按以下顺序阅读文档：

### 1️⃣ 项目概览
👉 **[README.md](./README.md)** - 从这里开始！
- 项目简介和核心特点
- 功能特性列表
- 技术栈说明
- 快速启动指南
- 截图预览

### 2️⃣ 环境配置
👉 **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - 环境搭建必读！
- 开发环境准备 (Node.js, Rust, 系统依赖)
- 项目初始化步骤
- 数据库配置说明
- 开发运行教程
- 生产打包指南
- 常见问题排查

### 3️⃣ 架构设计
👉 **[ARCHITECTURE.md](./ARCHITECTURE.md)** - 理解系统设计！
- 技术架构详解
- 数据库表结构设计 (13张表)
- API 接口文档 (30+ 个接口)
- 前后端通信流程
- 核心业务流程说明

### 4️⃣ 项目结构
👉 **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - 了解目录结构！
- 完整的目录树
- 前端 60+ 文件说明
- 后端 40+ 文件说明
- 配置文件说明

### 5️⃣ 代码开发
👉 **[CODE_INDEX.md](./CODE_INDEX.md)** - 开始编码！
- 100+ 源文件清单
- 核心代码示例
- 代码生成脚本
- 开发建议

### 6️⃣ 交付说明
👉 **[DELIVERY_SUMMARY.md](./DELIVERY_SUMMARY.md)** - 项目交付详情！
- 已交付内容清单
- 项目完成度说明
- 后续开发建议
- 学习路径指南

---

## 📂 文件清单

### 📖 文档文件
```
├── README.md                  # 项目总览 ⭐
├── DEPLOYMENT_GUIDE.md        # 部署指南 ⭐
├── ARCHITECTURE.md            # 架构设计 ⭐
├── PROJECT_STRUCTURE.md       # 项目结构
├── CODE_INDEX.md              # 代码索引
├── DELIVERY_SUMMARY.md        # 交付说明
└── 00-START_HERE.md           # 本文件
```

### ⚙️ 配置文件
```
├── package.json               # Node.js 依赖配置
├── vite.config.js            # Vite 构建配置
├── tailwind.config.js        # Tailwind CSS 配置
├── postcss.config.js         # PostCSS 配置
├── .env.example              # 环境变量示例
├── .gitignore                # Git 忽略配置
├── index.html                # HTML 入口
├── src-tauri/
│   ├── Cargo.toml            # Rust 依赖配置
│   ├── tauri.conf.json       # Tauri 应用配置
│   └── build.rs              # Rust 构建脚本
```

### 💾 数据库文件
```
└── database/
    └── schema.sql            # 数据库建表语句 (13张表)
```

---

## 🎯 使用场景指南

### 场景1: 我想快速了解项目
1. 阅读 [README.md](./README.md) - 5分钟快速了解
2. 查看功能特性列表
3. 了解技术栈和架构

### 场景2: 我要搭建开发环境
1. 阅读 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
2. 按步骤安装依赖
3. 运行开发服务
4. 遇到问题查看"常见问题"章节

### 场景3: 我要理解系统设计
1. 阅读 [ARCHITECTURE.md](./ARCHITECTURE.md)
2. 查看数据库表结构
3. 了解 API 接口设计
4. 理解业务流程

### 场景4: 我要开始编写代码
1. 阅读 [CODE_INDEX.md](./CODE_INDEX.md)
2. 查看核心代码示例
3. 参考 [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) 了解目录结构
4. 按推荐的开发顺序实现功能

### 场景5: 我要打包发布应用
1. 确保开发环境已搭建
2. 阅读 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) 的"生产打包"章节
3. 执行打包命令
4. 测试打包产物

---

## 🔧 核心技术栈速查

### 前端技术
- **React 18.3** - UI 框架
- **Tailwind CSS v3** - 样式框架
- **React Router v6** - 路由管理
- **Zustand** - 状态管理
- **Vite 5.x** - 构建工具

### 后端技术
- **Tauri v2** - 桌面框架
- **Rust 1.75+** - 编程语言
- **SQLite3** - 嵌入式数据库
- **rusqlite** - Rust SQLite 库
- **bcrypt** - 密码加密

### 核心命令
```bash
# 安装依赖
npm install

# 开发模式
npm run tauri:dev

# 生产打包
npm run tauri:build
```

---

## 📊 功能模块速览

### 6大核心模块

1. **用户权限管理** 👤
   - 多角色用户体系
   - 细粒度权限控制
   - 密码加密验证

2. **客户关系管理** 📇
   - 客户信息维护
   - 跟进记录管理
   - 自定义标签分类

3. **销售流程管理** 💰
   - 报价单创建
   - 订单全流程跟踪
   - 回款记录管理

4. **产品库存管理** 📦
   - 产品信息管理
   - 出入库记录
   - 库存预警提醒

5. **数据统计分析** 📊
   - 销售趋势图表
   - 客户分布统计
   - 多维度报表

6. **系统配置管理** ⚙️
   - 全局参数设置
   - 主题切换
   - 操作日志查看

---

## 🎓 学习资源

### 官方文档
- [Tauri 官方文档](https://tauri.app/)
- [React 官方文档](https://react.dev/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Rust 程序设计语言](https://rust-lang.tw/book-tw/)
- [SQLite 文档](https://www.sqlite.org/docs.html)

### 推荐教程
- Tauri 快速入门: https://tauri.app/start/
- React Hooks 完全指南: https://react.dev/reference/react
- Tailwind CSS 快速上手: https://tailwindcss.com/docs
- Rust 入门教程: https://doc.rust-lang.org/book/

---

## ❓ 常见问题

### Q1: 项目完成度如何？
**A**: 已完成架构设计、数据库设计、配置文件和核心代码示例。需要继续开发前后端业务代码 (约 100+ 文件)。

### Q2: 开发周期预估多久？
**A**: 预计 6-8 周完成全部功能开发和测试 (按 1 人全职开发计算)。

### Q3: 需要什么技术背景？
**A**: 
- 前端: 熟悉 React Hooks、Tailwind CSS
- 后端: 了解 Rust 基础语法、SQL 数据库操作
- 工具: 熟悉 Git、npm、cargo 基本命令

### Q4: 如何获取技术支持？
**A**: 
1. 查阅项目文档
2. 搜索官方文档和 GitHub Issues
3. 在 Tauri Discord 社区提问
4. 联系项目维护者

### Q5: 可以商用吗？
**A**: 可以。本项目采用 MIT 开源协议，允许商业使用。

---

## 📞 联系方式

- 📧 Email: your-email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-repo/issues)
- 💬 Discord: [加入社区](https://discord.gg/tauri)

---

## ✅ 检查清单

开始开发前，请确认：

- [ ] 已阅读 README.md
- [ ] 已安装 Node.js 20+ 和 Rust 1.75+
- [ ] 已阅读 DEPLOYMENT_GUIDE.md
- [ ] 已了解项目架构 (ARCHITECTURE.md)
- [ ] 已熟悉项目目录结构 (PROJECT_STRUCTURE.md)
- [ ] 已准备好开发工具 (VS Code + 插件)
- [ ] 已创建 Git 仓库并提交初始代码

---

<div align="center">

## 🎉 准备好了吗？让我们开始吧！

**从 [README.md](./README.md) 开始你的旅程 →**

Made with ❤️ by Your Company

</div>
