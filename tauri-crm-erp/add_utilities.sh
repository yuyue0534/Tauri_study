#!/bin/bash

# 创建前端工具函数
cd src

# utils/constants.js
cat > utils/constants.js << 'EOF'
// 客户等级
export const CUSTOMER_LEVELS = {
  VIP: 'vip',
  IMPORTANT: 'important',
  NORMAL: 'normal',
};

export const CUSTOMER_LEVEL_LABELS = {
  vip: 'VIP客户',
  important: '重要客户',
  normal: '普通客户',
};

// 状态
export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

// 用户角色
export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  SALES: 'sales',
  WAREHOUSE: 'warehouse',
  EMPLOYEE: 'employee',
};

export const ROLE_LABELS = {
  admin: '管理员',
  manager: '经理',
  sales: '销售',
  warehouse: '库管',
  employee: '员工',
};
EOF

# services导出文件
cat > services/index.js << 'EOF'
export { default as api } from './api';
export { authService } from './authService';
export { customerService } from './customerService';
EOF

# 创建公共SVG图标
mkdir -p assets/icons

# 创建简单的README
cd ../../
cat > src/README.md << 'EOF'
# 前端源代码

本目录包含所有React前端代码。

## 目录结构

- `components/` - React组件
- `pages/` - 页面组件
- `store/` - Zustand状态管理
- `services/` - API服务层
- `utils/` - 工具函数
- `routes/` - 路由配置
- `styles/` - 样式文件
EOF

cat > src-tauri/src/README.md << 'EOF'
# 后端源代码

本目录包含所有Rust后端代码。

## 目录结构

- `commands/` - Tauri命令层
- `services/` - 业务逻辑层
- `repositories/` - 数据访问层
- `models/` - 数据模型
- `database/` - 数据库管理
- `utils/` - 工具函数
EOF

echo "工具函数创建完成"
