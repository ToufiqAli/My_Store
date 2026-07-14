import React from "react";
import { Globe, Search, Share2, Mail, Link2 } from "lucide-react";

const sources = [
  { label: "Organic Search", value: 42, icon: Search, color: "bg-indigo-500" },
  { label: "Direct", value: 28, icon: Globe, color: "bg-emerald-500" },
  { label: "Social Media", value: 18, icon: Share2, color: "bg-sky-500" },
  { label: "Email", value: 8, icon: Mail, color: "bg-amber-500" },
  { label: "Referral", value: 4, icon: Link2, color: "bg-purple-500" },
];

const TrafficSources = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 lg:p-6">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-gray-800">Traffic Sources</h3>
        <p className="text-sm text-gray-400 mt-0.5">Where your visitors come from</p>
      </div>

      {/* Donut Chart */}
      <div className="flex justify-center mb-6">
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            {sources.map((src, i) => {
              const offset = sources.slice(0, i).reduce((sum, s) => sum + s.value, 0);
              const dashArray = `${src.value} ${100 - src.value}`;
              const dashOffset = -offset;
              return (
                <circle
                  key={i}
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={dashArray}
                  strokeDashoffset={dashOffset}
                  className={src.color}
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-2xl font-bold text-gray-800">24.5k</p>
            <p className="text-[11px] text-gray-400">Total Visits</p>
          </div>
        </div>
      </div>

      {/* Source List */}
      <div className="space-y-3.5">
        {sources.map((src) => {
          const Icon = src.icon;
          return (
            <div key={src.label} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg ${src.color} bg-opacity-10 flex items-center justify-center flex-shrink-0`}>
                <Icon size={14} className={`${src.color.replace('bg-', 'text-')}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700 font-medium">{src.label}</span>
                  <span className="text-sm font-bold text-gray-800">{src.value}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${src.color} transition-all duration-700`}
                    style={{ width: `${src.value}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrafficSources;