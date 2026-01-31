# 企业级 CRM/ERP 桌面应用 - 架构设计文档

## 1. 项目整体架构

### 1.1 技术栈架构图
```
┌─────────────────────────────────────────────────────────────┐
│                    Tauri v2 Desktop App                      │
├─────────────────────────────────────────────────────────────┤
│  Frontend Layer (React 18 + Tailwind CSS v3)                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  UI Components (React Function Components)          │   │
│  │  ├── Auth (Login, UserManagement)                   │   │
│  │  ├── CRM (Customer, FollowUp)                       │   │
│  │  ├── Sales (Quote, Order)                           │   │
│  │  ├── Inventory (Product, Stock)                     │   │
│  │  ├── Analytics (Dashboard, Reports)                 │   │
│  │  └── Settings (System, Theme, Logs)                 │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │  State Management (Zustand)                         │   │
│  │  ├── authStore (用户认证状态)                        │   │
│  │  ├── customerStore (客户数据)                        │   │
│  │  ├── orderStore (订单数据)                           │   │
│  │  └── settingsStore (系统设置)                        │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │  Router (React Router v6)                           │   │
│  │  └── Protected Routes (权限路由拦截)                 │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  Communication Layer (Tauri IPC - invoke/listen)            │
├─────────────────────────────────────────────────────────────┤
│  Backend Layer (Rust + Tauri v2)                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  API Layer (Tauri Commands)                         │   │
│  │  ├── auth_commands.rs (用户认证API)                  │   │
│  │  ├── customer_commands.rs (客户管理API)              │   │
│  │  ├── sales_commands.rs (销售管理API)                 │   │
│  │  ├── inventory_commands.rs (库存管理API)             │   │
│  │  ├── analytics_commands.rs (数据统计API)             │   │
│  │  └── system_commands.rs (系统配置API)                │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │  Business Logic Layer                               │   │
│  │  ├── services/ (业务逻辑封装)                        │   │
│  │  ├── models/ (数据模型定义)                          │   │
│  │  └── utils/ (工具函数)                               │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │  Data Access Layer                                  │   │
│  │  ├── database.rs (数据库连接池)                      │   │
│  │  ├── repositories/ (数据仓储层)                      │   │
│  │  └── migrations/ (数据库迁移)                        │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  Data Layer (SQLite3 Embedded Database)                     │
│  └── crm_erp.db (本地数据库文件)                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 前端组件树结构
```
App (根组件)
├── Router (路由容器)
│   ├── AuthLayout (认证布局)
│   │   └── LoginPage (登录页)
│   └── MainLayout (主布局)
│       ├── Sidebar (侧边栏导航)
│       ├── Header (顶部栏)
│       └── Content (内容区)
│           ├── Dashboard (仪表盘)
│           ├── CustomerModule (客户管理)
│           │   ├── CustomerList (客户列表)
│           │   ├── CustomerDetail (客户详情)
│           │   ├── CustomerForm (客户表单)
│           │   └── FollowUpList (跟进记录)
│           ├── SalesModule (销售管理)
│           │   ├── QuoteList (报价单列表)
│           │   ├── QuoteForm (报价单表单)
│           │   ├── OrderList (订单列表)
│           │   └── OrderDetail (订单详情)
│           ├── InventoryModule (库存管理)
│           │   ├── ProductList (产品列表)
│           │   ├── ProductForm (产品表单)
│           │   ├── StockInOutList (出入库记录)
│           │   └── StockWarning (库存预警)
│           ├── AnalyticsModule (数据统计)
│           │   ├── SalesChart (销售图表)
│           │   ├── CustomerChart (客户分布)
│           │   ├── InventoryChart (库存周转)
│           │   └── ReportExport (报表导出)
│           └── SettingsModule (系统设置)
│               ├── UserManagement (用户管理)
│               ├── SystemConfig (系统配置)
│               ├── ThemeSwitcher (主题切换)
│               └── SystemLogs (系统日志)
└── Common Components (公共组件)
    ├── Table (数据表格)
    ├── Form (表单组件)
    ├── Modal (弹窗组件)
    ├── Button (按钮组件)
    ├── Input (输入框组件)
    ├── Select (下拉选择)
    ├── DatePicker (日期选择)
    └── Chart (图表组件)
