import React, { useState } from "react";
import {
  Search,
  Filter,
  SlidersHorizontal,
  Download,
  Plus,
  X,
  ChevronDown,
  CalendarDays,
} from "lucide-react";

const statusOptions = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Returned"];
const paymentOptions = ["All", "Paid", "Unpaid", "Refunded", "Partial"];

const OrderFilters = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  paymentFilter,
  onPaymentChange,
  dateRange,
  onDateRangeChange,
  onExport,
  onNewOrder,
  resultCount,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  return (
    <div className="space-y-3">
      {/* Main Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by order ID, customer name, product..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Status Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setStatusOpen(!statusOpen);
              setPaymentOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-gray-300 transition-all min-w-[140px] justify-between"
          >
            <span className="flex items-center gap-2">
              <Filter size={14} className="text-gray-400" />
              {statusFilter}
            </span>
            <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${statusOpen ? "rotate-180" : ""}`} />
          </button>

          {statusOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setStatusOpen(false)} />
              <div className="absolute top-full mt-1 left-0 w-44 bg-white border border-gray-200 rounded-xl shadow-lg shadow-gray-200/50 py-1 z-20">
                {statusOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      onStatusChange(opt);
                      setStatusOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                      statusFilter === opt
                        ? "bg-indigo-50 text-indigo-600 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* More Filters Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm transition-all ${
            showFilters
              ? "bg-indigo-50 border-indigo-200 text-indigo-600"
              : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
          }`}
        >
          <SlidersHorizontal size={14} />
          <span className="hidden sm:inline">More Filters</span>
        </button>

        {/* Export */}
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-gray-300 transition-all"
        >
          <Download size={14} />
          <span className="hidden sm:inline">Export</span>
        </button>

        {/* New Order */}
        <button
          onClick={onNewOrder}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-xl transition-colors shadow-sm shadow-indigo-200"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">New Order</span>
        </button>
      </div>

      {/* Extended Filters Row */}
      {showFilters && (
        <div className="flex flex-wrap items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Payment Status */}
          <div className="relative">
            <button
              onClick={() => {
                setPaymentOpen(!paymentOpen);
                setStatusOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-gray-300 transition-all"
            >
              <span>Payment: {paymentFilter}</span>
              <ChevronDown size={12} className={`text-gray-400 transition-transform ${paymentOpen ? "rotate-180" : ""}`} />
            </button>
            {paymentOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setPaymentOpen(false)} />
                <div className="absolute top-full mt-1 left-0 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20">
                  {paymentOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        onPaymentChange(opt);
                        setPaymentOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-sm ${
                        paymentFilter === opt
                          ? "bg-indigo-50 text-indigo-600 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Date Range */}
          <div className="flex items-center gap-2">
            <CalendarDays size={14} className="text-gray-400" />
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => onDateRangeChange({ ...dateRange, from: e.target.value })}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
            />
            <span className="text-gray-400 text-sm">to</span>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => onDateRangeChange({ ...dateRange, to: e.target.value })}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
            />
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => {
              onSearchChange("");
              onStatusChange("All");
              onPaymentChange("All");
              onDateRangeChange({ from: "", to: "" });
              setShowFilters(false);
            }}
            className="ml-auto text-sm text-indigo-500 hover:text-indigo-600 font-medium transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing <span className="font-semibold text-gray-700">{resultCount}</span> orders
        </p>
      </div>
    </div>
  );
};

export default OrderFilters;