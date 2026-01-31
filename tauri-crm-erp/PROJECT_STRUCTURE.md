# 项目完整目录结构

```
tauri-crm-erp/
├── src/                                    # 前端 React 源码目录
│   ├── assets/                            # 静态资源
│   │   ├── icons/                         # 图标文件
│   │   │   ├── logo.svg                  # 系统 Logo
│   │   │   └── default-avatar.png        # 默认头像
│   │   └── images/                        # 图片资源
│   │       └── login-bg.jpg              # 登录页背景
│   │
│   ├── components/                        # React 组件
│   │   ├── common/                        # 公共组件
│   │   │   ├── Button/                   # 按钮组件
│   │   │   │   ├── index.jsx
│   │   │   │   └── Button.module.css
│   │   │   ├── Input/                    # 输入框组件
│   │   │   │   ├── index.jsx
│   │   │   │   └── Input.module.css
│   │   │   ├── Select/                   # 下拉选择组件
│   │   │   │   └── index.jsx
│   │   │   ├── Modal/                    # 弹窗组件
│   │   │   │   └── index.jsx
│   │   │   ├── Table/                    # 数据表格组件
│   │   │   │   └── index.jsx
│   │   │   ├── Pagination/               # 分页组件
│   │   │   │   └── index.jsx
│   │   │   ├── DatePicker/               # 日期选择器
│   │   │   │   └── index.jsx
│   │   │   ├── Loading/                  # 加载组件
│   │   │   │   └── index.jsx
│   │   │   └── Toast/                    # 消息提示组件
│   │   │       └── index.jsx
│   │   │
│   │   ├── layout/                        # 布局组件
│   │   │   ├── AuthLayout/               # 认证布局 (登录页)
│   │   │   │   └── index.jsx
│   │   │   ├── MainLayout/               # 主布局
│   │   │   │   ├── index.jsx
│   │   │   │   ├── Sidebar.jsx          # 侧边栏
│   │   │   │   ├── Header.jsx           # 顶部栏
│   │   │   │   └── Breadcrumb.jsx       # 面包屑导航
│   │   │   └── ProtectedRoute/           # 权限路由守卫
│   │   │       └── index.jsx
│   │   │
│   │   ├── customer/                      # 客户管理组件
│   │   │   ├── CustomerList/             # 客户列表
│   │   │   │   └── index.jsx
│   │   │   ├── CustomerForm/             # 客户表单
│   │   │   │   └── index.jsx
│   │   │   ├── CustomerDetail/           # 客户详情
│   │   │   │   └── index.jsx
│   │   │   ├── FollowUpList/             # 跟进记录列表
│   │   │   │   └── index.jsx
│   │   │   └── FollowUpForm/             # 跟进表单
│   │   │       └── index.jsx
│   │   │
│   │   ├── sales/                         # 销售管理组件
│   │   │   ├── QuoteList/                # 报价单列表
│   │   │   │   └── index.jsx
│   │   │   ├── QuoteForm/                # 报价单表单
│   │   │   │   └── index.jsx
│   │   │   ├── OrderList/                # 订单列表
│   │   │   │   └── index.jsx
│   │   │   ├── OrderForm/                # 订单表单
│   │   │   │   └── index.jsx
│   │   │   ├── OrderDetail/              # 订单详情
│   │   │   │   └── index.jsx
│   │   │   └── PaymentForm/              # 回款表单
│   │   │       └── index.jsx
│   │   │
│   │   ├── inventory/                     # 库存管理组件
│   │   │   ├── ProductList/              # 产品列表
│   │   │   │   └── index.jsx
│   │   │   ├── ProductForm/              # 产品表单
│   │   │   │   └── index.jsx
│   │   │   ├── StockMovementList/        # 出入库记录
│   │   │   │   └── index.jsx
│   │   │   ├── StockWarning/             # 库存预警
│   │   │   │   └── index.jsx
│   │   │   └── StockAdjustForm/          # 库存调整表单
│   │   │       └── index.jsx
│   │   │
│   │   ├── analytics/                     # 数据统计组件
│   │   │   ├── Dashboard/                # 仪表盘
│   │   │   │   └── index.jsx
│   │   │   ├── SalesChart/               # 销售图表
│   │   │   │   └── index.jsx
│   │   │   ├── CustomerChart/            # 客户分布图
│   │   │   │   └── index.jsx
│   │   │   ├── InventoryChart/           # 库存周转图
│   │   │   │   └── index.jsx
│   │   │   └── ReportExport/             # 报表导出
│   │   │       └── index.jsx
│   │   │
│   │   └── settings/                      # 系统设置组件
│   │       ├── UserManagement/           # 用户管理
│   │       │   └── index.jsx
│   │       ├── SystemConfig/             # 系统配置
│   │       │   └── index.jsx
│   │       ├── ThemeSwitcher/            # 主题切换
│   │       │   └── index.jsx
│   │       ├── SystemLogs/               # 系统日志
│   │       │   └── index.jsx
│   │       └── ProfileSettings/          # 个人设置
│   │           └── index.jsx
│   │
│   ├── pages/                             # 页面组件
│   │   ├── Login/                        # 登录页
│   │   │   └── index.jsx
│   │   ├── Dashboard/                    # 仪表盘页
│   │   │   └── index.jsx
│   │   ├── Customers/                    # 客户管理页
│   │   │   └── index.jsx
│   │   ├── Sales/                        # 销售管理页
│   │   │   └── index.jsx
│   │   ├── Inventory/                    # 库存管理页
│   │   │   └── index.jsx
│   │   ├── Analytics/                    # 数据统计页
│   │   │   └── index.jsx
│   │   ├── Settings/                     # 系统设置页
│   │   │   └── index.jsx
│   │   └── NotFound/                     # 404 页面
│   │       └── index.jsx
│   │
│   ├── store/                             # Zustand 状态管理
│   │   ├── authStore.js                  # 认证状态
│   │   ├── customerStore.js              # 客户数据状态
│   │   ├── salesStore.js                 # 销售数据状态
│   │   ├── inventoryStore.js             # 库存数据状态
│   │   ├── settingsStore.js              # 系统设置状态
│   │   └── index.js                      # Store 导出
│   │
│   ├── services/                          # API 服务层
│   │   ├── api.js                        # Tauri Invoke 封装
│   │   ├── authService.js                # 认证 API
│   │   ├── customerService.js            # 客户 API
│   │   ├── salesService.js               # 销售 API
│   │   ├── inventoryService.js           # 库存 API
│   │   ├── analyticsService.js           # 统计 API
│   │   └── systemService.js              # 系统 API
│   │
│   ├── utils/                             # 工具函数
│   │   ├── constants.js                  # 常量定义
│   │   ├── format.js                     # 格式化工具
│   │   ├── validation.js                 # 表单验证
│   │   ├── storage.js                    # 本地存储
│   │   └── permission.js                 # 权限判断
│   │
│   ├── hooks/                             # 自定义 Hooks
│   │   ├── useAuth.js                    # 认证 Hook
│   │   ├── usePermission.js              # 权限 Hook
│   │   ├── useTable.js                   # 表格 Hook
│   │   └── useForm.js                    # 表单 Hook
│   │
│   ├── routes/                            # 路由配置
│   │   ├── index.jsx                     # 路由主文件
│   │   └── routeConfig.js                # 路由配置
│   │
│   ├── styles/                            # 样式文件
│   │   ├── index.css                     # 全局样式
│   │   ├── tailwind.css                  # Tailwind 入口
│   │   └── variables.css                 # CSS 变量
│   │
│   ├── App.jsx                            # React 根组件
│   ├── main.jsx                           # React 入口文件
│   └── vite-env.d.ts                      # Vite 类型声明
│
├── src-tauri/                             # Tauri Rust 后端目录
│   ├── src/                               # Rust 源码
│   │   ├── commands/                     # Tauri 命令层
│   │   │   ├── mod.rs                   # 模块导出
│   │   │   ├── auth.rs                  # 认证命令
│   │   │   ├── customer.rs              # 客户管理命令
│   │   │   ├── sales.rs                 # 销售管理命令
│   │   │   ├── inventory.rs             # 库存管理命令
│   │   │   ├── analytics.rs             # 统计分析命令
│   │   │   └── system.rs                # 系统配置命令
│   │   │
│   │   ├── services/                     # 业务逻辑层
│   │   │   ├── mod.rs
│   │   │   ├── auth_service.rs          # 认证服务
│   │   │   ├── customer_service.rs      # 客户服务
│   │   │   ├── sales_service.rs         # 销售服务
│   │   │   ├── inventory_service.rs     # 库存服务
│   │   │   └── analytics_service.rs     # 统计服务
│   │   │
│   │   ├── repositories/                 # 数据访问层
│   │   │   ├── mod.rs
│   │   │   ├── user_repo.rs             # 用户仓储
│   │   │   ├── customer_repo.rs         # 客户仓储
│   │   │   ├── product_repo.rs          # 产品仓储
│   │   │   ├── order_repo.rs            # 订单仓储
│   │   │   ├── stock_repo.rs            # 库存仓储
│   │   │   └── log_repo.rs              # 日志仓储
│   │   │
│   │   ├── models/                       # 数据模型
│   │   │   ├── mod.rs
│   │   │   ├── user.rs                  # 用户模型
│   │   │   ├── customer.rs              # 客户模型
│   │   │   ├── product.rs               # 产品模型
│   │   │   ├── order.rs                 # 订单模型
│   │   │   ├── stock.rs                 # 库存模型
│   │   │   └── common.rs                # 公共模型 (分页、响应等)
│   │   │
│   │   ├── database/                     # 数据库管理
│   │   │   ├── mod.rs
│   │   │   ├── connection.rs            # 数据库连接
│   │   │   └── migrations.rs            # 数据库迁移
│   │   │
│   │   ├── utils/                        # 工具函数
│   │   │   ├── mod.rs
│   │   │   ├── crypto.rs                # 密码加密
│   │   │   ├── file.rs                  # 文件操作
│   │   │   ├── datetime.rs              # 日期处理
│   │   │   └── error.rs                 # 错误处理
│   │   │
│   │   ├── main.rs                       # Rust 入口文件
│   │   └── lib.rs                        # 库文件
│   │
│   ├── icons/                             # 应用图标
│   │   ├── icon.icns                     # macOS 图标
│   │   ├── icon.ico                      # Windows 图标
│   │   └── icon.png                      # Linux 图标
│   │
│   ├── Cargo.toml                         # Rust 依赖配置
│   ├── tauri.conf.json                    # Tauri 配置文件
│   └── build.rs                           # 构建脚本
│
├── database/                              # 数据库文件目录
│   ├── schema.sql                        # 数据库建表语句
│   ├── seeds.sql                         # 初始化数据
│   └── crm_erp.db                        # SQLite 数据库文件 (运行时生成)
│
├── public/                                # 公共资源
│   └── tauri.svg                         # 公共图标
│
├── docs/                                  # 文档目录
│   ├── ARCHITECTURE.md                   # 架构设计文档
│   ├── API.md                            # API 接口文档
│   ├── DATABASE.md                       # 数据库设计文档
│   ├── DEPLOYMENT.md                     # 部署指南
│   └── DEVELOPMENT.md                    # 开发指南
│
├── .gitignore                             # Git 忽略文件
├── package.json                           # Node.js 依赖配置
├── package-lock.json                      # 依赖锁定文件
├── vite.config.js                         # Vite 配置
├── tailwind.config.js                     # Tailwind CSS 配置
├── postcss.config.js                      # PostCSS 配置
├── .env.example                           # 环境变量示例
├── README.md                              # 项目说明文档
└── LICENSE                                # 开源协议
```

