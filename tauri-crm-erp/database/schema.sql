-- ============================================
-- 企业级 CRM/ERP 系统数据库初始化脚本
-- 数据库: SQLite3
-- 版本: 1.0.0
-- 创建日期: 2026-01-30
-- ============================================

-- ============================================
-- 1. 用户与权限表
-- ============================================

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,               -- 登录用户名
    password_hash TEXT NOT NULL,                 -- 密码哈希 (bcrypt)
    full_name TEXT NOT NULL,                     -- 用户真实姓名
    email TEXT,                                  -- 邮箱
    phone TEXT,                                  -- 联系电话
    role TEXT NOT NULL DEFAULT 'employee',       -- 角色: admin/manager/sales/warehouse/employee
    avatar_path TEXT,                            -- 头像路径
    status TEXT NOT NULL DEFAULT 'active',       -- 状态: active/inactive
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    last_login_at TEXT
);

-- 用户表索引
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);

-- 权限表
CREATE TABLE IF NOT EXISTS permissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role TEXT NOT NULL,                          -- 角色名称
    module TEXT NOT NULL,                        -- 模块名: customer/sales/inventory/analytics/system
    can_view INTEGER NOT NULL DEFAULT 0,         -- 查看权限 (0/1)
    can_create INTEGER NOT NULL DEFAULT 0,       -- 创建权限 (0/1)
    can_update INTEGER NOT NULL DEFAULT 0,       -- 更新权限 (0/1)
    can_delete INTEGER NOT NULL DEFAULT 0        -- 删除权限 (0/1)
);

-- 权限表唯一索引
CREATE UNIQUE INDEX IF NOT EXISTS idx_permissions_role_module ON permissions(role, module);

-- ============================================
-- 2. 客户管理表
-- ============================================

-- 客户表
CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,                          -- 客户名称
    contact_person TEXT,                         -- 联系人
    phone TEXT,                                  -- 联系电话
    email TEXT,                                  -- 邮箱
    address TEXT,                                -- 地址
    industry TEXT,                               -- 所属行业
    customer_level TEXT NOT NULL DEFAULT 'normal', -- 客户等级: vip/important/normal
    assigned_to INTEGER,                         -- 负责人ID (外键 users.id)
    tags TEXT,                                   -- 标签 (JSON 数组字符串)
    status TEXT NOT NULL DEFAULT 'active',       -- 状态: active/inactive
    created_by INTEGER NOT NULL,                 -- 创建人ID
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    FOREIGN KEY (assigned_to) REFERENCES users(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- 客户表索引
CREATE INDEX IF NOT EXISTS idx_customers_name ON customers(name);
CREATE INDEX IF NOT EXISTS idx_customers_assigned_to ON customers(assigned_to);
CREATE INDEX IF NOT EXISTS idx_customers_level ON customers(customer_level);
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(status);

-- 客户跟进记录表
CREATE TABLE IF NOT EXISTS customer_followups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,                -- 客户ID (外键)
    followup_time TEXT NOT NULL,                 -- 跟进时间
    content TEXT NOT NULL,                       -- 跟进内容
    result TEXT,                                 -- 跟进结果
    next_followup_time TEXT,                     -- 下次跟进时间
    created_by INTEGER NOT NULL,                 -- 跟进人ID
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- 跟进记录表索引
CREATE INDEX IF NOT EXISTS idx_followups_customer ON customer_followups(customer_id);
CREATE INDEX IF NOT EXISTS idx_followups_time ON customer_followups(followup_time);
CREATE INDEX IF NOT EXISTS idx_followups_created_by ON customer_followups(created_by);

-- ============================================
-- 3. 产品管理表
-- ============================================

-- 产品表
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,                          -- 产品名称
    sku TEXT UNIQUE NOT NULL,                    -- 产品编码
    category TEXT,                               -- 产品分类
    specification TEXT,                          -- 规格
    unit TEXT NOT NULL DEFAULT '件',             -- 单位
    price REAL NOT NULL DEFAULT 0,               -- 销售单价
    cost_price REAL NOT NULL DEFAULT 0,          -- 成本价
    stock_quantity INTEGER NOT NULL DEFAULT 0,   -- 当前库存数量
    stock_warning_threshold INTEGER NOT NULL DEFAULT 10, -- 库存预警阈值
    image_path TEXT,                             -- 产品图片路径
    description TEXT,                            -- 产品描述
    status TEXT NOT NULL DEFAULT 'active',       -- 状态: active/inactive
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
);

-- 产品表索引
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);

-- ============================================
-- 4. 销售管理表
-- ============================================

