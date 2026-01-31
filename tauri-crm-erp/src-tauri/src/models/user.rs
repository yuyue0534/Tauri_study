use serde::{Deserialize, Serialize};

/// 用户模型
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct User {
    pub id: i64,
    pub username: String,
    pub full_name: String,
    pub email: Option<String>,
    pub phone: Option<String>,
    pub role: String,
    pub avatar_path: Option<String>,
    pub status: String,
    pub created_at: String,
    pub updated_at: String,
    pub last_login_at: Option<String>,
}

/// 用户创建请求
#[derive(Debug, Deserialize)]
pub struct CreateUserRequest {
    pub username: String,
    pub password: String,
    pub full_name: String,
    pub email: Option<String>,
    pub phone: Option<String>,
    pub role: String,
}

/// 用户更新请求
#[derive(Debug, Deserialize)]
pub struct UpdateUserRequest {
    pub full_name: Option<String>,
    pub email: Option<String>,
    pub phone: Option<String>,
    pub avatar_path: Option<String>,
    pub status: Option<String>,
}

/// 登录请求
#[derive(Debug, Deserialize)]
pub struct LoginRequest {
    pub username: String,
    pub password: String,
}

/// 登录响应
#[derive(Debug, Serialize)]
pub struct LoginResponse {
    pub user: UserInfo,
    pub token: String,
}

/// 用户信息（不包含密码）
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserInfo {
    pub id: i64,
    pub username: String,
    pub full_name: String,
    pub email: Option<String>,
    pub phone: Option<String>,
    pub role: String,
    pub avatar_path: Option<String>,
}

impl From<User> for UserInfo {
    fn from(user: User) -> Self {
        Self {
            id: user.id,
            username: user.username,
            full_name: user.full_name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            avatar_path: user.avatar_path,
        }
    }
}

/// 修改密码请求
#[derive(Debug, Deserialize)]
pub struct ChangePasswordRequest {
    pub old_password: String,
    pub new_password: String,
}

/// 权限模型
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Permission {
    pub id: i64,
    pub role: String,
    pub module: String,
    pub can_view: bool,
    pub can_create: bool,
    pub can_update: bool,
    pub can_delete: bool,
}

/// 用户角色枚举
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub enum UserRole {
    Admin,
    Manager,
    Sales,
    Warehouse,
    Employee,
}

impl UserRole {
    pub fn as_str(&self) -> &str {
        match self {
            UserRole::Admin => "admin",
            UserRole::Manager => "manager",
            UserRole::Sales => "sales",
            UserRole::Warehouse => "warehouse",
            UserRole::Employee => "employee",
        }
    }

    pub fn from_str(s: &str) -> Option<Self> {
        match s {
            "admin" => Some(UserRole::Admin),
            "manager" => Some(UserRole::Manager),
            "sales" => Some(UserRole::Sales),
            "warehouse" => Some(UserRole::Warehouse),
            "employee" => Some(UserRole::Employee),
            _ => None,
        }
    }
}
