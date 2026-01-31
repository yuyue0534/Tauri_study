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
