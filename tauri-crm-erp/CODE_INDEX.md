# 完整源代码文件清单

## 📋 说明

本文档列出了 CRM/ERP 系统的所有源代码文件。由于完整项目包含 100+ 个文件,数万行代码,本文档提供:

1. **完整的文件清单** - 所有需要创建的文件列表
2. **核心文件代码** - 关键模块的完整实现代码
3. **代码生成指南** - 如何快速生成其他辅助文件

---

## 📁 前端 React 代码文件 (共 60+ 文件)

### 入口文件 (3 个)
- [ ] `src/main.jsx` - React 应用入口
- [ ] `src/App.jsx` - 根组件
- [ ] `src/index.css` - 全局样式

### 路由配置 (2 个)
- [ ] `src/routes/index.jsx` - 路由主文件
- [ ] `src/routes/routeConfig.js` - 路由配置

### 状态管理 (6 个)
- [ ] `src/store/index.js` - Store 导出
- [ ] `src/store/authStore.js` - 认证状态
- [ ] `src/store/customerStore.js` - 客户数据
- [ ] `src/store/salesStore.js` - 销售数据
- [ ] `src/store/inventoryStore.js` - 库存数据
- [ ] `src/store/settingsStore.js` - 系统设置

### API 服务层 (7 个)
- [ ] `src/services/api.js` - Tauri Invoke 封装
- [ ] `src/services/authService.js` - 认证 API
- [ ] `src/services/customerService.js` - 客户 API
- [ ] `src/services/salesService.js` - 销售 API
- [ ] `src/services/inventoryService.js` - 库存 API
- [ ] `src/services/analyticsService.js` - 统计 API
- [ ] `src/services/systemService.js` - 系统 API

### 工具函数 (5 个)
- [ ] `src/utils/constants.js` - 常量定义
- [ ] `src/utils/format.js` - 格式化工具
- [ ] `src/utils/validation.js` - 表单验证
- [ ] `src/utils/storage.js` - 本地存储
- [ ] `src/utils/permission.js` - 权限判断

### 自定义 Hooks (4 个)
- [ ] `src/hooks/useAuth.js` - 认证 Hook
- [ ] `src/hooks/usePermission.js` - 权限 Hook
- [ ] `src/hooks/useTable.js` - 表格 Hook
- [ ] `src/hooks/useForm.js` - 表单 Hook

### 公共组件 (10 个)
- [ ] `src/components/common/Button/index.jsx` - 按钮
- [ ] `src/components/common/Input/index.jsx` - 输入框
- [ ] `src/components/common/Select/index.jsx` - 下拉选择
- [ ] `src/components/common/Modal/index.jsx` - 弹窗
- [ ] `src/components/common/Table/index.jsx` - 数据表格
- [ ] `src/components/common/Pagination/index.jsx` - 分页
- [ ] `src/components/common/DatePicker/index.jsx` - 日期选择
- [ ] `src/components/common/Loading/index.jsx` - 加载动画
- [ ] `src/components/common/Toast/index.jsx` - 消息提示
- [ ] `src/components/common/Card/index.jsx` - 卡片容器

### 布局组件 (4 个)
- [ ] `src/components/layout/AuthLayout/index.jsx` - 认证布局
- [ ] `src/components/layout/MainLayout/index.jsx` - 主布局
- [ ] `src/components/layout/MainLayout/Sidebar.jsx` - 侧边栏
- [ ] `src/components/layout/MainLayout/Header.jsx` - 顶部栏

### 业务组件 (20+ 个)
#### 客户管理
- [ ] `src/components/customer/CustomerList/index.jsx`
- [ ] `src/components/customer/CustomerForm/index.jsx`
- [ ] `src/components/customer/CustomerDetail/index.jsx`
- [ ] `src/components/customer/FollowUpList/index.jsx`
- [ ] `src/components/customer/FollowUpForm/index.jsx`

