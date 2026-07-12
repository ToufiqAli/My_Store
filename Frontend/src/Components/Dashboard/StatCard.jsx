// ============================================
// 1. StatCard Component
// ============================================
import React from "react";
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, UserPlus, RotateCcw } from "lucide-react";

const iconMap = {
  revenue: DollarSign,
  orders: ShoppingBag,
  customers: UserPlus,
  returns: RotateCcw,
};

const iconBgMap = {
  revenue: "bg-indigo-50 text-indigo-500",
  orders: "bg-emerald-50 text-emerald-500",
  customers: "bg-amber-50 text-amber-500",
  returns: "bg-rose-50 text-rose-500",
};

const StatCard = ({ title, value, change, changeLabel, type = "revenue" }) => {
  const isPositive = change >= 0;
  const Icon = iconMap[type];
  const iconBg = iconBgMap[type];

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 hover:shadow-md hover:shadow-gray-200/50 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg} transition-transform duration-300 group-hover:scale-110`}>
          <Icon size={20} />
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
            isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          }`}
        >
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(change)}%
        </div>
      </div>

      <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
      <p className="text-2xl font-bold text-gray-800 tracking-tight">{value}</p>
      <p className="text-xs text-gray-400 mt-2">{changeLabel}</p>
    </div>
  );
};

export default StatCard;