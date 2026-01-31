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
