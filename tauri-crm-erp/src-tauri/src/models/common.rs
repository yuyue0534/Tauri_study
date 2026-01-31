use serde::{Deserialize, Serialize};

/// 统一 API 响应结构
#[derive(Debug, Serialize, Deserialize)]
pub struct ApiResponse<T> {
    pub success: bool,
    pub data: Option<T>,
    pub error: Option<String>,
}

impl<T> ApiResponse<T> {
    /// 成功响应
    pub fn success(data: T) -> Self {
        Self {
            success: true,
            data: Some(data),
            error: None,
        }
    }

    /// 错误响应
    pub fn error(message: &str) -> Self {
        Self {
            success: false,
            data: None,
            error: Some(message.to_string()),
        }
    }
}

/// 空响应
#[derive(Debug, Serialize, Deserialize)]
pub struct EmptyResponse {}

/// 分页请求参数
#[derive(Debug, Serialize, Deserialize)]
pub struct PageRequest {
    pub page: u32,
    pub page_size: u32,
}

impl Default for PageRequest {
    fn default() -> Self {
        Self {
            page: 1,
            page_size: 20,
        }
    }
}

/// 分页响应数据
#[derive(Debug, Serialize, Deserialize)]
pub struct PageResponse<T> {
    pub items: Vec<T>,
    pub total: i64,
    pub page: u32,
    pub page_size: u32,
    pub total_pages: u32,
}

impl<T> PageResponse<T> {
    pub fn new(items: Vec<T>, total: i64, page: u32, page_size: u32) -> Self {
        let total_pages = ((total as f64) / (page_size as f64)).ceil() as u32;
        Self {
            items,
            total,
            page,
            page_size,
            total_pages,
        }
    }
}

/// ID 响应
#[derive(Debug, Serialize, Deserialize)]
pub struct IdResponse {
    pub id: i64,
}

/// 日期范围筛选
#[derive(Debug, Serialize, Deserialize)]
pub struct DateRange {
    pub start_date: Option<String>,
    pub end_date: Option<String>,
}

/// 通用筛选参数
#[derive(Debug, Serialize, Deserialize)]
pub struct FilterParams {
    pub search: Option<String>,
    pub status: Option<String>,
    pub date_range: Option<DateRange>,
}
