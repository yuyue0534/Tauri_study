import React, { useState } from 'react';
import { Menu, Sun, Moon, Bell, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, useSettingsStore } from '../../../store';
import clsx from 'clsx';

/**
 * 顶部栏组件
 */
export default function Header({ onMenuClick }) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useSettingsStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
      {/* 左侧 */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors lg:hidden"
        >
          <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* 右侧 */}
      <div className="flex items-center gap-4">
        {/* 主题切换 */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title={theme === 'light' ? '切换到暗黑模式' : '切换到亮色模式'}
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>

        {/* 通知 */}
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full"></span>
        </button>

        {/* 用户菜单 */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
              <User className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="text-left hidden md:block">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {user?.full_name || '用户'}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {user?.role === 'admin' ? '管理员' : '员工'}
              </div>
            </div>
          </button>

          {/* 下拉菜单 */}
          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowUserMenu(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
                <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {user?.full_name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.email || '暂无邮箱'}
                  </div>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      navigate('/settings');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-left text-gray-700 dark:text-gray-300"
                  >
                    <User className="w-4 h-4" />
                    <span>个人设置</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-left text-danger-600 dark:text-danger-400"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>退出登录</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
