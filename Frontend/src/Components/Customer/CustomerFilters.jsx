import React, { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Download,
  Mail,
  UserPlus,
  X,
  ChevronDown,
} from "lucide-react";

const statusOptions = ["All", "Active", "Inactive", "VIP", "Blocked", "New"];
const segmentOptions = ["All", "Regular", "Wholesale", "Retail", "Corporate"];

const CustomerFilters = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  segmentFilter,
  onSegmentChange,
  showFilters,
  onToggleFilters,
  onClearFilters,
  onExport,
  onBulkEmail,
  onAddCustomer,
  resultCount,
  totalCount,
  selectedCount,
}) => {
  const [statusOpen, setStatusOpen] = useState(false);
  const [segmentOpen, setSegmentOpen] = useState(false);
  const hasActiveFilters = statusFilter !== "All" || segmentFilter !== "All" || searchQuery;

  return (
    <div className="space-y-3">
      {/* Main Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, email, phone, location..."
            className="w-full pl-9 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
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
        <Dropdown
          label="Status"
          value={statusFilter}
          open={statusOpen}
          onToggle={() => { setStatusOpen(!statusOpen); setSegmentOpen(false); }}
          onClose={() => setStatusOpen(false)}
          options={statusOptions}
          onChange={(v) => { onStatusChange(v); setStatusOpen(false); }}
        />

        {/* Filters Toggle */}
        <button
          onClick={onToggleFilters}
          className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm transition-all flex-shrink-0 ${
            showFilters || hasActiveFilters
              ? "bg-indigo-50 border-indigo-200 text-indigo-600"
              : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
          }`}
        >
          <SlidersHorizontal size={14} />
          <span className="hidden sm:inline">More Filters</span>
          {hasActiveFilters && (
            <span className="w-5 h-5 flex items-center justify-center bg-indigo-500 text-white text-[10px] font-bold rounded-full">!</span>
          )}
        </button>

        {/* Export */}
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-gray-300 transition-all flex-shrink-0"
        >
          <Download size={14} />
          <span className="hidden sm:inline">Export</span>
        </button>

        {/* Bulk Email */}
        <button
          onClick={onBulkEmail}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-gray-300 transition-all flex-shrink-0"
        >
          <Mail size={14} />
          <span className="hidden sm:inline">Email</span>
        </button>

        {/* Add Customer */}
        <button
          onClick={onAddCustomer}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-xl transition-colors shadow-sm shadow-indigo-200 flex-shrink-0"
        >
          <UserPlus size={16} />
          <span className="hidden sm:inline">Add Customer</span>
        </button>
      </div>

      {/* Extended Filters */}
      {showFilters && (
        <div className="flex flex-wrap items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <Dropdown
            label="Segment"
            value={segmentFilter}
            open={segmentOpen}
            onToggle={() => { setSegmentOpen(!segmentOpen); setStatusOpen(false); }}
            onClose={() => setSegmentOpen(false)}
            options={segmentOptions}
            onChange={(v) => { onSegmentChange(v); setSegmentOpen(false); }}
            compact
          />

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="ml-auto text-sm text-indigo-500 hover:text-indigo-600 font-medium transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing <span className="font-semibold text-gray-700">{resultCount}</span> of{" "}
          <span className="font-semibold text-gray-700">{totalCount}</span> customers
          {selectedCount > 0 && (
            <span className="ml-2 text-indigo-500 font-medium">({selectedCount} selected)</span>
          )}
        </p>
      </div>
    </div>
  );
};

const Dropdown = ({ label, value, open, onToggle, onClose, options, onChange, compact }) => {
  const sizeClasses = compact
    ? "px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg"
    : "px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm min-w-[130px] justify-between";

  return (
    <div className="relative">
      <button onClick={onToggle} className={`flex items-center gap-2 ${sizeClasses} hover:border-gray-300 transition-all`}>
        <span className="text-gray-500">{label}:</span>
        <span className="font-medium">{value}</span>
        <ChevronDown size={13} className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={onClose} />
          <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-xl shadow-lg shadow-gray-200/50 py-1 z-20 w-36">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => onChange(opt)}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                  value === opt ? "bg-indigo-50 text-indigo-600 font-medium" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerFilters;