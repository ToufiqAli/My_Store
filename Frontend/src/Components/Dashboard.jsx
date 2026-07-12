import React from "react";
import StatCard from "./Dashboard/StatCard";
import RevenueOverview from "./Dashboard/RevenueOverview";
import SalesByCategory from "./Dashboard/SalesByCategory";
import { CalendarDays } from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "$0",
    change: 12.5,
    changeLabel: "vs last month",
    type: "revenue",
  },
  {
    title: "Total Orders",
    value: "0",
    change: 8.2,
    changeLabel: "vs last month",
    type: "orders",
  },
  {
    title: "New Customers",
    value: "0",
    change: 5.1,
    changeLabel: "vs last month",
    type: "customers",
  },
  {
    title: "Returns",
    value: "0",
    change: -3.4,
    changeLabel: "vs last month",
    type: "returns",
  },
];

const Dashboard = () => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">
              Welcome back! Here's what's happening with your store.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-500">
              <CalendarDays size={15} />
              <span>Jan 1 – Jan 31, 2025</span>
            </div>
            <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-xl transition-colors duration-150 shadow-sm shadow-indigo-200">
              Download Report
            </button>
          </div>
        </div>

        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-5">
          {/* Revenue Overview - Takes 2 columns */}
          <div className="xl:col-span-2">
            <RevenueOverview />
          </div>

          {/* Sales by Category - Takes 1 column */}
          <div className="xl:col-span-1">
            <SalesByCategory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;