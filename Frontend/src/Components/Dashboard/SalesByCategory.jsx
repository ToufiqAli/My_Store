import React from "react";

const SalesByCategory = () => {
  const categories = [
    { label: "T-Shirts", percentage: 38, color: "#6366f1", amount: "$3,420" },
    { label: "Jeans", percentage: 26, color: "#8b5cf6", amount: "$2,340" },
    { label: "Sneakers", percentage: 22, color: "#a78bfa", amount: "$1,980" },
    { label: "Accessories", percentage: 14, color: "#c4b5fd", amount: "$1,260" },
  ];

  const total = categories.reduce((sum, c) => sum + c.percentage, 0);

  // Donut chart calculations
  const cx = 80;
  const cy = 80;
  const outerR = 70;
  const innerR = 48;

  let cumulativeAngle = -90; // Start from top

  const segments = categories.map((cat) => {
    const angle = (cat.percentage / total) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1Outer = cx + outerR * Math.cos(startRad);
    const y1Outer = cy + outerR * Math.sin(startRad);
    const x2Outer = cx + outerR * Math.cos(endRad);
    const y2Outer = cy + outerR * Math.sin(endRad);

    const x1Inner = cx + innerR * Math.cos(endRad);
    const y1Inner = cy + innerR * Math.sin(endRad);
    const x2Inner = cx + innerR * Math.cos(startRad);
    const y2Inner = cy + innerR * Math.sin(startRad);

    const largeArc = angle > 180 ? 1 : 0;

    const path = [
      `M ${x1Outer} ${y1Outer}`,
      `A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2Outer} ${y2Outer}`,
      `L ${x1Inner} ${y1Inner}`,
      `A ${innerR} ${innerR} 0 ${largeArc} 0 ${x2Inner} ${y2Inner}`,
      "Z",
    ].join(" ");

    cumulativeAngle = endAngle;

    return { ...cat, path };
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 lg:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-gray-800">Sales by Category</h3>
          <p className="text-sm text-gray-400 mt-0.5">This month breakdown</p>
        </div>
        <button className="text-xs text-indigo-500 font-medium hover:text-indigo-600 transition-colors">
          View All
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Donut Chart */}
        <div className="relative flex-shrink-0">
          <svg width="160" height="160" viewBox="0 0 160 160">
            {/* Background circle */}
            <circle cx={cx} cy={cy} r={outerR} fill="none" stroke="#f1f5f9" strokeWidth="1" />

            {segments.map((seg, i) => (
              <path
                key={i}
                d={seg.path}
                fill={seg.color}
                className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                style={{
                  transformOrigin: `${cx}px ${cy}px`,
                }}
              >
                <title>{seg.label}: {seg.percentage}%</title>
              </path>
            ))}

            {/* Center Text */}
            <text x={cx} y={cy - 6} textAnchor="middle" className="fill-gray-800" fontSize="20" fontWeight="700">
              $9K
            </text>
            <text x={cx} y={cy + 12} textAnchor="middle" className="fill-gray-400" fontSize="10" fontWeight="500">
              Total Sales
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full space-y-4">
          {categories.map((cat, i) => (
            <div key={i} className="group flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0 ring-2 ring-offset-1 ring-transparent group-hover:ring-gray-200 transition-all duration-200"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-sm text-gray-600 font-medium">{cat.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-800">{cat.percentage}%</span>
                <span className="text-xs text-gray-400 w-16 text-right">{cat.amount}</span>
              </div>
            </div>
          ))}

          {/* Progress Bars */}
          <div className="space-y-2.5 pt-2">
            {categories.map((cat, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[11px] text-gray-400 w-20 truncate">{cat.label}</span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${cat.percentage}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesByCategory;