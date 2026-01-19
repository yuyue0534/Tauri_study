// Prevents additional console window on Windows in release
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::State;

#[derive(Debug, Serialize, Deserialize, Clone)]
struct FormSchema {
    title: String,
    description: String,
    fields: Vec<Field>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct Field {
    id: String,
    #[serde(rename = "type")]
    field_type: String,
    label: String,
    required: bool,
    placeholder: Option<String>,
    options: Option<Vec<FieldOption>>,
    rows: Option<u32>,
    min: Option<f64>,
    max: Option<f64>,
    step: Option<f64>,
    #[serde(rename = "checkedText")]
    checked_text: Option<String>,
    #[serde(rename = "uncheckedText")]
    unchecked_text: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct FieldOption {
    label: String,
    value: String,
}

struct AppState {
    current_schema: Mutex<Option<FormSchema>>,
}

#[tauri::command]
fn save_schema_to_memory(schema: FormSchema, state: State<AppState>) -> Result<String, String> {
    let mut current = state.current_schema.lock().unwrap();
    *current = Some(schema);
    Ok("Schema saved to memory".to_string())
}

#[tauri::command]
fn get_schema_from_memory(state: State<AppState>) -> Result<Option<FormSchema>, String> {
    let current = state.current_schema.lock().unwrap();
    Ok(current.clone())
}

#[tauri::command]
fn validate_schema(schema: FormSchema) -> Result<bool, String> {
    if schema.fields.is_empty() {
        return Ok(false);
    }
    for field in &schema.fields {
        if field.id.is_empty() || field.label.is_empty() {
            return Ok(false);
        }
    }
    Ok(true)
}

#[tauri::command]
fn export_schema_json(schema: FormSchema) -> Result<String, String> {
    serde_json::to_string_pretty(&schema)
        .map_err(|e| format!("Failed to serialize schema: {}", e))
}

#[tauri::command]
fn import_schema_json(json_str: String) -> Result<FormSchema, String> {
    serde_json::from_str(&json_str)
        .map_err(|e| format!("Failed to parse schema: {}", e))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(AppState {
            current_schema: Mutex::new(None),
        })
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            save_schema_to_memory,
            get_schema_from_memory,
            validate_schema,
            export_schema_json,
            import_schema_json
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn main() {
    run();
}