import React, { useEffect, useState } from 'react';
import { 
  Users, 
  ShoppingCart, 
  Package, 
  TrendingUp,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { useAuthStore } from '../../store';

/**
 * 仪表盘页面
 */
export default function Dashboard() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    // 模拟加载统计数据
    // 实际应用中应该从后端API获取
    setStats({
      totalCustomers: 1234,
      totalOrders: 567,
      totalProducts: 890,
      totalRevenue: 1234567,
    });
  }, []);

  const statCards = [
    {
      title: '客户总数',
      value: stats.totalCustomers,
      icon: Users,
      color: 'primary',
      trend: '+12.5%',
      trendUp: true,
    },
    {
      title: '订单总数',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'success',
      trend: '+8.2%',
      trendUp: true,
    },
    {
      title: '产品总数',
      value: stats.totalProducts,
      icon: Package,
      color: 'warning',
      trend: '+3.1%',
      trendUp: true,
    },
    {
      title: '总营收',
      value: `¥${(stats.totalRevenue / 10000).toFixed(2)}万`,
      icon: TrendingUp,
      color: 'danger',
      trend: '+15.3%',
      trendUp: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* 欢迎信息 */}
      <div className="card p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          欢迎回来，{user?.full_name}！
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          这是您的数据概览，祝您工作愉快 🎉
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trendUp ? 'text-success-600' : 'text-danger-600'
                }`}>
                  {stat.trendUp ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  <span>{stat.trend}</span>
                </div>
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* 快速操作 */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          快速操作
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="btn btn-primary">
            <Users className="w-5 h-5 mr-2" />
            添加客户
          </button>
          <button className="btn btn-primary">
            <ShoppingCart className="w-5 h-5 mr-2" />
            创建订单
          </button>
          <button className="btn btn-primary">
            <Package className="w-5 h-5 mr-2" />
            添加产品
          </button>
        </div>
      </div>

      {/* 最近活动 */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          最近活动
        </h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white font-medium">
                  新客户注册
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  客户 #{item} 刚刚完成注册
                </p>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {item} 分钟前
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