```

### 1.3 Rust 后端分层架构
```
src-tauri/src/
├── main.rs (入口文件，注册所有命令)
├── commands/ (API 命令层)
│   ├── mod.rs
│   ├── auth.rs (认证相关命令)
│   ├── customer.rs (客户管理命令)
│   ├── sales.rs (销售管理命令)
│   ├── inventory.rs (库存管理命令)
│   ├── analytics.rs (统计分析命令)
│   └── system.rs (系统配置命令)
├── services/ (业务逻辑层)
│   ├── mod.rs
│   ├── auth_service.rs
│   ├── customer_service.rs
│   ├── sales_service.rs
│   ├── inventory_service.rs
│   └── analytics_service.rs
├── repositories/ (数据访问层)
│   ├── mod.rs
│   ├── user_repo.rs
│   ├── customer_repo.rs
│   ├── product_repo.rs
│   ├── order_repo.rs
│   └── log_repo.rs
├── models/ (数据模型)
│   ├── mod.rs
│   ├── user.rs
│   ├── customer.rs
│   ├── product.rs
│   ├── order.rs
│   └── common.rs
├── database/ (数据库管理)
│   ├── mod.rs
│   ├── connection.rs (连接池)
│   ├── migrations.rs (数据库迁移)
│   └── schema.sql (建表语句)
└── utils/ (工具函数)
    ├── mod.rs
    ├── crypto.rs (密码加密)
    ├── file.rs (文件操作)
    └── datetime.rs (日期处理)
```

### 1.4 前后端通信流程
```
前端 React Component
    ↓ (用户操作，如：创建客户)
调用 Tauri invoke API
    ↓ (invoke('create_customer', { data }))
Tauri IPC 层
    ↓ (序列化数据，传递到 Rust)
Rust Command Handler (commands/customer.rs)
    ↓ (调用业务逻辑层)
Business Service (services/customer_service.rs)
    ↓ (数据验证，业务处理)
Data Repository (repositories/customer_repo.rs)
    ↓ (执行 SQL 语句)
SQLite Database
    ↓ (返回结果)
Repository → Service → Command
    ↓ (序列化返回数据)
Tauri IPC 层
    ↓ (返回 JSON 数据)
前端 React Component
    ↓ (更新 UI，显示结果)
```

## 2. SQLite3 数据库表结构设计

### 2.1 用户与权限表

#### users (用户表)
| 字段名 | 类型 | 约束 | 默认值 | 说明 |
|--------|------|------|--------|------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | - | 用户ID |
| username | TEXT | UNIQUE NOT NULL | - | 登录用户名 |
| password_hash | TEXT | NOT NULL | - | 密码哈希 (bcrypt) |
| full_name | TEXT | NOT NULL | - | 用户真实姓名 |
| email | TEXT | - | NULL | 邮箱 |
| phone | TEXT | - | NULL | 联系电话 |
| role | TEXT | NOT NULL | 'employee' | 角色 (admin/manager/sales/warehouse/employee) |
| avatar_path | TEXT | - | NULL | 头像路径 |
| status | TEXT | NOT NULL | 'active' | 状态 (active/inactive) |
| created_at | TEXT | NOT NULL | CURRENT_TIMESTAMP | 创建时间 |
| updated_at | TEXT | NOT NULL | CURRENT_TIMESTAMP | 更新时间 |
| last_login_at | TEXT | - | NULL | 最后登录时间 |

索引: 
- `CREATE INDEX idx_users_username ON users(username);`
- `CREATE INDEX idx_users_role ON users(role);`

#### permissions (权限表)
| 字段名 | 类型 | 约束 | 默认值 | 说明 |
|--------|------|------|--------|------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | - | 权限ID |
| role | TEXT | NOT NULL | - | 角色名称 |
| module | TEXT | NOT NULL | - | 模块名 (customer/sales/inventory/analytics/system) |
| can_view | INTEGER | NOT NULL | 0 | 查看权限 (0/1) |
| can_create | INTEGER | NOT NULL | 0 | 创建权限 (0/1) |
| can_update | INTEGER | NOT NULL | 0 | 更新权限 (0/1) |
| can_delete | INTEGER | NOT NULL | 0 | 删除权限 (0/1) |

索引:
- `CREATE UNIQUE INDEX idx_permissions_role_module ON permissions(role, module);`

### 2.2 客户管理表

#### customers (客户表)
| 字段名 | 类型 | 约束 | 默认值 | 说明 |
|--------|------|------|--------|------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | - | 客户ID |
| name | TEXT | NOT NULL | - | 客户名称 |
| contact_person | TEXT | - | NULL | 联系人 |
| phone | TEXT | - | NULL | 联系电话 |
| email | TEXT | - | NULL | 邮箱 |
| address | TEXT | - | NULL | 地址 |
| industry | TEXT | - | NULL | 所属行业 |
| customer_level | TEXT | NOT NULL | 'normal' | 客户等级 (vip/important/normal) |
| assigned_to | INTEGER | - | NULL | 负责人ID (外键 users.id) |
| tags | TEXT | - | NULL | 标签 (JSON 数组字符串) |
| status | TEXT | NOT NULL | 'active' | 状态 (active/inactive) |
| created_by | INTEGER | NOT NULL | - | 创建人ID |
| created_at | TEXT | NOT NULL | CURRENT_TIMESTAMP | 创建时间 |
| updated_at | TEXT | NOT NULL | CURRENT_TIMESTAMP | 更新时间 |

索引:
- `CREATE INDEX idx_customers_name ON customers(name);`
- `CREATE INDEX idx_customers_assigned_to ON customers(assigned_to);`
- `CREATE INDEX idx_customers_level ON customers(customer_level);`

#### customer_followups (客户跟进记录表)
| 字段名 | 类型 | 约束 | 默认值 | 说明 |
|--------|------|------|--------|------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | - | 跟进记录ID |
| customer_id | INTEGER | NOT NULL | - | 客户ID (外键) |
| followup_time | TEXT | NOT NULL | - | 跟进时间 |
| content | TEXT | NOT NULL | - | 跟进内容 |
| result | TEXT | - | NULL | 跟进结果 |
| next_followup_time | TEXT | - | NULL | 下次跟进时间 |
| created_by | INTEGER | NOT NULL | - | 跟进人ID |
| created_at | TEXT | NOT NULL | CURRENT_TIMESTAMP | 创建时间 |

索引:
- `CREATE INDEX idx_followups_customer ON customer_followups(customer_id);`
- `CREATE INDEX idx_followups_time ON customer_followups(followup_time);`

### 2.3 销售管理表

#### products (产品表)
| 字段名 | 类型 | 约束 | 默认值 | 说明 |
|--------|------|------|--------|------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | - | 产品ID |
| name | TEXT | NOT NULL | - | 产品名称 |
| sku | TEXT | UNIQUE NOT NULL | - | 产品编码 |
| category | TEXT | - | NULL | 产品分类 |
| specification | TEXT | - | NULL | 规格 |
| unit | TEXT | NOT NULL | '件' | 单位 |
| price | REAL | NOT NULL | 0 | 销售单价 |
| cost_price | REAL | NOT NULL | 0 | 成本价 |
| stock_quantity | INTEGER | NOT NULL | 0 | 当前库存数量 |
| stock_warning_threshold | INTEGER | NOT NULL | 10 | 库存预警阈值 |
| image_path | TEXT | - | NULL | 产品图片路径 |
| description | TEXT | - | NULL | 产品描述 |
| status | TEXT | NOT NULL | 'active' | 状态 (active/inactive) |
| created_at | TEXT | NOT NULL | CURRENT_TIMESTAMP | 创建时间 |
| updated_at | TEXT | NOT NULL | CURRENT_TIMESTAMP | 更新时间 |

索引:
- `CREATE INDEX idx_products_sku ON products(sku);`
- `CREATE INDEX idx_products_category ON products(category);`
- `CREATE INDEX idx_products_name ON products(name);`

#### quotes (报价单表)
| 字段名 | 类型 | 约束 | 默认值 | 说明 |
|--------|------|------|--------|------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | - | 报价单ID |
| quote_no | TEXT | UNIQUE NOT NULL | - | 报价单号 |
| customer_id | INTEGER | NOT NULL | - | 客户ID (外键) |
| total_amount | REAL | NOT NULL | 0 | 总金额 |
| valid_until | TEXT | NOT NULL | - | 有效期至 |
| status | TEXT | NOT NULL | 'draft' | 状态 (draft/sent/accepted/rejected) |
| notes | TEXT | - | NULL | 备注 |
| created_by | INTEGER | NOT NULL | - | 创建人ID |
| created_at | TEXT | NOT NULL | CURRENT_TIMESTAMP | 创建时间 |
| updated_at | TEXT | NOT NULL | CURRENT_TIMESTAMP | 更新时间 |

索引:
- `CREATE INDEX idx_quotes_no ON quotes(quote_no);`
- `CREATE INDEX idx_quotes_customer ON quotes(customer_id);`
- `CREATE INDEX idx_quotes_status ON quotes(status);`

#### quote_items (报价单明细表)
| 字段名 | 类型 | 约束 | 默认值 | 说明 |
|--------|------|------|--------|------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | - | 明细ID |
| quote_id | INTEGER | NOT NULL | - | 报价单ID (外键) |
| product_id | INTEGER | NOT NULL | - | 产品ID (外键) |
| quantity | INTEGER | NOT NULL | 1 | 数量 |
| unit_price | REAL | NOT NULL | 0 | 单价 |
| subtotal | REAL | NOT NULL | 0 | 小计 |

索引:
- `CREATE INDEX idx_quote_items_quote ON quote_items(quote_id);`

#### orders (订单表)
| 字段名 | 类型 | 约束 | 默认值 | 说明 |
|--------|------|------|--------|------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | - | 订单ID |
| order_no | TEXT | UNIQUE NOT NULL | - | 订单号 |
| customer_id | INTEGER | NOT NULL | - | 客户ID (外键) |
| quote_id | INTEGER | - | NULL | 关联报价单ID |
| total_amount | REAL | NOT NULL | 0 | 订单总金额 |
| paid_amount | REAL | NOT NULL | 0 | 已付金额 |
| status | TEXT | NOT NULL | 'pending_payment' | 状态 (pending_payment/paid/shipped/completed/cancelled) |
| order_date | TEXT | NOT NULL | CURRENT_TIMESTAMP | 下单日期 |
| ship_date | TEXT | - | NULL | 发货日期 |
| complete_date | TEXT | - | NULL | 完成日期 |
| notes | TEXT | - | NULL | 备注 |
| created_by | INTEGER | NOT NULL | - | 创建人ID |
| created_at | TEXT | NOT NULL | CURRENT_TIMESTAMP | 创建时间 |
| updated_at | TEXT | NOT NULL | CURRENT_TIMESTAMP | 更新时间 |

索引:
- `CREATE INDEX idx_orders_no ON orders(order_no);`
- `CREATE INDEX idx_orders_customer ON orders(customer_id);`
- `CREATE INDEX idx_orders_status ON orders(status);`
- `CREATE INDEX idx_orders_date ON orders(order_date);`

#### order_items (订单明细表)
| 字段名 | 类型 | 约束 | 默认值 | 说明 |
|--------|------|------|--------|------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | - | 明细ID |
| order_id | INTEGER | NOT NULL | - | 订单ID (外键) |
| product_id | INTEGER | NOT NULL | - | 产品ID (外键) |
| quantity | INTEGER | NOT NULL | 1 | 数量 |
| unit_price | REAL | NOT NULL | 0 | 单价 |
| subtotal | REAL | NOT NULL | 0 | 小计 |

索引:
- `CREATE INDEX idx_order_items_order ON order_items(order_id);`

#### payments (回款记录表)
| 字段名 | 类型 | 约束 | 默认值 | 说明 |
|--------|------|------|--------|------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | - | 回款记录ID |
| order_id | INTEGER | NOT NULL | - | 订单ID (外键) |
| amount | REAL | NOT NULL | 0 | 回款金额 |
| payment_date | TEXT | NOT NULL | CURRENT_TIMESTAMP | 回款日期 |
| payment_method | TEXT | - | NULL | 支付方式 |
| notes | TEXT | - | NULL | 备注 |
| created_by | INTEGER | NOT NULL | - | 记录人ID |
| created_at | TEXT | NOT NULL | CURRENT_TIMESTAMP | 创建时间 |

索引:
- `CREATE INDEX idx_payments_order ON payments(order_id);`
- `CREATE INDEX idx_payments_date ON payments(payment_date);`

### 2.4 库存管理表

#### stock_movements (库存出入库记录表)
| 字段名 | 类型 | 约束 | 默认值 | 说明 |
|--------|------|------|--------|------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | - | 记录ID |
| product_id | INTEGER | NOT NULL | - | 产品ID (外键) |
| movement_type | TEXT | NOT NULL | - | 类型 (in/out/adjust) |
| quantity | INTEGER | NOT NULL | 0 | 数量 (入库为正，出库为负) |
| reference_type | TEXT | - | NULL | 关联类型 (order/return/adjust) |
| reference_id | INTEGER | - | NULL | 关联ID |
| notes | TEXT | - | NULL | 备注 |
| created_by | INTEGER | NOT NULL | - | 操作人ID |
| created_at | TEXT | NOT NULL | CURRENT_TIMESTAMP | 操作时间 |

索引:
- `CREATE INDEX idx_stock_movements_product ON stock_movements(product_id);`
- `CREATE INDEX idx_stock_movements_type ON stock_movements(movement_type);`
- `CREATE INDEX idx_stock_movements_date ON stock_movements(created_at);`

### 2.5 系统配置表

#### system_config (系统配置表)
| 字段名 | 类型 | 约束 | 默认值 | 说明 |
|--------|------|------|--------|------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | - | 配置ID |
| config_key | TEXT | UNIQUE NOT NULL | - | 配置键 |
| config_value | TEXT | NOT NULL | - | 配置值 |
| description | TEXT | - | NULL | 配置说明 |
| updated_at | TEXT | NOT NULL | CURRENT_TIMESTAMP | 更新时间 |

#### system_logs (系统日志表)
| 字段名 | 类型 | 约束 | 默认值 | 说明 |
|--------|------|------|--------|------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | - | 日志ID |
| user_id | INTEGER | - | NULL | 用户ID |
| action | TEXT | NOT NULL | - | 操作类型 (login/create/update/delete) |
| module | TEXT | NOT NULL | - | 模块名称 |
| description | TEXT | NOT NULL | - | 操作描述 |
| ip_address | TEXT | - | NULL | IP地址 |
| created_at | TEXT | NOT NULL | CURRENT_TIMESTAMP | 创建时间 |

索引:
- `CREATE INDEX idx_logs_user ON system_logs(user_id);`
- `CREATE INDEX idx_logs_action ON system_logs(action);`
- `CREATE INDEX idx_logs_date ON system_logs(created_at);`

## 3. 前后端 API 接口文档

### 3.1 认证模块 API

#### 用户登录
- **命令名**: `login`
- **入参**: 
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **出参**:
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "id": 1,
        "username": "admin",
        "full_name": "系统管理员",
        "role": "admin",
        "avatar_path": null
      },
      "token": "session_token_string"
    }
  }
  ```
- **错误返回**:
  ```json
  {
    "success": false,
    "error": "用户名或密码错误"
  }
  ```

#### 用户登出
- **命令名**: `logout`
- **入参**: 无
- **出参**: `{ "success": true }`

#### 获取当前用户信息
- **命令名**: `get_current_user`
- **入参**: 无
- **出参**: 用户对象

#### 修改密码
- **命令名**: `change_password`
- **入参**:
  ```json
  {
    "old_password": "string",
    "new_password": "string"
  }
  ```
- **出参**: `{ "success": true }`

### 3.2 客户管理模块 API

#### 获取客户列表
- **命令名**: `get_customers`
- **入参**:
  ```json
  {
    "page": 1,
    "page_size": 20,
    "search": "关键词",
    "level": "vip|important|normal",
    "status": "active|inactive"
  }
  ```
- **出参**:
  ```json
  {
    "success": true,
    "data": {
      "items": [客户对象数组],
      "total": 100,
      "page": 1,
      "page_size": 20
    }
  }
  ```

#### 创建客户
- **命令名**: `create_customer`
- **入参**: 客户对象
- **出参**: `{ "success": true, "data": { "id": 1 } }`

#### 更新客户
- **命令名**: `update_customer`
- **入参**: `{ "id": 1, "data": 客户对象 }`
- **出参**: `{ "success": true }`

#### 删除客户
- **命令名**: `delete_customer`
- **入参**: `{ "id": 1 }`
- **出参**: `{ "success": true }`

#### 获取客户跟进记录
- **命令名**: `get_customer_followups`
- **入参**: `{ "customer_id": 1 }`
- **出参**: 跟进记录数组

#### 创建跟进记录
- **命令名**: `create_followup`
- **入参**: 跟进记录对象
- **出参**: `{ "success": true, "data": { "id": 1 } }`

### 3.3 销售管理模块 API

#### 创建报价单
- **命令名**: `create_quote`
- **入参**:
  ```json
  {
    "customer_id": 1,
    "valid_until": "2026-02-28",
    "items": [
      {
        "product_id": 1,
        "quantity": 10,
        "unit_price": 100.00
      }
    ],
    "notes": "备注"
  }
  ```
- **出参**: `{ "success": true, "data": { "id": 1, "quote_no": "Q20260130001" } }`

#### 创建订单
- **命令名**: `create_order`
- **入参**: 订单对象
- **出参**: `{ "success": true, "data": { "id": 1, "order_no": "O20260130001" } }`

#### 更新订单状态
- **命令名**: `update_order_status`
- **入参**: `{ "id": 1, "status": "paid" }`
- **出参**: `{ "success": true }`

