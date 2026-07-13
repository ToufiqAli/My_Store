import React from "react";
import { useState } from "react";
import { MoreHorizontal, Eye, Truck, XCircle, ChevronRight } from "lucide-react";
import { OrderStatusBadge, PaymentStatusBadge } from "./OrderStatusBadge";

const OrderRow = ({ order, onViewDetail, onShip, onCancel, index }) => {
  const [actionsOpen, setActionsOpen] = useState(false);

  return (
    <tr className="group border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors duration-150">
      {/* Checkbox */}
      <td className="py-3.5 px-4">
        <input
          type="checkbox"
          className="w-4 h-4 rounded border-gray-300 text-indigo-500 focus:ring-indigo-500/20 cursor-pointer"
        />
      </td>

      {/* Order ID */}
      <td className="py-3.5 px-4">
        <button
          onClick={() => onViewDetail(order)}
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          #{order.id}
        </button>
      </td>

      {/* Customer */}
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-3">
          <img
            src={order.customerAvatar}
            alt={order.customer}
            className="w-8 h-8 rounded-lg object-cover flex-shrink-0 ring-1 ring-gray-100"
          />
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">{order.customer}</p>
            <p className="text-xs text-gray-400 truncate">{order.email}</p>
          </div>
        </div>
      </td>

      {/* Products */}
      <td className="py-3.5 px-4">
        <div className="flex -space-x-2">
          {order.products.slice(0, 3).map((prod, i) => (
            <img
              key={i}
              src={prod.image}
              alt={prod.name}
              title={prod.name}
              className="w-8 h-8 rounded-lg object-cover ring-2 ring-white"
            />
          ))}
          {order.products.length > 3 && (
            <div className="w-8 h-8 rounded-lg bg-gray-100 ring-2 ring-white flex items-center justify-center text-[10px] font-bold text-gray-500">
              +{order.products.length - 3}
            </div>
          )}
        </div>
      </td>

      {/* Date */}
      <td className="py-3.5 px-4">
        <p className="text-sm text-gray-600 whitespace-nowrap">{order.date}</p>
        <p className="text-xs text-gray-400">{order.time}</p>
      </td>

      {/* Amount */}
      <td className="py-3.5 px-4">
        <p className="text-sm font-semibold text-gray-800">${order.amount.toFixed(2)}</p>
      </td>

      {/* Payment Status */}
      <td className="py-3.5 px-4">
        <PaymentStatusBadge status={order.paymentStatus} />
      </td>

      {/* Order Status */}
      <td className="py-3.5 px-4">
        <OrderStatusBadge status={order.orderStatus} />
      </td>

      {/* Actions */}
      <td className="py-3.5 px-4">
        <div className="relative">
          <button
            onClick={() => setActionsOpen(!actionsOpen)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
          >
            <MoreHorizontal size={16} />
          </button>

          {actionsOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setActionsOpen(false)} />
              <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-lg shadow-gray-200/50 py-1.5 z-20">
                <button
                  onClick={() => {
                    onViewDetail(order);
                    setActionsOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Eye size={14} className="text-gray-400" />
                  View Details
                </button>
                {order.orderStatus === "processing" && (
                  <button
                    onClick={() => {
                      onShip(order);
                      setActionsOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 transition-colors"
                  >
                    <Truck size={14} />
                    Mark as Shipped
                  </button>
                )}
                {order.orderStatus !== "cancelled" && order.orderStatus !== "delivered" && (
                  <button
                    onClick={() => {
                      onCancel(order);
                      setActionsOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-rose-500 hover:bg-rose-50 transition-colors"
                  >
                    <XCircle size={14} />
                    Cancel Order
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default OrderRow;