import React, { useState } from "react";
import { CalendarDays, Download, RefreshCw } from "lucide-react";
import AnalyticsStatCard from "./Analytics/AnalyticsStatCard";
import SalesComparisonChart from "./Analytics/SalesComparisonChart";
import TopProductsTable from "./Analytics/TopProductsTable";
import TrafficSources from "./Analytics/TrafficSources";
import GeoDeviceCards from "./Analytics/GeoDeviceCards";
import ConversionFunnel from "./Analytics/ConversionFunnel";
import { DollarSign, ShoppingBag, UserPlus, TrendingUp, BarChart3 } from "lucide-react";

const dateRanges = [
  { label: "7 Days", value: "7d" },
  { label: "30 Days", value: "30d" },
  { label: "90 Days", value: "90d" },
  { label: "12 Months", value: "12m" },
];

const AnalyticsPage = () => {
  const [activeRange, setActiveRange] = useState("12m");

  const kpiStats = [
    {
      title: "Total Revenue",
      value: "$74,200",
      change: 14.2,
      changeLabel: "vs previous period",
      icon: DollarSign,
      color: "indigo",
      sparkData: [30, 40, 35, 50, 49, 60, 70, 61, 80, 75, 82, 91],
    },
    {
      title: "Total Orders",
      value: "2,104",
      change: 8.5,
      changeLabel: "vs previous period",
      icon: ShoppingBag,
      color: "emerald",
      sparkData: [20, 25, 22, 30, 28, 35, 40, 38, 45, 42, 48, 51],
    },
    {
      title: "New Customers",
      value: "892",
      change: 5.1,
      changeLabel: "vs previous period",
      icon: UserPlus,
      color: "sky",
      sparkData: [10, 15, 12, 18, 16, 20, 25, 22, 28, 26, 30, 32],
    },
    {
      title: "Conversion Rate",
      value: "8.57%",
      change: -1.2,
      changeLabel: "vs previous period",
      icon: TrendingUp,
      color: "amber",
      sparkData: [9.1, 8.8, 9.0, 8.5, 8.9, 8.2, 8.7, 8.4, 8.9, 8.6, 8.5, 8.57],
    },
    {
      title: "Avg. Order Value",
      value: "$35.27",
      change: 4.8,
      changeLabel: "vs previous period",
      icon: BarChart3,
      color: "rose",
      sparkData: [30, 32, 31, 33, 34, 33, 35, 34, 36, 35, 35.5, 35.27],
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Analytics</h1>
            <p className="text-sm text-gray-400 mt-1">
              Track your store performance and customer behavior
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Date Range Tabs */}
            <div className="flex bg-gray-100 rounded-lg p-0.5">
              {dateRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setActiveRange(range.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                    activeRange === range.value
                      ? "bg-white text-gray-800 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
            
            <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-all" title="Refresh">
              <RefreshCw size={16} />
            </button>
            <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-all" title="Download Report">
              <Download size={16} />
            </button>
          </div>
        </div>

        {/* KPI Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5">
          {kpiStats.map((stat, i) => (
            <AnalyticsStatCard key={i} {...stat} />
          ))}
        </div>

        {/* Charts Row: Sales Comparison + Traffic Sources */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-5">
          <div className="xl:col-span-2">
            <SalesComparisonChart />
          </div>
          <div className="xl:col-span-1">
            <TrafficSources />
          </div>
        </div>

        {/* Top Products Table */}
        <TopProductsTable />

        {/* Conversion Funnel */}
        <ConversionFunnel />

        {/* Bottom Row: Devices + Geo */}
        <GeoDeviceCards />
      </div>
    </div>
  );
};

export default AnalyticsPage;