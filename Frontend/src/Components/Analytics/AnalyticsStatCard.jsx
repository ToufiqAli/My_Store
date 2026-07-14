import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const AnalyticsStatCard = ({ title, value, change, changeLabel, icon: Icon, color = "indigo", sparkData }) => {
  const isPositive = change >= 0;
  
  const colorMap = {
    indigo: { bg: "bg-indigo-50", text: "text-indigo-600", stroke: "#6366f1" },
    emerald: { bg: "bg-emerald-50", text: "text-emerald-600", stroke: "#10b981" },
    amber: { bg: "bg-amber-50", text: "text-amber-600", stroke: "#f59e0b" },
    rose: { bg: "bg-rose-50", text: "text-rose-600", stroke: "#f43f5e" },
    sky: { bg: "bg-sky-50", text: "text-sky-600", stroke: "#0ea5e9" },
  };

  const colors = colorMap[color] || colorMap.indigo;

  // Sparkline SVG calculations
  const sparkW = 80;
  const sparkH = 32;
  const min = Math.min(...sparkData);
  const max = Math.max(...sparkData);
  const range = max - min || 1;

  const points = sparkData.map((val, i) => {
    const x = (i / (sparkData.length - 1)) * sparkW;
    const y = sparkH - ((val - min) / range) * (sparkH - 4) - 2;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 hover:shadow-md hover:shadow-gray-200/50 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors.bg} transition-transform duration-300 group-hover:scale-110`}>
          <Icon size={20} className={colors.text} />
        </div>
        {/* Sparkline */}
        <div className="w-20 h-9">
          <svg viewBox={`0 0 ${sparkW} ${sparkH}`} className="w-full h-full">
            <polyline
              points={points}
              fill="none"
              stroke={colors.stroke}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
            />
          </svg>
        </div>
      </div>

      <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-gray-800 tracking-tight">{value}</p>
        <div
          className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
            isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          }`}
        >
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(change)}%
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-2">{changeLabel}</p>
    </div>
  );
};

export default AnalyticsStatCard;