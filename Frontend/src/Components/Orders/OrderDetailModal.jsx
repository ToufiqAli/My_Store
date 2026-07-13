import React from "react";
import {
  X,
  Copy,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Mail,
  Package,
} from "lucide-react";
import { OrderStatusBadge, PaymentStatusBadge } from "./OrderStatusBadge";

const OrderDetailModal = ({ order, onClose, onShip }) => {
  if (!order) return null;

  const timeline = [
    { step: "Order Placed", time: order.time, done: true, icon: Clock },
    { step: "Confirmed", time: "10:45 AM", done: true, icon: CheckCircle2 },
    { step: "Processing", time: "11:20 AM", done: order.orderStatus !== "pending", icon: Package },
    { step: "Shipped", time: "—", done: ["shipped", "delivered"].includes(order.orderStatus), icon: Truck },
    { step: "Delivered", time: "—", done: order.orderStatus === "delivered", icon: CheckCircle2 },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-gray-800">Order #{order.id}</h2>
            <OrderStatusBadge status={order.orderStatus} size="md" />
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <InfoBlock label="Order Date" value={order.date} />
            <InfoBlock label="Payment" value={order.paymentStatus} badge="payment" />
            <InfoBlock label="Items" value={`${order.products.length} products`} />
            <InfoBlock label="Total" value={`$${order.amount.toFixed(2)}`} highlight />
          </div>

          {/* Customer & Shipping */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Customer Info */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Customer
              </h4>
              <div className="flex items-center gap-3">
                <img
                  src={order.customerAvatar}
                  alt=""
                  className="w-10 h-10 rounded-xl object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800">{order.customer}</p>
                  <p className="text-xs text-gray-400">{order.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Phone size={12} className="text-gray-400" />
                {order.phone}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Shipping Address
              </h4>
              <div className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed">
                <MapPin size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <span>
                  {order.address}
                </span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
              Order Items
            </h4>
            <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
              {order.products.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-3.5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                    <p className="text-xs text-gray-400">
                      {item.variant} · Qty: {item.qty}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-3 space-y-1.5 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>${(order.amount * 0.9).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span>${(order.amount * 0.05).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Tax</span>
                <span>${(order.amount * 0.05).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-800 pt-2 border-t border-gray-100">
                <span>Total</span>
                <span>${order.amount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Order Timeline
            </h4>
            <div className="relative pl-6 space-y-0">
              {timeline.map((step, i) => {
                const Icon = step.icon;
                const isLast = i === timeline.length - 1;
                return (
                  <div key={i} className="relative pb-6 last:pb-0">
                    {/* Line */}
                    {!isLast && (
                      <div
                        className={`absolute left-[9px] top-5 w-0.5 h-full ${
                          step.done ? "bg-indigo-200" : "bg-gray-200"
                        }`}
                      />
                    )}
                    {/* Dot */}
                    <div
                      className={`absolute left-0 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
                        step.done
                          ? "bg-indigo-500 text-white"
                          : "bg-gray-100 text-gray-400 border-2 border-gray-200"
                      }`}
                    >
                      <Icon size={10} />
                    </div>
                    {/* Content */}
                    <div className="ml-4">
                      <p className={`text-sm font-medium ${step.done ? "text-gray-800" : "text-gray-400"}`}>
                        {step.step}
                      </p>
                      <p className="text-xs text-gray-400">{step.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
          >
            Close
          </button>
          {order.orderStatus === "processing" && (
            <button
              onClick={() => onShip(order)}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-xl transition-colors shadow-sm shadow-indigo-200"
            >
              <Truck size={15} />
              Mark as Shipped
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoBlock = ({ label, value, highlight, badge }) => {
  return (
    <div>
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      {badge === "payment" ? (
        <PaymentStatusBadge status={value} size="md" />
      ) : (
        <p
          className={`text-sm font-semibold ${
            highlight ? "text-indigo-600 text-base" : "text-gray-800"
          }`}
        >
          {value}
        </p>
      )}
    </div>
  );
};

export default OrderDetailModal;