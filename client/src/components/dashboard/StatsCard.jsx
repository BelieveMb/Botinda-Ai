import React from "react";

export default function StatsCard({ title, value, change, icon, tabActive}) {
  return (
    <div className={` ${tabActive === 'commande' ? 'bg-gray-100' : 'transparent'}  rounded-lg p-4 shadow-sm flex items-center space-x-3 `}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${icon === 'commandes' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'}`}>
        {icon === 'commandes' ? '📦' : '🚚'}
      </div>
      <div>
        <p className="text-xs text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-700">{value}</p>
        <p className={`text-xs ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
        </p>
      </div>
    </div>
  );
}