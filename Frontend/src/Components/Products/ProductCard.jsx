import React, { useState } from "react";
import {
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Copy,
  Star,
  StarOff,
  Package,
  ImageOff,
} from "lucide-react";

const stockLevelConfig = {
  in_stock: { label: "In Stock", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  low_stock: { label: "Low Stock", bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  out_of_stock: { label: "Out of Stock", bg: "bg-rose-50", text: "text-rose-700", dot: "bg-rose-500" },
};

const ProductCard = ({
  product,
  viewMode,
  onEdit,
  onDelete,
  onToggleFeatured,
  onDuplicate,
  onView,
}) => {
  const [imgError, setImgError] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const stock = stockLevelConfig[product.stockStatus] || stockLevelConfig.in_stock;

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-xl border border-gray-200/80 p-4 hover:shadow-md hover:shadow-gray-200/50 transition-all duration-200 group">
        <div className="flex items-center gap-4">
          {/* Image */}
          <div className="w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
            {imgError ? (
              <div className="w-full h-full flex items-center justify-center">
                <ImageOff size={20} className="text-gray-300" />
              </div>
            ) : (
              <img
                src={product.image}
                alt={product.name}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-gray-800 truncate">{product.name}</h4>
              {product.featured && <Star size={12} className="text-amber-400 fill-amber-400 flex-shrink-0" />}
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{product.sku} · {product.category}</p>
          </div>

          {/* Price */}
          <div className="text-right flex-shrink-0 hidden sm:block">
            <p className="text-sm font-bold text-gray-800">${product.price.toFixed(2)}</p>
            {product.comparePrice && (
              <p className="text-xs text-gray-400 line-through">${product.comparePrice.toFixed(2)}</p>
            )}
          </div>

          {/* Stock */}
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${stock.bg} ${stock.text} flex-shrink-0`}>
            <span className={`w-1.5 h-1.5 rounded-full ${stock.dot}`} />
            {stock.label}
          </span>

          {/* Quantity */}
          <div className="text-sm text-gray-600 w-16 text-center flex-shrink-0 hidden md:block">
            {product.quantity}
          </div>

          {/* Actions */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setActionsOpen(!actionsOpen)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
            >
              <MoreHorizontal size={16} />
            </button>
            {actionsOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setActionsOpen(false)} />
                <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-xl shadow-lg shadow-gray-200/50 py-1.5 z-20">
                  <ActionItem icon={Eye} label="View" onClick={() => { onView(product); setActionsOpen(false); }} />
                  <ActionItem icon={Pencil} label="Edit" onClick={() => { onEdit(product); setActionsOpen(false); }} />
                  <ActionItem icon={Copy} label="Duplicate" onClick={() => { onDuplicate(product); setActionsOpen(false); }} />
                  <ActionItem icon={product.featured ? StarOff : Star} label={product.featured ? "Unfeature" : "Feature"} onClick={() => { onToggleFeatured(product); setActionsOpen(false); }} />
                  <div className="my-1 border-t border-gray-100" />
                  <ActionItem icon={Trash2} label="Delete" danger onClick={() => { onDelete(product); setActionsOpen(false); }} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden hover:shadow-lg hover:shadow-gray-200/60 transition-all duration-300 group">
      {/* Image Section */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {imgError ? (
          <div className="w-full h-full flex items-center justify-center">
            <ImageOff size={40} className="text-gray-300" />
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
            <button
              onClick={() => onEdit(product)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-medium text-gray-700 hover:bg-white transition-colors"
            >
              <Pencil size={12} /> Edit
            </button>
            <button
              onClick={() => onDelete(product)}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-rose-500 hover:bg-white transition-colors"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.featured && (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-400 text-white text-[10px] font-bold rounded-md shadow-sm">
              <Star size={9} className="fill-white" /> Featured
            </span>
          )}
          {product.comparePrice && (
            <span className="px-2 py-0.5 bg-rose-500 text-white text-[10px] font-bold rounded-md shadow-sm">
              -{Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
            </span>
          )}
        </div>

        {/* Stock Badge */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold backdrop-blur-sm ${stock.bg} ${stock.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${stock.dot}`} />
            {stock.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="min-w-0">
            <p className="text-xs text-gray-400 mb-0.5">{product.category}</p>
            <h4 className="text-sm font-semibold text-gray-800 truncate group-hover:text-indigo-600 transition-colors">
              {product.name}
            </h4>
          </div>
          <button
            onClick={() => onToggleFeatured(product)}
            className={`p-1 rounded transition-colors flex-shrink-0 ${
              product.featured ? "text-amber-400" : "text-gray-300 hover:text-amber-400"
            }`}
          >
            <Star size={14} className={product.featured ? "fill-amber-400" : ""} />
          </button>
        </div>

        <p className="text-xs text-gray-400 mb-3">SKU: {product.sku}</p>

        <div className="flex items-end justify-between">
          <div>
            <span className="text-lg font-bold text-gray-800">${product.price.toFixed(2)}</span>
            {product.comparePrice && (
              <span className="ml-2 text-xs text-gray-400 line-through">${product.comparePrice.toFixed(2)}</span>
            )}
          </div>
          <span className="text-xs text-gray-400">
            <Package size={11} className="inline mr-1 -mt-0.5" />
            {product.quantity} left
          </span>
        </div>
      </div>
    </div>
  );
};

const ActionItem = ({ icon: Icon, label, danger, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors ${
      danger ? "text-rose-500 hover:bg-rose-50" : "text-gray-600 hover:bg-gray-50"
    }`}
  >
    <Icon size={14} className={danger ? "text-rose-400" : "text-gray-400"} />
    {label}
  </button>
);

export default ProductCard;