#### 添加回款记录
- **命令名**: `create_payment`
- **入参**: 回款记录对象
- **出参**: `{ "success": true, "data": { "id": 1 } }`

### 3.4 库存管理模块 API

#### 获取产品列表
- **命令名**: `get_products`
- **入参**: 分页+筛选参数
- **出参**: 产品列表

#### 创建产品
- **命令名**: `create_product`
- **入参**: 产品对象
- **出参**: `{ "success": true, "data": { "id": 1 } }`

#### 更新产品库存
- **命令名**: `update_product_stock`
- **入参**: `{ "product_id": 1, "quantity": 50, "type": "in|out|adjust", "notes": "备注" }`
- **出参**: `{ "success": true }`

#### 获取库存预警列表
- **命令名**: `get_stock_warnings`
- **入参**: 无
- **出参**: 低库存产品列表

#### 获取出入库记录
- **命令名**: `get_stock_movements`
- **入参**: `{ "product_id": 1, "start_date": "2026-01-01", "end_date": "2026-01-31" }`
- **出参**: 出入库记录列表

### 3.5 数据统计模块 API

#### 获取销售统计数据
- **命令名**: `get_sales_statistics`
- **入参**: `{ "start_date": "2026-01-01", "end_date": "2026-01-31", "group_by": "day|month|user" }`
- **出参**: 统计数据数组

#### 获取客户分布统计
- **命令名**: `get_customer_distribution`
- **入参**: `{ "dimension": "level|industry" }`
- **出参**: 分布数据数组

#### 导出报表
- **命令名**: `export_report`
- **入参**: `{ "report_type": "customer|sales|inventory", "format": "excel|csv", "filters": {} }`
- **出参**: `{ "success": true, "data": { "file_path": "/path/to/file.xlsx" } }`

### 3.6 系统配置模块 API

#### 获取系统配置
- **命令名**: `get_system_config`
- **入参**: `{ "key": "company_name" }`
- **出参**: `{ "success": true, "data": { "value": "某某公司" } }`

