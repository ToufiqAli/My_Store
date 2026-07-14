import React from "react";
import { Users, Eye, ShoppingCart, CreditCard, Package } from "lucide-react";

const steps = [
  { label: "Visitors", value: 24500, icon: Users, color: "bg-sky-500" },
  { label: "Product Views", value: 18200, icon: Eye, color: "bg-indigo-500" },
  { label: "Added to Cart", value: 5400, icon: ShoppingCart, color: "bg-amber-500" },
  { label: "Checkout", value: 3200, icon: CreditCard, color: "bg-purple-500" },
  { label: "Purchased", value: 2100, icon: Package, color: "bg-emerald-500" },
];

const ConversionFunnel = () => {
  const maxVal = steps[0].value;

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 lg:p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-gray-800">Conversion Funnel</h3>
          <p className="text-sm text-gray-400 mt-0.5">Visitor to customer journey</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-emerald-600">8.57%</p>
          <p className="text-[11px] text-gray-400">Overall Rate</p>
        </div>
      </div>

      <div className="space-y-2.5">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const widthPercent = (step.value / maxVal) * 100;
          const dropOff = i > 0 ? ((1 - step.value / steps[i - 1].value) * 100).toFixed(1) : null;

          return (
            <div key={step.label} className="group">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Icon size={14} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">{step.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {dropOff && (
                    <span className="text-[11px] text-rose-500 font-medium">-{dropOff}%</span>
                  )}
                  <span className="text-sm font-bold text-gray-800">
                    {step.value >= 1000 ? `${(step.value / 1000).toFixed(1)}k` : step.value}
                  </span>
                </div>
              </div>
              <div className="w-full h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                <div
                  className={`h-full ${step.color} rounded-lg transition-all duration-700 ease-out flex items-center justify-end pr-2`}
                  style={{ width: `${widthPercent}%` }}
                >
                  {widthPercent > 15 && (
                    <span className="text-[11px] font-bold text-white/90">
                      {((step.value / maxVal) * 100).toFixed(0)}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConversionFunnel;