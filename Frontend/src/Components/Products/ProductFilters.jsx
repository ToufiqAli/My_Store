import React, { useState } from "react";
import {
  Search,
  Grid3X3,
  List,
  SlidersHorizontal,
  Plus,
  X,
  ChevronDown,
  ArrowUpDown,
} from "lucide-react";

const categoryOptions = ["All", "T-Shirts", "Jeans", "Sneakers", "Accessories", "Hoodies", "Jackets"];
const stockOptions = ["All", "In Stock", "Low Stock", "Out of Stock"];
const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Price: Low → High", value: "price_asc" },
  { label: "Price: High → Low", value: "price_desc" },
  { label: "Name: A → Z", value: "name_asc" },
  { label: "Name: Z → A", value: "name_desc" },
  { label: "Stock: High → Low", value: "stock_desc" },
  { label: "Stock: Low → High", value: "stock_asc" },
];

const ProductFilters = ({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  stockFilter,
  onStockChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  showFilters,
  onToggleFilters,
  onClearFilters,
  onAddProduct,
  resultCount,
  totalCount,
}) => {
  const [sortOpen, setSortOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [stockOpen, setStockOpen] = useState(false);

  const hasActiveFilters = categoryFilter !== "All" || stockFilter !== "All" || searchQuery;

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
            placeholder="Search products by name, SKU..."
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

        {/* Category Dropdown */}
        <Dropdown
          label="Category"
          value={categoryFilter}
          open={catOpen}
          onToggle={() => { setCatOpen(!catOpen); setStockOpen(false); setSortOpen(false); }}
          onClose={() => setCatOpen(false)}
          options={categoryOptions}
          onChange={(v) => { onCategoryChange(v); setCatOpen(false); }}
        />

        {/* Sort Dropdown */}
        <Dropdown
          label="Sort"
          value={sortOptions.find((s) => s.value === sortBy)?.label || "Sort"}
          open={sortOpen}
          onToggle={() => { setSortOpen(!sortOpen); setCatOpen(false); setStockOpen(false); }}
          onClose={() => setSortOpen(false)}
          options={sortOptions.map((s) => s.label)}
          onChange={(v) => {
            const opt = sortOptions.find((s) => s.label === v);
            if (opt) onSortChange(opt.value);
            setSortOpen(false);
          }}
          icon={<ArrowUpDown size={13} className="text-gray-400" />}
        />

        {/* More Filters Toggle */}
        <button
          onClick={onToggleFilters}
          className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm transition-all flex-shrink-0 ${
            showFilters || hasActiveFilters
              ? "bg-indigo-50 border-indigo-200 text-indigo-600"
              : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
          }`}
        >
          <SlidersHorizontal size={14} />
          <span className="hidden sm:inline">Filters</span>
          {hasActiveFilters && (
            <span className="w-5 h-5 flex items-center justify-center bg-indigo-500 text-white text-[10px] font-bold rounded-full">
              !
            </span>
          )}
        </button>

        {/* View Mode Toggle */}
        <div className="flex bg-white border border-gray-200 rounded-xl p-0.5 flex-shrink-0">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`p-2 rounded-lg transition-all ${
              viewMode === "grid" ? "bg-gray-100 text-gray-700" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Grid3X3 size={16} />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`p-2 rounded-lg transition-all ${
              viewMode === "list" ? "bg-gray-100 text-gray-700" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <List size={16} />
          </button>
        </div>

        {/* Add Product */}
        <button
          onClick={onAddProduct}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-xl transition-colors shadow-sm shadow-indigo-200 flex-shrink-0"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Add Product</span>
        </button>
      </div>

      {/* Extended Filters */}
      {showFilters && (
        <div className="flex flex-wrap items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <Dropdown
            label="Stock Status"
            value={stockFilter}
            open={stockOpen}
            onToggle={() => { setStockOpen(!stockOpen); setCatOpen(false); setSortOpen(false); }}
            onClose={() => setStockOpen(false)}
            options={stockOptions}
            onChange={(v) => { onStockChange(v); setStockOpen(false); }}
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
          <span className="font-semibold text-gray-700">{totalCount}</span> products
        </p>
      </div>
    </div>
  );
};

// Reusable Dropdown
const Dropdown = ({ label, value, open, onToggle, onClose, options, onChange, icon, compact }) => {
  const sizeClasses = compact
    ? "px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg"
    : "px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm min-w-[140px] justify-between";

  return (
    <div className="relative">
      <button onClick={onToggle} className={`flex items-center gap-2 ${sizeClasses} hover:border-gray-300 transition-all`}>
        {icon || <span>{label}:</span>}
        <span className={compact ? "" : "font-medium"}>{value}</span>
        <ChevronDown size={13} className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={onClose} />
          <div className={`absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-xl shadow-lg shadow-gray-200/50 py-1 z-20 ${compact ? "w-36" : "w-48"}`}>
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

export default ProductFilters;