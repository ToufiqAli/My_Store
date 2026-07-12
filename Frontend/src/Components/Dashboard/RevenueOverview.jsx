import React, { useState } from "react";
import { CalendarDays, Download } from "lucide-react";

const RevenueOverview = () => {
  const [activeTab, setActiveTab] = useState("weekly");

  const tabs = [
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" },
  ];

  // Weekly data points
  const weeklyData = [
    { label: "Mon", value: 1200 },
    { label: "Tue", value: 1800 },
    { label: "Wed", value: 1400 },
    { label: "Thu", value: 2200 },
    { label: "Fri", value: 1900 },
    { label: "Sat", value: 2800 },
    { label: "Sun", value: 2400 },
  ];

  const monthlyData = [
    { label: "Jan", value: 4200 },
    { label: "Feb", value: 3800 },
    { label: "Mar", value: 5100 },
    { label: "Apr", value: 4600 },
    { label: "May", value: 5800 },
    { label: "Jun", value: 6200 },
    { label: "Jul", value: 5900 },
    { label: "Aug", value: 7100 },
    { label: "Sep", value: 6800 },
    { label: "Oct", value: 7500 },
    { label: "Nov", value: 8200 },
    { label: "Dec", value: 9100 },
  ];

  const yearlyData = [
    { label: "2019", value: 28000 },
    { label: "2020", value: 35000 },
    { label: "2021", value: 42000 },
    { label: "2022", value: 55000 },
    { label: "2023", value: 68000 },
    { label: "2024", value: 82000 },
  ];

  const dataMap = { weekly: weeklyData, monthly: monthlyData, yearly: yearlyData };
  const data = dataMap[activeTab];

  const maxVal = Math.max(...data.map((d) => d.value));
  const minVal = Math.min(...data.map((d) => d.value));
  const range = maxVal - minVal || 1;

  const chartW = 600;
  const chartH = 240;
  const padX = 10;
  const padY = 20;
  const plotW = chartW - padX * 2;
  const plotH = chartH - padY * 2;

  const points = data.map((d, i) => ({
    x: padX + (i / (data.length - 1)) * plotW,
    y: padY + plotH - ((d.value - minVal) / range) * plotH,
    ...d,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartH - padY} L ${points[0].x} ${chartH - padY} Z`;

  const gridLines = 4;
  const gridYValues = Array.from({ length: gridLines + 1 }, (_, i) => {
    const val = minVal + (range * i) / gridLines;
    return {
      y: padY + plotH - (i / gridLines) * plotH,
      label: val >= 1000 ? `$${(val / 1000).toFixed(1)}k` : `$${val}`,
    };
  });

  const totalRevenue = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base font-semibold text-gray-800">Revenue Overview</h3>
          <p className="text-sm text-gray-400 mt-0.5">
            Total: <span className="text-gray-600 font-medium">${totalRevenue.toLocaleString()}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-lg p-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                  activeTab === tab.value
                    ? "bg-white text-gray-800 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* Download */}
          <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
            <Download size={16} />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${chartW} ${chartH}`}
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.01" />
            </linearGradient>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>

          {/* Grid Lines */}
          {gridYValues.map((g, i) => (
            <g key={i}>
              <line
                x1={padX}
                y1={g.y}
                x2={chartW - padX}
                y2={g.y}
                stroke="#f1f5f9"
                strokeWidth="1"
              />
              <text
                x={padX - 2}
                y={g.y + 4}
                textAnchor="end"
                className="text-[9px] fill-gray-400"
                fontSize="9"
              >
                {g.label}
              </text>
            </g>
          ))}

          {/* Area Fill */}
          <path d={areaPath} fill="url(#areaGrad)" />

          {/* Line */}
          <path d={linePath} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Data Points */}
          {points.map((p, i) => (
            <g key={i} className="cursor-pointer">
              <circle cx={p.x} cy={p.y} r="12" fill="transparent" />
              <circle
                cx={p.x}
                cy={p.y}
                r="4"
                fill="white"
                stroke="#6366f1"
                strokeWidth="2"
                className="transition-all duration-150 hover:r-6 hover:stroke-opacity-50"
              />
            </g>
          ))}

          {/* X Labels */}
          {points.map((p, i) => (
            <text
              key={i}
              x={p.x}
              y={chartH - 2}
              textAnchor="middle"
              className="text-[9px] fill-gray-400"
              fontSize="9"
            >
              {p.label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default RevenueOverview;