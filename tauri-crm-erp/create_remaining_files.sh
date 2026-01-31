#!/bin/bash
cd src-tauri/src

# 创建customer模型
cat > models/customer.rs << 'EOF'
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Customer {
    pub id: i64,
    pub name: String,
    pub contact_person: Option<String>,
    pub phone: Option<String>,
    pub email: Option<String>,
    pub address: Option<String>,
    pub industry: Option<String>,
    pub customer_level: String,
    pub assigned_to: Option<i64>,
    pub tags: Option<String>,
    pub status: String,
    pub created_by: i64,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Deserialize)]
pub struct CreateCustomerRequest {
    pub name: String,
    pub contact_person: Option<String>,
    pub phone: Option<String>,
    pub email: Option<String>,
    pub address: Option<String>,
    pub industry: Option<String>,
    pub customer_level: String,
    pub assigned_to: Option<i64>,
    pub tags: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateCustomerRequest {
    pub name: Option<String>,
    pub contact_person: Option<String>,
    pub phone: Option<String>,
    pub email: Option<String>,
    pub address: Option<String>,
    pub industry: Option<String>,
    pub customer_level: Option<String>,
    pub assigned_to: Option<i64>,
    pub tags: Option<String>,
    pub status: Option<String>,
}
EOF

# 创建数据库连接
cat > database/connection.rs << 'EOF'
use anyhow::{Context, Result};
use r2d2::Pool;
use r2d2_sqlite::SqliteConnectionManager;
use rusqlite::Connection;
use std::path::Path;

pub fn init_database(db_path: &str) -> Result<Pool<SqliteConnectionManager>> {
    log::info!("Initializing database at: {}", db_path);

    let db_exists = Path::new(db_path).exists();

    let manager = SqliteConnectionManager::file(db_path);
    let pool = Pool::builder().max_size(10).build(manager)?;

    if !db_exists {
        log::info!("Database does not exist, creating tables...");
        let conn = pool.get()?;
        init_schema(&conn)?;
        log::info("Database initialized successfully");
    }

    Ok(pool)
}

fn init_schema(conn: &Connection) -> Result<()> {
    let schema_sql = include_str!("../../../database/schema.sql");
    conn.execute_batch(schema_sql)?;
    Ok(())
}
EOF

# 创建加密工具
cat > utils/crypto.rs << 'EOF'
use bcrypt::{hash, verify, DEFAULT_COST};

pub fn hash_password(password: &str) -> Result<String, bcrypt::BcryptError> {
    hash(password, DEFAULT_COST)
}

pub fn verify_password(password: &str, hash: &str) -> Result<bool, bcrypt::BcryptError> {
    verify(password, hash)
}
EOF

# 创建认证命令
cat > commands/auth.rs << 'EOF'
use crate::models::common::ApiResponse;
use crate::models::user::{LoginRequest, LoginResponse, UserInfo};
use crate::AppState;
use tauri::State;

#[tauri::command]
pub async fn login(
    state: State<'_, AppState>,
    username: String,
    password: String,
) -> Result<ApiResponse<LoginResponse>, String> {
    // 简化实现 - 仅验证admin账号
    if username == "admin" && password == "admin123" {
        let user = UserInfo {
            id: 1,
            username: "admin".to_string(),
            full_name: "系统管理员".to_string(),
            email: None,
            phone: None,
            role: "admin".to_string(),
            avatar_path: None,
        };

        let response = LoginResponse {
            user,
            token: format!("mock_token_{}", chrono::Utc::now().timestamp()),
        };

        Ok(ApiResponse::success(response))
    } else {
        Err("用户名或密码错误".to_string())
    }
}

#[tauri::command]
pub async fn logout() -> Result<ApiResponse<()>, String> {
    Ok(ApiResponse::success(()))
}

#[tauri::command]
pub async fn get_current_user() -> Result<ApiResponse<UserInfo>, String> {
    let user = UserInfo {
        id: 1,
        username: "admin".to_string(),
        full_name: "系统管理员".to_string(),
        email: Some("admin@example.com".to_string()),
        phone: None,
        role: "admin".to_string(),
        avatar_path: None,
    };
    
    Ok(ApiResponse::success(user))
}

#[tauri::command]
pub async fn change_password(
    old_password: String,
    new_password: String,
) -> Result<ApiResponse<()>, String> {
    // 简化实现
    if old_password == "admin123" {
        Ok(ApiResponse::success(()))
    } else {
        Err("原密码错误".to_string())
    }
}
EOF

# 创建客户命令
cat > commands/customer.rs << 'EOF'
use crate::models::common::{ApiResponse, PageResponse};
use crate::models::customer::Customer;
use crate::AppState;
use tauri::State;

#[tauri::command]
pub async fn get_customers(
    state: State<'_, AppState>,
    page: u32,
    page_size: u32,
    search: String,
) -> Result<ApiResponse<PageResponse<Customer>>, String> {
    // 模拟数据
    let customers = vec![
        Customer {
            id: 1,
            name: "张三公司".to_string(),
            contact_person: Some("张三".to_string()),
            phone: Some("13800138000".to_string()),
            email: None,
            address: None,
            industry: Some("科技".to_string()),
            customer_level: "vip".to_string(),
            assigned_to: Some(1),
            tags: None,
            status: "active".to_string(),
            created_by: 1,
            created_at: "2026-01-01 00:00:00".to_string(),
            updated_at: "2026-01-01 00:00:00".to_string(),
        },
    ];

    let response = PageResponse::new(customers, 1, page, page_size);
    Ok(ApiResponse::success(response))
}

#[tauri::command]
pub async fn get_customer_by_id(
    state: State<'_, AppState>,
    id: i64,
) -> Result<ApiResponse<Customer>, String> {
    let customer = Customer {
        id,
        name: "张三公司".to_string(),
        contact_person: Some("张三".to_string()),
        phone: Some("13800138000".to_string()),
        email: None,
        address: None,
        industry: Some("科技".to_string()),
        customer_level: "vip".to_string(),
        assigned_to: Some(1),
        tags: None,
        status: "active".to_string(),
        created_by: 1,
        created_at: "2026-01-01 00:00:00".to_string(),
        updated_at: "2026-01-01 00:00:00".to_string(),
    };

    Ok(ApiResponse::success(customer))
}

#[tauri::command]
pub async fn create_customer() -> Result<ApiResponse<i64>, String> {
    Ok(ApiResponse::success(1))
}

#[tauri::command]
pub async fn update_customer() -> Result<ApiResponse<()>, String> {
    Ok(ApiResponse::success(()))
}

#[tauri::command]
pub async fn delete_customer() -> Result<ApiResponse<()>, String> {
    Ok(ApiResponse::success(()))
}

#[tauri::command]
pub async fn get_followups() -> Result<ApiResponse<Vec<String>>, String> {
    Ok(ApiResponse::success(vec![]))
}

#[tauri::command]
pub async fn create_followup() -> Result<ApiResponse<i64>, String> {
    Ok(ApiResponse::success(1))
}
EOF

# 创建简化的仓储和服务层
cat > repositories/user_repo.rs << 'EOF'
// 用户数据仓储层 - 待实现
EOF

cat > repositories/customer_repo.rs << 'EOF'
// 客户数据仓储层 - 待实现
EOF

cat > services/auth_service.rs << 'EOF'
// 认证服务层 - 待实现
EOF

cat > services/customer_service.rs << 'EOF'
// 客户服务层 - 待实现
EOF

echo "所有Rust文件创建完成"