#### 销售管理
- [ ] `src/components/sales/QuoteList/index.jsx`
- [ ] `src/components/sales/QuoteForm/index.jsx`
- [ ] `src/components/sales/OrderList/index.jsx`
- [ ] `src/components/sales/OrderForm/index.jsx`
- [ ] `src/components/sales/OrderDetail/index.jsx`

#### 库存管理
- [ ] `src/components/inventory/ProductList/index.jsx`
- [ ] `src/components/inventory/ProductForm/index.jsx`
- [ ] `src/components/inventory/StockMovementList/index.jsx`
- [ ] `src/components/inventory/StockWarning/index.jsx`

#### 数据统计
- [ ] `src/components/analytics/Dashboard/index.jsx`
- [ ] `src/components/analytics/SalesChart/index.jsx`
- [ ] `src/components/analytics/CustomerChart/index.jsx`

#### 系统设置
- [ ] `src/components/settings/UserManagement/index.jsx`
- [ ] `src/components/settings/SystemConfig/index.jsx`
- [ ] `src/components/settings/SystemLogs/index.jsx`

### 页面组件 (8 个)
- [ ] `src/pages/Login/index.jsx` - 登录页
- [ ] `src/pages/Dashboard/index.jsx` - 仪表盘
- [ ] `src/pages/Customers/index.jsx` - 客户管理
- [ ] `src/pages/Sales/index.jsx` - 销售管理
- [ ] `src/pages/Inventory/index.jsx` - 库存管理
- [ ] `src/pages/Analytics/index.jsx` - 数据统计
- [ ] `src/pages/Settings/index.jsx` - 系统设置
- [ ] `src/pages/NotFound/index.jsx` - 404 页面

---

## 🦀 后端 Rust 代码文件 (共 40+ 文件)

### 入口文件 (2 个)
- [ ] `src-tauri/src/main.rs` - Tauri 入口
- [ ] `src-tauri/src/lib.rs` - 库文件

### 数据模型 (7 个)
- [ ] `src-tauri/src/models/mod.rs`
- [ ] `src-tauri/src/models/common.rs` - 公共模型
- [ ] `src-tauri/src/models/user.rs` - 用户模型
- [ ] `src-tauri/src/models/customer.rs` - 客户模型
- [ ] `src-tauri/src/models/product.rs` - 产品模型
- [ ] `src-tauri/src/models/order.rs` - 订单模型
- [ ] `src-tauri/src/models/stock.rs` - 库存模型

### 数据访问层 (7 个)
- [ ] `src-tauri/src/repositories/mod.rs`
- [ ] `src-tauri/src/repositories/user_repo.rs`
- [ ] `src-tauri/src/repositories/customer_repo.rs`
- [ ] `src-tauri/src/repositories/product_repo.rs`
- [ ] `src-tauri/src/repositories/order_repo.rs`
- [ ] `src-tauri/src/repositories/stock_repo.rs`
- [ ] `src-tauri/src/repositories/log_repo.rs`

### 业务逻辑层 (6 个)
- [ ] `src-tauri/src/services/mod.rs`
- [ ] `src-tauri/src/services/auth_service.rs`
- [ ] `src-tauri/src/services/customer_service.rs`
- [ ] `src-tauri/src/services/sales_service.rs`
- [ ] `src-tauri/src/services/inventory_service.rs`
- [ ] `src-tauri/src/services/analytics_service.rs`

### 命令层 (7 个)
- [ ] `src-tauri/src/commands/mod.rs`
- [ ] `src-tauri/src/commands/auth.rs`
- [ ] `src-tauri/src/commands/customer.rs`
- [ ] `src-tauri/src/commands/sales.rs`
- [ ] `src-tauri/src/commands/inventory.rs`
- [ ] `src-tauri/src/commands/analytics.rs`
- [ ] `src-tauri/src/commands/system.rs`

