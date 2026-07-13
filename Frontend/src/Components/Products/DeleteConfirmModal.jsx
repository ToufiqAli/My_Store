import React from "react";
import { AlertTriangle, X, Trash2 } from "lucide-react";

const DeleteConfirmModal = ({ product, onClose, onConfirm }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-end">
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all">
            <X size={16} />
          </button>
        </div>

        <div className="text-center">
          <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={28} className="text-rose-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Delete Product?</h3>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Are you sure you want to delete <span className="font-semibold text-gray-700">"{product.name}"</span>?
            This action cannot be undone.
          </p>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(product)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium rounded-xl transition-colors shadow-sm shadow-rose-200"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
