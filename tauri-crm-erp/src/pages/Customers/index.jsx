import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // 模拟加载数据
    setTimeout(() => {
      setCustomers([
        { id: 1, name: '张三公司', contact: '张三', phone: '13800138000', level: 'vip', status: 'active' },
        { id: 2, name: '李四企业', contact: '李四', phone: '13800138001', level: 'important', status: 'active' },
        { id: 3, name: '王五集团', contact: '王五', phone: '13800138002', level: 'normal', status: 'active' },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const levelColors = {
    vip: 'badge-danger',
    important: 'badge-warning',
    normal: 'badge-gray'
  };

  const levelText = {
    vip: 'VIP客户',
    important: '重要客户',
    normal: '普通客户'
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          客户管理
        </h1>
        <button className="btn btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          添加客户
        </button>
      </div>

      {/* 搜索和筛选 */}
      <div className="card p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索客户名称、联系人、电话..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
          <select className="input w-48">
            <option value="">全部等级</option>
            <option value="vip">VIP客户</option>
            <option value="important">重要客户</option>
            <option value="normal">普通客户</option>
          </select>
        </div>
      </div>

      {/* 客户列表 */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  客户名称
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  联系人
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  联系电话
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  客户等级
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  状态
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    加载中...
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    暂无客户数据
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">
                      {customer.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {customer.contact}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {customer.phone}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`badge ${levelColors[customer.level]}`}>
                        {levelText[customer.level]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="badge badge-success">
                        正常
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button className="p-2 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-900/20 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
