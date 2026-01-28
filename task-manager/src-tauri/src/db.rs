use anyhow::Result;
use chrono::Utc;
use rusqlite::{Connection, params};
use std::sync::Mutex;
use uuid::Uuid;

use crate::models::{Task, TaskStatus, CreateTaskInput, UpdateTaskInput};

pub struct Database {
    conn: Mutex<Connection>,
}

impl Database {
    pub fn new(db_path: &str) -> Result<Self> {
        let conn = Connection::open(db_path)?;
        
        conn.execute(
            "CREATE TABLE IF NOT EXISTS tasks (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                description TEXT,
                status TEXT NOT NULL,
                priority INTEGER NOT NULL,
                due_date TEXT,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL,
                tags TEXT
            )",
            [],
        )?;

        Ok(Database {
            conn: Mutex::new(conn),
        })
    }

    pub fn create_task(&self, input: CreateTaskInput) -> Result<Task> {
        let conn = self.conn.lock().unwrap();
        let now = Utc::now().to_rfc3339();
        let id = Uuid::new_v4().to_string();
        let tags = input.tags.unwrap_or_default();
        let tags_json = serde_json::to_string(&tags)?;

        let task = Task {
            id: id.clone(),
            title: input.title,
            description: input.description,
            status: TaskStatus::Todo,
            priority: input.priority,
            due_date: input.due_date,
            created_at: now.clone(),
            updated_at: now,
            tags,
        };

        conn.execute(
            "INSERT INTO tasks (id, title, description, status, priority, due_date, created_at, updated_at, tags)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)",
            params![
                &task.id,
                &task.title,
                &task.description,
                task.status.as_str(),
                &task.priority,
                &task.due_date,
                &task.created_at,
                &task.updated_at,
                &tags_json,
            ],
        )?;

        Ok(task)
    }

    pub fn get_all_tasks(&self) -> Result<Vec<Task>> {
        let conn = self.conn.lock().unwrap();
        let mut stmt = conn.prepare(
            "SELECT id, title, description, status, priority, due_date, created_at, updated_at, tags 
             FROM tasks 
             ORDER BY priority DESC, created_at DESC"
        )?;

        let tasks = stmt
            .query_map([], |row| {
                let tags_json: String = row.get(8)?;
                let tags: Vec<String> = serde_json::from_str(&tags_json).unwrap_or_default();
                
                Ok(Task {
                    id: row.get(0)?,
                    title: row.get(1)?,
                    description: row.get(2)?,
                    status: TaskStatus::from_str(&row.get::<_, String>(3)?),
                    priority: row.get(4)?,
                    due_date: row.get(5)?,
                    created_at: row.get(6)?,
                    updated_at: row.get(7)?,
                    tags,
                })
            })?
            .collect::<Result<Vec<Task>, _>>()?;

        Ok(tasks)
    }

    pub fn get_task_by_id(&self, id: &str) -> Result<Option<Task>> {
        let conn = self.conn.lock().unwrap();
        let mut stmt = conn.prepare(
            "SELECT id, title, description, status, priority, due_date, created_at, updated_at, tags 
             FROM tasks WHERE id = ?1"
        )?;

        let mut rows = stmt.query(params![id])?;
        
        if let Some(row) = rows.next()? {
            let tags_json: String = row.get(8)?;
            let tags: Vec<String> = serde_json::from_str(&tags_json).unwrap_or_default();
            
            Ok(Some(Task {
                id: row.get(0)?,
                title: row.get(1)?,
                description: row.get(2)?,
                status: TaskStatus::from_str(&row.get::<_, String>(3)?),
                priority: row.get(4)?,
                due_date: row.get(5)?,
                created_at: row.get(6)?,
                updated_at: row.get(7)?,
                tags,
            }))
        } else {
            Ok(None)
        }
    }

    pub fn update_task(&self, id: &str, input: UpdateTaskInput) -> Result<Task> {
        // ✅ 先读取旧数据（内部会 lock 一次），读完立刻释放锁
        let task = self
            .get_task_by_id(id)?
            .ok_or_else(|| anyhow::anyhow!("Task not found"))?;

        let now = Utc::now().to_rfc3339();
        let title = input.title.unwrap_or(task.title);
        let description = input.description.or(task.description);
        let status = input.status.unwrap_or(task.status);
        let priority = input.priority.unwrap_or(task.priority);
        let due_date = input.due_date.or(task.due_date);
        let tags = input.tags.unwrap_or(task.tags);
        let tags_json = serde_json::to_string(&tags)?;

        // ✅ 再次 lock（第二次 lock 没问题，因为第一次已经释放）
        let conn = self
            .conn
            .lock()
            .map_err(|_| anyhow::anyhow!("DB mutex poisoned"))?;

        conn.execute(
            "UPDATE tasks
            SET title = ?1, description = ?2, status = ?3, priority = ?4,
                due_date = ?5, updated_at = ?6, tags = ?7
            WHERE id = ?8",
            params![
                &title,
                &description,
                status.as_str(),
                &priority,
                &due_date,
                &now,
                &tags_json,
                id,
            ],
        )?;

        Ok(Task {
            id: id.to_string(),
            title,
            description,
            status,
            priority,
            due_date,
            created_at: task.created_at,
            updated_at: now,
            tags,
        })
    }

    pub fn delete_task(&self, id: &str) -> Result<()> {
        let conn = self.conn.lock().unwrap();
        conn.execute("DELETE FROM tasks WHERE id = ?1", params![id])?;
        Ok(())
    }

    pub fn search_tasks(&self, query: &str) -> Result<Vec<Task>> {
        let conn = self.conn.lock().unwrap();
        let search_query = format!("%{}%", query);
        
        let mut stmt = conn.prepare(
            "SELECT id, title, description, status, priority, due_date, created_at, updated_at, tags 
             FROM tasks 
             WHERE title LIKE ?1 OR description LIKE ?1
             ORDER BY priority DESC, created_at DESC"
        )?;

        let tasks = stmt
            .query_map(params![&search_query], |row| {
                let tags_json: String = row.get(8)?;
                let tags: Vec<String> = serde_json::from_str(&tags_json).unwrap_or_default();
                
                Ok(Task {
                    id: row.get(0)?,
                    title: row.get(1)?,
                    description: row.get(2)?,
                    status: TaskStatus::from_str(&row.get::<_, String>(3)?),
                    priority: row.get(4)?,
                    due_date: row.get(5)?,
                    created_at: row.get(6)?,
                    updated_at: row.get(7)?,
                    tags,
                })
            })?
            .collect::<Result<Vec<Task>, _>>()?;

        Ok(tasks)
    }
}