## 文件说明

### 前端核心文件
- **src/main.jsx**: React 应用入口，初始化 React 和 Router
- **src/App.jsx**: 根组件，配置路由和全局状态
- **src/routes/index.jsx**: 路由配置，定义所有页面路由
- **src/store/**: Zustand 状态管理，管理全局状态
- **src/services/**: API 服务层，封装 Tauri invoke 调用
- **src/components/**: React 组件库，包含业务组件和公共组件

### 后端核心文件
- **src-tauri/src/main.rs**: Tauri 应用入口，注册所有命令
- **src-tauri/src/commands/**: 暴露给前端的 API 命令
- **src-tauri/src/services/**: 业务逻辑层，处理核心业务
- **src-tauri/src/repositories/**: 数据访问层，封装 SQL 操作
- **src-tauri/src/models/**: 数据模型定义
- **src-tauri/src/database/**: 数据库连接和迁移
- **src-tauri/tauri.conf.json**: Tauri 配置，定义窗口、权限等

### 配置文件
- **package.json**: 前端依赖，包含 React、Tailwind 等
- **Cargo.toml**: Rust 依赖，包含 Tauri、rusqlite 等
- **vite.config.js**: Vite 构建配置
- **tailwind.config.js**: Tailwind CSS 自定义配置

### 数据库文件
- **database/schema.sql**: 完整的数据库建表语句
- **database/seeds.sql**: 测试数据和初始化数据
- **database/crm_erp.db**: SQLite 数据库文件（运行时生成）