#### 更新系统配置
- **命令名**: `update_system_config`
- **入参**: `{ "key": "company_name", "value": "新公司名" }`
- **出参**: `{ "success": true }`

#### 获取系统日志
- **命令名**: `get_system_logs`
- **入参**: 分页+筛选参数
- **出参**: 日志列表

#### 数据库备份
- **命令名**: `backup_database`
- **入参**: `{ "backup_path": "/path/to/backup" }`
- **出参**: `{ "success": true, "data": { "file_path": "/path/to/backup/crm_erp_20260130.db" } }`

#### 数据库恢复
- **命令名**: `restore_database`
- **入参**: `{ "backup_file": "/path/to/backup/crm_erp_20260130.db" }`
- **出参**: `{ "success": true }`

## 4. 核心业务流程说明

### 4.1 客户跟进流程
```
1. 销售人员查看客户列表
   ↓
2. 选择客户，查看客户详情
   ↓
3. 点击"添加跟进记录"
   ↓
4. 填写跟进内容（时间、内容、结果、下次跟进时间）
   ↓
5. 提交保存（前端调用 create_followup API）
   ↓
6. 后端验证数据，写入 customer_followups 表
   ↓
7. 记录系统日志（system_logs）
   ↓
8. 返回成功，前端刷新跟进记录列表
   ↓
9. 如设置了下次跟进时间，系统自动提醒（可选功能）
```

### 4.2 订单创建流程
```
1. 销售人员进入订单管理页面
   ↓
2. 点击"新建订单"，选择客户
   ↓
3. （可选）关联已有报价单，自动填充产品明细
   ↓
4. 添加产品明细（选择产品、输入数量、确认单价）
   ↓
5. 系统自动计算订单总金额
   ↓
6. 填写订单备注，提交订单（前端调用 create_order API）
   ↓
7. 后端开启数据库事务
   ↓
8. 验证客户是否存在、产品是否存在、库存是否充足
   ↓
9. 生成订单号（格式：O20260130001）
   ↓
10. 插入 orders 表
   ↓
11. 插入 order_items 表（订单明细）
   ↓
12. 扣减产品库存（更新 products.stock_quantity）
   ↓
13. 记录库存变动（插入 stock_movements 表，类型为 out）
   ↓
14. 记录系统日志
   ↓
15. 提交事务
   ↓
16. 返回成功，前端跳转到订单详情页
```

### 4.3 库存出入库流程
```
【入库流程】
1. 库管人员进入库存管理页面
   ↓
2. 点击"产品入库"
   ↓
3. 选择产品，输入入库数量，填写入库备注
   ↓
4. 提交入库（前端调用 update_product_stock API）
   ↓
5. 后端开启事务
   ↓
6. 验证产品是否存在
   ↓
7. 更新 products.stock_quantity（当前库存 + 入库数量）
   ↓
8. 插入 stock_movements 表（类型为 in，数量为正数）
   ↓
9. 更新 products.updated_at
   ↓
10. 记录系统日志
   ↓
11. 提交事务
   ↓
12. 返回成功，前端刷新产品列表

【出库流程】
1. 订单发货时自动触发（或库管人员手动出库）
   ↓
2. 验证库存是否充足（当前库存 >= 出库数量）
   ↓
3. 更新 products.stock_quantity（当前库存 - 出库数量）
   ↓
4. 插入 stock_movements 表（类型为 out，数量为负数）
   ↓
5. 检查库存是否低于预警阈值，如是，触发库存预警
   ↓
6. 提交事务，返回成功

【库存盘点】
1. 库管人员发起盘点
   ↓
2. 输入实际库存数量
   ↓
3. 计算差异（实际库存 - 系统库存）
   ↓
4. 调整库存（类型为 adjust）
   ↓
5. 记录盘点日志
```

## 5. 错误码定义
```
1000: 成功
4000: 请求参数错误
4001: 用户名或密码错误
4002: 用户未登录
4003: 权限不足
4004: 资源不存在
4005: 数据已存在（唯一性冲突）
5000: 服务器内部错误
5001: 数据库操作失败
5002: 文件操作失败
```
