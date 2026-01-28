use tauri::State;
use crate::db::Database;
use crate::models::{Task, CreateTaskInput, UpdateTaskInput};

#[tauri::command]
pub fn create_task(
    db: State<Database>,
    input: CreateTaskInput,
) -> Result<Task, String> {
    db.create_task(input)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_all_tasks(db: State<Database>) -> Result<Vec<Task>, String> {
    db.get_all_tasks()
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_task(db: State<Database>, id: String) -> Result<Option<Task>, String> {
    db.get_task_by_id(&id)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn update_task(
    db: State<Database>,
    id: String,
    input: UpdateTaskInput,
) -> Result<Task, String> {
    db.update_task(&id, input)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn delete_task(db: State<Database>, id: String) -> Result<(), String> {
    db.delete_task(&id)
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn search_tasks(db: State<Database>, query: String) -> Result<Vec<Task>, String> {
    db.search_tasks(&query)
        .map_err(|e| e.to_string())
}