-- 报价单表
CREATE TABLE IF NOT EXISTS quotes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    quote_no TEXT UNIQUE NOT NULL,               -- 报价单号
    customer_id INTEGER NOT NULL,                -- 客户ID (外键)
    total_amount REAL NOT NULL DEFAULT 0,        -- 总金额
    valid_until TEXT NOT NULL,                   -- 有效期至
    status TEXT NOT NULL DEFAULT 'draft',        -- 状态: draft/sent/accepted/rejected
    notes TEXT,                                  -- 备注
    created_by INTEGER NOT NULL,                 -- 创建人ID
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- 报价单表索引
CREATE INDEX IF NOT EXISTS idx_quotes_no ON quotes(quote_no);
CREATE INDEX IF NOT EXISTS idx_quotes_customer ON quotes(customer_id);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at);

-- 报价单明细表
CREATE TABLE IF NOT EXISTS quote_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    quote_id INTEGER NOT NULL,                   -- 报价单ID (外键)
    product_id INTEGER NOT NULL,                 -- 产品ID (外键)
    quantity INTEGER NOT NULL DEFAULT 1,         -- 数量
    unit_price REAL NOT NULL DEFAULT 0,          -- 单价
    subtotal REAL NOT NULL DEFAULT 0,            -- 小计
    FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 报价单明细表索引
CREATE INDEX IF NOT EXISTS idx_quote_items_quote ON quote_items(quote_id);
CREATE INDEX IF NOT EXISTS idx_quote_items_product ON quote_items(product_id);

-- 订单表
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_no TEXT UNIQUE NOT NULL,               -- 订单号
    customer_id INTEGER NOT NULL,                -- 客户ID (外键)
    quote_id INTEGER,                            -- 关联报价单ID
    total_amount REAL NOT NULL DEFAULT 0,        -- 订单总金额
    paid_amount REAL NOT NULL DEFAULT 0,         -- 已付金额
    status TEXT NOT NULL DEFAULT 'pending_payment', -- 状态: pending_payment/paid/shipped/completed/cancelled
    order_date TEXT NOT NULL DEFAULT (datetime('now', 'localtime')), -- 下单日期
    ship_date TEXT,                              -- 发货日期
    complete_date TEXT,                          -- 完成日期
    notes TEXT,                                  -- 备注
    created_by INTEGER NOT NULL,                 -- 创建人ID
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (quote_id) REFERENCES quotes(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- 订单表索引
CREATE INDEX IF NOT EXISTS idx_orders_no ON orders(order_no);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_date ON orders(order_date);
CREATE INDEX IF NOT EXISTS idx_orders_created_by ON orders(created_by);

-- 订单明细表
CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,                   -- 订单ID (外键)
    product_id INTEGER NOT NULL,                 -- 产品ID (外键)
    quantity INTEGER NOT NULL DEFAULT 1,         -- 数量
    unit_price REAL NOT NULL DEFAULT 0,          -- 单价
    subtotal REAL NOT NULL DEFAULT 0,            -- 小计
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 订单明细表索引
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items(product_id);

-- 回款记录表
CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,                   -- 订单ID (外键)
    amount REAL NOT NULL DEFAULT 0,              -- 回款金额
    payment_date TEXT NOT NULL DEFAULT (datetime('now', 'localtime')), -- 回款日期
    payment_method TEXT,                         -- 支付方式
    notes TEXT,                                  -- 备注
    created_by INTEGER NOT NULL,                 -- 记录人ID
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- 回款记录表索引
CREATE INDEX IF NOT EXISTS idx_payments_order ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_date ON payments(payment_date);

-- ============================================
-- 5. 库存管理表
-- ============================================

-- 库存出入库记录表
CREATE TABLE IF NOT EXISTS stock_movements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,                 -- 产品ID (外键)
    movement_type TEXT NOT NULL,                 -- 类型: in/out/adjust
    quantity INTEGER NOT NULL DEFAULT 0,         -- 数量 (入库为正，出库为负)
    reference_type TEXT,                         -- 关联类型: order/return/adjust/manual
    reference_id INTEGER,                        -- 关联ID
    notes TEXT,                                  -- 备注
    created_by INTEGER NOT NULL,                 -- 操作人ID
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- 库存出入库记录表索引
CREATE INDEX IF NOT EXISTS idx_stock_movements_product ON stock_movements(product_id);
CREATE INDEX IF NOT EXISTS idx_stock_movements_type ON stock_movements(movement_type);
CREATE INDEX IF NOT EXISTS idx_stock_movements_date ON stock_movements(created_at);
CREATE INDEX IF NOT EXISTS idx_stock_movements_reference ON stock_movements(reference_type, reference_id);

-- ============================================
-- 6. 系统配置表
-- ============================================

-- 系统配置表
CREATE TABLE IF NOT EXISTS system_config (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    config_key TEXT UNIQUE NOT NULL,             -- 配置键
    config_value TEXT NOT NULL,                  -- 配置值
    description TEXT,                            -- 配置说明
    updated_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
);

-- 系统日志表
CREATE TABLE IF NOT EXISTS system_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,                             -- 用户ID
    action TEXT NOT NULL,                        -- 操作类型: login/create/update/delete
    module TEXT NOT NULL,                        -- 模块名称
    description TEXT NOT NULL,                   -- 操作描述
    ip_address TEXT,                             -- IP地址
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 系统日志表索引
CREATE INDEX IF NOT EXISTS idx_logs_user ON system_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_logs_action ON system_logs(action);
CREATE INDEX IF NOT EXISTS idx_logs_module ON system_logs(module);
CREATE INDEX IF NOT EXISTS idx_logs_date ON system_logs(created_at);

-- ============================================
-- 7. 初始化数据
-- ============================================

-- 插入默认管理员账号 (密码: admin123)
-- 注意: 实际使用时需要使用 bcrypt 哈希，这里仅为示例
INSERT OR IGNORE INTO users (id, username, password_hash, full_name, role, status) 
VALUES (1, 'admin', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5F0i0xFSYuR3C', '系统管理员', 'admin', 'active');

-- 插入默认权限配置
-- 管理员: 所有权限
INSERT OR IGNORE INTO permissions (role, module, can_view, can_create, can_update, can_delete) VALUES
('admin', 'customer', 1, 1, 1, 1),
('admin', 'sales', 1, 1, 1, 1),
('admin', 'inventory', 1, 1, 1, 1),
('admin', 'analytics', 1, 1, 1, 1),
('admin', 'system', 1, 1, 1, 1);

-- 销售经理: 客户、销售、统计权限
INSERT OR IGNORE INTO permissions (role, module, can_view, can_create, can_update, can_delete) VALUES
('manager', 'customer', 1, 1, 1, 1),
('manager', 'sales', 1, 1, 1, 1),
('manager', 'inventory', 1, 0, 0, 0),
('manager', 'analytics', 1, 1, 0, 0),
('manager', 'system', 1, 0, 0, 0);

-- 销售员工: 客户、销售权限
INSERT OR IGNORE INTO permissions (role, module, can_view, can_create, can_update, can_delete) VALUES
('sales', 'customer', 1, 1, 1, 0),
('sales', 'sales', 1, 1, 1, 0),
('sales', 'inventory', 1, 0, 0, 0),
('sales', 'analytics', 1, 0, 0, 0),
('sales', 'system', 0, 0, 0, 0);

-- 库管员: 库存权限
INSERT OR IGNORE INTO permissions (role, module, can_view, can_create, can_update, can_delete) VALUES
('warehouse', 'customer', 0, 0, 0, 0),
('warehouse', 'sales', 1, 0, 0, 0),
('warehouse', 'inventory', 1, 1, 1, 1),
('warehouse', 'analytics', 1, 0, 0, 0),
('warehouse', 'system', 0, 0, 0, 0);

-- 普通员工: 仅查看权限
INSERT OR IGNORE INTO permissions (role, module, can_view, can_create, can_update, can_delete) VALUES
('employee', 'customer', 1, 0, 0, 0),
('employee', 'sales', 1, 0, 0, 0),
('employee', 'inventory', 1, 0, 0, 0),
('employee', 'analytics', 1, 0, 0, 0),
('employee', 'system', 0, 0, 0, 0);

-- 插入默认系统配置
INSERT OR IGNORE INTO system_config (config_key, config_value, description) VALUES
('company_name', '某某科技有限公司', '公司名称'),
('system_title', 'CRM/ERP 管理系统', '系统标题'),
('stock_warning_enabled', '1', '库存预警开关 (0/1)'),
('default_export_path', '', '默认报表导出路径'),
('theme', 'light', '主题模式 (light/dark)'),
('database_version', '1.0.0', '数据库版本');

-- ============================================
-- 8. 触发器 (自动更新 updated_at)
-- ============================================

-- 用户表更新触发器
CREATE TRIGGER IF NOT EXISTS update_users_timestamp 
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
    UPDATE users SET updated_at = datetime('now', 'localtime') WHERE id = NEW.id;
END;

-- 客户表更新触发器
CREATE TRIGGER IF NOT EXISTS update_customers_timestamp 
AFTER UPDATE ON customers
FOR EACH ROW
BEGIN
    UPDATE customers SET updated_at = datetime('now', 'localtime') WHERE id = NEW.id;
END;

-- 产品表更新触发器
CREATE TRIGGER IF NOT EXISTS update_products_timestamp 
AFTER UPDATE ON products
FOR EACH ROW
BEGIN
    UPDATE products SET updated_at = datetime('now', 'localtime') WHERE id = NEW.id;
END;

-- 报价单表更新触发器
CREATE TRIGGER IF NOT EXISTS update_quotes_timestamp 
AFTER UPDATE ON quotes
FOR EACH ROW
BEGIN
    UPDATE quotes SET updated_at = datetime('now', 'localtime') WHERE id = NEW.id;
END;

-- 订单表更新触发器
CREATE TRIGGER IF NOT EXISTS update_orders_timestamp 
AFTER UPDATE ON orders
FOR EACH ROW
BEGIN
    UPDATE orders SET updated_at = datetime('now', 'localtime') WHERE id = NEW.id;
END;

-- ============================================
-- 初始化完成
-- ============================================