### 数据库管理 (3 个)
- [ ] `src-tauri/src/database/mod.rs`
- [ ] `src-tauri/src/database/connection.rs`
- [ ] `src-tauri/src/database/migrations.rs`

### 工具函数 (5 个)
- [ ] `src-tauri/src/utils/mod.rs`
- [ ] `src-tauri/src/utils/crypto.rs` - 密码加密
- [ ] `src-tauri/src/utils/file.rs` - 文件操作
- [ ] `src-tauri/src/utils/datetime.rs` - 日期处理
- [ ] `src-tauri/src/utils/error.rs` - 错误处理

---

## 🎯 核心代码实现

以下是最关键的核心文件的完整代码实现。

### 1. Rust 主入口文件

**文件**: `src-tauri/src/main.rs`

```rust
// Prevents additional console window on Windows in release
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod database;
mod models;
mod repositories;
mod services;
mod utils;

use database::connection::init_database;
use std::sync::Mutex;
use tauri::Manager;

// 全局状态管理
pub struct AppState {
    pub db_pool: Mutex<r2d2::Pool<r2d2_sqlite::SqliteConnectionManager>>,
}

fn main() {
    // 初始化日志
    env_logger::init();

    tauri::Builder::default()
        .setup(|app| {
            // 初始化数据库
            let app_dir = app.path().app_data_dir().expect("Failed to get app data dir");
            std::fs::create_dir_all(&app_dir).expect("Failed to create app data dir");
            
            let db_path = app_dir.join("crm_erp.db");
            let pool = init_database(&db_path.to_string_lossy())
                .expect("Failed to initialize database");

            // 设置全局状态
            app.manage(AppState {
                db_pool: Mutex::new(pool),
            });

            log::info!("Application started successfully");
            Ok(())
        })
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            // 认证命令
            commands::auth::login,
            commands::auth::logout,
            commands::auth::get_current_user,
            commands::auth::change_password,
            // 客户命令
            commands::customer::get_customers,
            commands::customer::get_customer_by_id,
            commands::customer::create_customer,
            commands::customer::update_customer,
            commands::customer::delete_customer,
            commands::customer::get_followups,
            commands::customer::create_followup,
            // 销售命令
            commands::sales::get_quotes,
            commands::sales::create_quote,
            commands::sales::get_orders,
            commands::sales::create_order,
            commands::sales::update_order_status,
            commands::sales::create_payment,
            // 库存命令
            commands::inventory::get_products,
            commands::inventory::get_product_by_id,
            commands::inventory::create_product,
            commands::inventory::update_product,
            commands::inventory::delete_product,
            commands::inventory::update_stock,
            commands::inventory::get_stock_warnings,
            commands::inventory::get_stock_movements,
            // 统计命令
            commands::analytics::get_sales_statistics,
            commands::analytics::get_customer_distribution,
            commands::analytics::export_report,
            // 系统命令
            commands::system::get_config,
            commands::system::update_config,
            commands::system::get_logs,
            commands::system::backup_database,
            commands::system::restore_database,
        ])
        .run(tauri::generate_context!())
        .expect("Error while running Tauri application");
}
```

### 2. 数据库连接池

**文件**: `src-tauri/src/database/connection.rs`

