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
