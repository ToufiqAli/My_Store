
import React, { useState } from "react";

const SalesComparisonChart = () => {
  const [activeMetric, setActiveMetric] = useState("revenue");

  const metrics = [
    { label: "Revenue", value: "revenue" },
    { label: "Orders", value: "orders" },
  ];

  const currentData = [
    { label: "Jan", revenue: 4200, orders: 42 },
    { label: "Feb", revenue: 3800, orders: 38 },
    { label: "Mar", revenue: 5100, orders: 51 },
    { label: "Apr", revenue: 4600, orders: 46 },
    { label: "May", revenue: 5800, orders: 58 },
    { label: "Jun", revenue: 6200, orders: 62 },
    { label: "Jul", revenue: 5900, orders: 59 },
    { label: "Aug", revenue: 7100, orders: 71 },
    { label: "Sep", revenue: 6800, orders: 68 },
    { label: "Oct", revenue: 7500, orders: 75 },
    { label: "Nov", revenue: 8200, orders: 82 },
    { label: "Dec", revenue: 9100, orders: 91 },
  ];

  const previousData = [
    { label: "Jan", revenue: 3500, orders: 35 },
    { label: "Feb", revenue: 3200, orders: 32 },
    { label: "Mar", revenue: 4100, orders: 41 },
    { label: "Apr", revenue: 3900, orders: 39 },
    { label: "May", revenue: 4800, orders: 48 },
    { label: "Jun", revenue: 5200, orders: 52 },
    { label: "Jul", revenue: 4900, orders: 49 },
    { label: "Aug", revenue: 5800, orders: 58 },
    { label: "Sep", revenue: 5500, orders: 55 },
    { label: "Oct", revenue: 6200, orders: 62 },
    { label: "Nov", revenue: 7000, orders: 70 },
    { label: "Dec", revenue: 7800, orders: 78 },
  ];

  const chartW = 600;
  const chartH = 280;
  const padX = 10;
  const padY = 20;
  const plotW = chartW - padX * 2;
  const plotH = chartH - padY * 2;

  const getDataPoints = (data, key) => {
    const values = data.map((d) => d[key]);
    const min = Math.min(...values, 0);
    const max = Math.max(...values);
    const range = max - min || 1;
    return data.map((d, i) => ({
      x: padX + (i / (data.length - 1)) * plotW,
      y: padY + plotH - ((d[key] - min) / range) * plotH,
      val: d[key],
    }));
  };

  const currentPoints = getDataPoints(currentData, activeMetric);
  const previousPoints = getDataPoints(previousData, activeMetric);

  const toPath = (points) => points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const toArea = (points) => {
    const line = toPath(points);
    return `${line} L ${points[points.length - 1].x} ${chartH - padY} L ${points[0].x} ${chartH - padY} Z`;
  };

  const gridLines = 4;
  const allValues = [...currentData, ...previousData].map((d) => d[activeMetric]);
  const gMin = Math.min(...allValues, 0);
  const gMax = Math.max(...allValues);
  const gRange = gMax - gMin || 1;
  
  const gridY = Array.from({ length: gridLines + 1 }, (_, i) => {
    const val = gMin + (gRange * i) / gridLines;
    return {
      y: padY + plotH - (i / gridLines) * plotH,
      label: activeMetric === "revenue" ? `$${(val / 1000).toFixed(1)}k` : `${Math.round(val)}`,
    };
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base font-semibold text-gray-800">Sales Comparison</h3>
          <p className="text-sm text-gray-400 mt-0.5">Current vs Previous Period</p>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-0.5">
          {metrics.map((m) => (
            <button
              key={m.value}
              onClick={() => setActiveMetric(m.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                activeMetric === m.value ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="w-3 h-0.5 bg-indigo-500 rounded-full" /> Current
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="w-3 h-0.5 bg-gray-300 rounded-full border-dashed border-t border-gray-400" /> Previous
        </div>
      </div>

      <div className="relative w-full">
        <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="currAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {gridY.map((g, i) => (
            <g key={i}>
              <line x1={padX} y1={g.y} x2={chartW - padX} y2={g.y} stroke="#f1f5f9" strokeWidth="1" />
              <text x={padX - 2} y={g.y + 4} textAnchor="end" className="text-[9px] fill-gray-400" fontSize="9">{g.label}</text>
            </g>
          ))}

          {/* Previous Line (Dashed) */}
          <path d={toPath(previousPoints)} fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 4" strokeLinecap="round" />

          {/* Current Area */}
          <path d={toArea(currentPoints)} fill="url(#currAreaGrad)" />

          {/* Current Line */}
          <path d={toPath(currentPoints)} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Data Points Current */}
          {currentPoints.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="4" fill="white" stroke="#6366f1" strokeWidth="2" className="cursor-pointer" />
          ))}

          {/* X Labels */}
          {currentData.map((d, i) => {
            const x = padX + (i / (currentData.length - 1)) * plotW;
            return <text key={i} x={x} y={chartH - 2} textAnchor="middle" className="text-[9px] fill-gray-400" fontSize="9">{d.label}</text>;
          })}
        </svg>
      </div>
    </div>
  );
};

export default SalesComparisonChart;