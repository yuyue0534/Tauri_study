import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Package, 
  BarChart3, 
  Settings,
  ChevronLeft
} from 'lucide-react';
import clsx from 'clsx';

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: '仪表盘' },
  { path: '/customers', icon: Users, label: '客户管理' },
  { path: '/sales', icon: ShoppingCart, label: '销售管理' },
  { path: '/inventory', icon: Package, label: '库存管理' },
  { path: '/analytics', icon: BarChart3, label: '数据统计' },
  { path: '/settings', icon: Settings, label: '系统设置' },
];

/**
 * 侧边栏组件
 */
export default function Sidebar({ open, onToggle }) {
  return (
    <aside
      className={clsx(
        'bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300',
        open ? 'w-64' : 'w-20'
      )}
    >
      {/* Logo 区域 */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
        {open && (
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            CRM/ERP
          </h1>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronLeft
            className={clsx(
              'w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform',
              !open && 'rotate-180'
            )}
          />
        </button>
      </div>

      {/* 导航菜单 */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                )
              }
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {open && <span className="font-medium">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
