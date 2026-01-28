import React from 'react';
import { AlertCircle } from 'lucide-react';

const priorityConfig = {
  5: { label: '紧急', color: 'bg-red-100 text-red-800', icon: 'text-red-600' },
  4: { label: '高', color: 'bg-orange-100 text-orange-800', icon: 'text-orange-600' },
  3: { label: '中', color: 'bg-yellow-100 text-yellow-800', icon: 'text-yellow-600' },
  2: { label: '低', color: 'bg-blue-100 text-blue-800', icon: 'text-blue-600' },
  1: { label: '很低', color: 'bg-gray-100 text-gray-800', icon: 'text-gray-600' },
};

export default function PriorityBadge({ priority, showIcon = true }) {
  const config = priorityConfig[priority] || priorityConfig[3];

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {showIcon && <AlertCircle className={`w-3 h-3 ${config.icon}`} />}
      {config.label}
    </span>
  );
}
