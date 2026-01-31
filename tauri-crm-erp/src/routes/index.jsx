import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store';

// 布局组件
import AuthLayout from '../components/layout/AuthLayout';
import MainLayout from '../components/layout/MainLayout';

// 页面组件
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Customers from '../pages/Customers';
import Sales from '../pages/Sales';
import Inventory from '../pages/Inventory';
import Analytics from '../pages/Analytics';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';

/**
 * 受保护的路由组件
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

/**
 * 公开路由组件（已登录用户重定向到仪表盘）
 */
function PublicRoute({ children }) {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

/**
 * 应用路由配置
 */
export default function AppRouter() {
  return (
    <Routes>
      {/* 公开路由 */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <AuthLayout>
              <Login />
            </AuthLayout>
          </PublicRoute>
        }
      />

      {/* 受保护的路由 */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="customers" element={<Customers />} />
        <Route path="sales" element={<Sales />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* 404 页面 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