```rust
use anyhow::{Context, Result};
use r2d2::Pool;
use r2d2_sqlite::SqliteConnectionManager;
use rusqlite::Connection;
use std::path::Path;

/// 初始化数据库连接池
pub fn init_database(db_path: &str) -> Result<Pool<SqliteConnectionManager>> {
    log::info!("Initializing database at: {}", db_path);

    // 检查数据库是否存在
    let db_exists = Path::new(db_path).exists();

    // 创建连接管理器
    let manager = SqliteConnectionManager::file(db_path);
    
    // 创建连接池
    let pool = Pool::builder()
        .max_size(10)
        .build(manager)
        .context("Failed to create database pool")?;

    // 如果数据库不存在,执行初始化
    if !db_exists {
        log::info!("Database does not exist, creating tables...");
        let conn = pool.get().context("Failed to get database connection")?;
        init_schema(&conn)?;
        log::info("Database initialized successfully");
    }

    Ok(pool)
}

/// 初始化数据库表结构
fn init_schema(conn: &Connection) -> Result<()> {
    // 读取并执行建表 SQL
    let schema_sql = include_str!("../../../database/schema.sql");
    
    conn.execute_batch(schema_sql)
        .context("Failed to execute schema SQL")?;

    Ok(())
}

/// 获取数据库连接
pub fn get_connection(
    pool: &Pool<SqliteConnectionManager>,
) -> Result<r2d2::PooledConnection<SqliteConnectionManager>> {
    pool.get().context("Failed to get database connection from pool")
}
```

### 3. React 主入口

**文件**: `src/main.jsx`

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**文件**: `src/App.jsx`

```jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
```

**文件**: `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#root {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* 暗黑模式滚动条 */
.dark ::-webkit-scrollbar-thumb {
  background: #475569;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
```

### 4. API 服务封装

**文件**: `src/services/api.js`

```javascript
import { invoke } from '@tauri-apps/api/core';

/**
 * Tauri Invoke 封装
 * 统一处理 API 调用和错误
 */
class ApiClient {
  /**
   * 调用 Tauri 命令
   * @param {string} command - 命令名称
   * @param {object} args - 命令参数
   * @returns {Promise<any>} 返回数据
   */
  async call(command, args = {}) {
    try {
      const response = await invoke(command, args);
      
      // 检查响应格式
      if (response && typeof response === 'object') {
        if (response.success === false) {
          throw new Error(response.error || '操作失败');
        }
        return response.data !== undefined ? response.data : response;
      }
      
      return response;
    } catch (error) {
      console.error(`API Error [${command}]:`, error);
      throw error;
    }
  }

  /**
   * GET 请求封装
   */
  async get(command, params = {}) {
    return this.call(command, params);
  }

  /**
   * POST 请求封装
   */
  async post(command, data = {}) {
    return this.call(command, data);
  }

  /**
   * PUT 请求封装
   */
  async put(command, data = {}) {
    return this.call(command, data);
  }

  /**
   * DELETE 请求封装
   */
  async delete(command, params = {}) {
    return this.call(command, params);
  }
}

// 导出单例
export default new ApiClient();
```

---

## 🚀 快速代码生成

### 使用脚本生成基础文件结构

创建 `scripts/generate-structure.sh`:

```bash
#!/bin/bash

# 创建前端目录结构
mkdir -p src/{components/{common,layout,customer,sales,inventory,analytics,settings},pages,store,services,utils,hooks,routes,assets/{icons,images},styles}

# 创建后端目录结构
mkdir -p src-tauri/src/{commands,services,repositories,models,database,utils}

# 创建其他目录
mkdir -p database docs/screenshots public

echo "✅ 目录结构创建完成!"
```

运行:
```bash
chmod +x scripts/generate-structure.sh
./scripts/generate-structure.sh
```

---

## 📝 后续步骤

1. **下载完整代码包** - 从项目仓库获取所有源文件
2. **阅读架构文档** - 理解系统设计和模块划分
3. **配置开发环境** - 按照部署指南安装依赖
4. **运行开发服务** - 启动项目进行开发调试
5. **自定义扩展** - 根据业务需求添加新功能

---

## ⚠️ 重要提示

由于完整项目代码量巨大 (预计 20000+ 行代码),建议:

1. **分模块开发**: 先实现核心模块 (登录、客户管理),再扩展其他功能
2. **代码复用**: 参考已有组件和模块,遵循统一的代码规范
3. **测试驱动**: 每完成一个模块立即测试,确保功能正常
4. **版本控制**: 使用 Git 管理代码,及时提交重要变更

---

**如需获取完整源代码,请联系项目维护者或访问项目仓库。**
