import React, { useState } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown,ChevronRight} from "lucide-react";
import OrderRow from "./OrderRow";
import OrderStatusBadge from "./OrderStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";

const OrdersTable = ({
  orders,
  onViewDetail,
  onShip,
  onCancel,
}) => {
  const [sortField, setSortField] = useState("date");
  const [sortDir, setSortDir] = useState("desc");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronsUpDown size={13} className="text-gray-300" />;
    return sortDir === "asc" ? (
      <ChevronUp size={13} className="text-indigo-500" />
    ) : (
      <ChevronDown size={13} className="text-indigo-500" />
    );
  };

  const columns = [
    { key: "id", label: "Order ID", sortable: true, className: "w-[100px]" },
    { key: "customer", label: "Customer", sortable: true },
    { key: "products", label: "Products", sortable: false },
    { key: "date", label: "Date", sortable: true },
    { key: "amount", label: "Amount", sortable: true, className: "w-[100px]" },
    { key: "paymentStatus", label: "Payment", sortable: true },
    { key: "orderStatus", label: "Status", sortable: true },
    { key: "actions", label: "", sortable: false, className: "w-[50px]" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-3 px-4 w-10">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-indigo-500 focus:ring-indigo-500/20 cursor-pointer"
                />
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`py-3 px-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400 ${col.className || ""}`}
                >
                  {col.sortable ? (
                    <button
                      onClick={() => handleSort(col.key)}
                      className="flex items-center gap-1.5 hover:text-gray-600 transition-colors"
                    >
                      {col.label}
                      <SortIcon field={col.key} />
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <OrderRow
                key={order.id}
                order={order}
                index={i}
                onViewDetail={onViewDetail}
                onShip={onShip}
                onCancel={onCancel}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-gray-100">
        {orders.map((order, i) => (
          <MobileOrderCard
            key={order.id}
            order={order}
            onViewDetail={onViewDetail}
            onShip={onShip}
            onCancel={onCancel}
          />
        ))}
      </div>

      {/* Empty State */}
      {orders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
            <span className="text-2xl">📦</span>
          </div>
          <p className="text-sm font-medium text-gray-600">No orders found</p>
          <p className="text-xs text-gray-400 mt-1">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

// Mobile Card Sub-component
const MobileOrderCard = ({ order, onViewDetail, onShip, onCancel }) => {
  return (
    <div className="p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-indigo-600">#{order.id}</span>
          <OrderStatusBadge status={order.orderStatus} />
        </div>
        <span className="text-sm font-bold text-gray-800">${order.amount.toFixed(2)}</span>
      </div>

      {/* Customer */}
      <div className="flex items-center gap-3">
        <img src={order.customerAvatar} alt="" className="w-8 h-8 rounded-lg object-cover" />
        <div>
          <p className="text-sm font-medium text-gray-800">{order.customer}</p>
          <p className="text-xs text-gray-400">{order.date} · {order.time}</p>
        </div>
      </div>

      {/* Products */}
      <div className="flex -space-x-2">
        {order.products.slice(0, 4).map((prod, i) => (
          <img key={i} src={prod.image} alt="" className="w-8 h-8 rounded-lg object-cover ring-2 ring-white" />
        ))}
        {order.products.length > 4 && (
          <div className="w-8 h-8 rounded-lg bg-gray-100 ring-2 ring-white flex items-center justify-center text-[10px] font-bold text-gray-500">
            +{order.products.length - 4}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1">
        <PaymentStatusBadge status={order.paymentStatus} />
        <button
          onClick={() => onViewDetail(order)}
          className="text-xs text-indigo-500 font-medium hover:text-indigo-600 flex items-center gap-1 transition-colors"
        >
          View Details <ChevronRight size={12} />
        </button>
      </div>
    </div>
  );
};

export default OrdersTable;