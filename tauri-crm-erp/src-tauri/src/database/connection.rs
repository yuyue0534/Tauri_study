use anyhow::{Context, Result};
use r2d2::Pool;
use r2d2_sqlite::SqliteConnectionManager;
use rusqlite::Connection;
use std::path::Path;

pub fn init_database(db_path: &str) -> Result<Pool<SqliteConnectionManager>> {
    log::info!("Initializing database at: {}", db_path);

    let db_exists = Path::new(db_path).exists();

    let manager = SqliteConnectionManager::file(db_path);
    let pool = Pool::builder().max_size(10).build(manager)?;

    if !db_exists {
        log::info!("Database does not exist, creating tables...");
        let conn = pool.get()?;
        init_schema(&conn)?;
        log::info("Database initialized successfully");
    }

    Ok(pool)
}

fn init_schema(conn: &Connection) -> Result<()> {
    let schema_sql = include_str!("../../../database/schema.sql");
    conn.execute_batch(schema_sql)?;
    Ok(())
}
