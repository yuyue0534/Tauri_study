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

// 全局应用状态
pub struct AppState {
    pub db_pool: Mutex<r2d2::Pool<r2d2_sqlite::SqliteConnectionManager>>,
}

fn main() {
    // 初始化日志
    env_logger::Builder::from_default_env()
        .filter_level(log::LevelFilter::Info)
        .init();

    tauri::Builder::default()
        .setup(|app| {
            log::info!("Initializing CRM/ERP application...");

            // 获取应用数据目录
            let app_dir = app
                .path()
                .app_data_dir()
                .expect("Failed to get app data directory");
            
            // 创建数据目录
            std::fs::create_dir_all(&app_dir).expect("Failed to create app data directory");
            
            // 初始化数据库
            let db_path = app_dir.join("crm_erp.db");
            log::info!("Database path: {:?}", db_path);
            
            let pool = init_database(&db_path.to_string_lossy())
                .expect("Failed to initialize database");

            // 设置全局状态
            app.manage(AppState {
                db_pool: Mutex::new(pool),
            });

            log::info!("Application initialized successfully");
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
        ])
        .run(tauri::generate_context!())
        .expect("Error while running Tauri application");
}
