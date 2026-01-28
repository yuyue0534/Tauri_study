#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod db;
mod models;

use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            let app_dir = app.path().app_data_dir()
                .expect("Failed to get app data directory");
            
            std::fs::create_dir_all(&app_dir)
                .expect("Failed to create app data directory");
            
            let db_path = app_dir.join("tasks.db");
            let db_path_str = db_path.to_str()
                .expect("Failed to convert path to string");
            
            println!("Database path: {}", db_path_str);
            
            let database = db::Database::new(db_path_str)
                .expect("Failed to initialize database");
            
            app.manage(database);
            
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::create_task,
            commands::get_all_tasks,
            commands::get_task,
            commands::update_task,
            commands::delete_task,
            commands::search_tasks,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}