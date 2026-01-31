#!/bin/bash

# 创建所有Rust模块定义文件
cd src-tauri/src

# models/mod.rs
cat > models/mod.rs << 'EOF'
pub mod common;
pub mod user;
pub mod customer;
EOF

# commands/mod.rs
cat > commands/mod.rs << 'EOF'
pub mod auth;
pub mod customer;
EOF

# database/mod.rs
cat > database/mod.rs << 'EOF'
pub mod connection;
EOF

# repositories/mod.rs
cat > repositories/mod.rs << 'EOF'
pub mod user_repo;
pub mod customer_repo;
EOF

# services/mod.rs
cat > services/mod.rs << 'EOF'
pub mod auth_service;
pub mod customer_service;
EOF

# utils/mod.rs
cat > utils/mod.rs << 'EOF'
pub mod crypto;
EOF

echo "Rust模块定义文件创建完成"
