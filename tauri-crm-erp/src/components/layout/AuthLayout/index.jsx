import React from 'react';

/**
 * 认证布局（登录页等）
 */
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md animate-fade-in">
        {children}
      </div>
    </div>
  );
}
