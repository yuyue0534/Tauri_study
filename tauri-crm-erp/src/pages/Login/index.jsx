import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Loader } from 'lucide-react';
import { useAuthStore } from '../../store';
import { authService } from '../../services/authService';

/**
 * 登录页面
 */
export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // 清除错误提示
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 表单验证
    if (!formData.username || !formData.password) {
      setError('请输入用户名和密码');
      return;
    }

    setLoading(true);

    try {
      // 调用登录 API
      const response = await authService.login(formData.username, formData.password);
      
      // 保存登录状态
      login(response.user, response.token);
      
      // 跳转到仪表盘
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || '登录失败，请检查用户名和密码');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-8">
      {/* Logo 和标题 */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
          <LogIn className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          CRM/ERP 管理系统
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          欢迎回来，请登录您的账号
        </p>
      </div>

      {/* 登录表单 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="label">
            用户名
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            className="input"
            placeholder="请输入用户名"
            autoComplete="username"
            autoFocus
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="password" className="label">
            密码
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="input"
            placeholder="请输入密码"
            autoComplete="current-password"
            disabled={loading}
          />
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="p-4 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg">
            <p className="text-sm text-danger-700 dark:text-danger-400">
              {error}
            </p>
          </div>
        )}

        {/* 提交按钮 */}
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>登录中...</span>
            </>
          ) : (
            <>
              <LogIn className="w-5 h-5" />
              <span>登录</span>
            </>
          )}
        </button>
      </form>

      {/* 底部提示 */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          默认账号: <span className="font-mono text-primary-600 dark:text-primary-400">admin</span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          默认密码: <span className="font-mono text-primary-600 dark:text-primary-400">admin123</span>
        </p>
      </div>

      {/* 版权信息 */}
      <div className="mt-8 text-center text-xs text-gray-400 dark:text-gray-600">
        © 2026 CRM/ERP 管理系统. All rights reserved.
      </div>
    </div>
  );
}
