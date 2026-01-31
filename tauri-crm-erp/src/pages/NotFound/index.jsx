import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-800 mb-4">
          404
        </h1>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          页面未找到
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          抱歉，您访问的页面不存在
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="btn btn-primary flex items-center gap-2 mx-auto"
        >
          <Home className="w-5 h-5" />
          返回首页
        </button>
      </div>
    </div>
  );
}
