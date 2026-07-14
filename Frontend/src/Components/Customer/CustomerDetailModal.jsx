import React, { useState } from "react";
import {
  X,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  ShoppingBag,
  DollarSign,
  Crown,
  Shield,
  ShieldOff,
  Pencil,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Package,
  Star,
  ChevronRight,
} from "lucide-react";
import { OrderStatusBadge, PaymentStatusBadge } from "../orders/OrderStatusBadge";
import CustomerStatusBadge from "./CustomerStatusBadge";

const CustomerDetailModal = ({
  customer,
  onClose,
  onToggleBlock,
  onToggleVip,
  onViewOrder,
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (!customer) return null;

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "orders", label: "Orders" },
    { id: "activity", label: "Activity" },
  ];

  // Mock order history
  const orderHistory = [
    { id: "10421", date: "Jan 28, 2025", amount: 119.97, status: "shipped", payment: "paid", items: 2 },
    { id: "10398", date: "Jan 15, 2025", amount: 69.99, status: "delivered", payment: "paid", items: 1 },
    { id: "10375", date: "Jan 02, 2025", amount: 244.96, status: "delivered", payment: "paid", items: 4 },
    { id: "10341", date: "Dec 18, 2024", amount: 54.99, status: "delivered", payment: "paid", items: 1 },
    { id: "10310", date: "Dec 05, 2024", amount: 179.97, status: "cancelled", payment: "refunded", items: 3 },
  ];

  // Mock activity
  const activities = [
    { type: "order", text: `Placed order #10421`, time: "2 days ago", icon: ShoppingBag },
    { type: "login", text: "Logged in from New York", time: "2 days ago", icon: CalendarDays },
    { type: "review", text: `Left a 5-star review on Classic White T-Shirt`, time: "5 days ago", icon: Star },
    { type: "order", text: `Placed order #10398`, time: "2 weeks ago", icon: ShoppingBag },
    { type: "update", text: "Updated shipping address", time: "3 weeks ago", icon: Pencil },
    { type: "login", text: "Logged in from mobile device", time: "1 month ago", icon: CalendarDays },
    { type: "order", text: `Placed order #10375`, time: "1 month ago", icon: ShoppingBag },
  ];

  const avgOrderValue = customer.totalOrders > 0 ? customer.totalSpent / customer.totalOrders : 0;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl mb-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={customer.avatar}
                  alt={customer.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-gray-100"
                />
                <span
                  className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 border-2 border-white rounded-full ${
                    customer.status === "active" || customer.status === "vip"
                      ? "bg-emerald-500"
                      : customer.status === "blocked"
                      ? "bg-rose-500"
                      : "bg-gray-400"
                  }`}
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-gray-800">{customer.name}</h2>
                  {customer.status === "vip" && (
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-full">
                      <Crown size={10} className="fill-amber-500 text-amber-500" /> VIP
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400">{customer.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleVip(customer)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                  customer.status === "vip"
                    ? "border-amber-200 bg-amber-50 text-amber-600"
                    : "border-gray-200 text-gray-500 hover:border-amber-200 hover:text-amber-600"
                }`}
              >
                <Crown size={13} className={customer.status === "vip" ? "fill-amber-500 text-amber-500" : ""} />
                {customer.status === "vip" ? "VIP" : "Make VIP"}
              </button>
              <button
                onClick={() => onToggleBlock(customer)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                  customer.status === "blocked"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                    : "border-gray-200 text-gray-500 hover:border-rose-200 hover:text-rose-600"
                }`}
              >
                {customer.status === "blocked" ? <ShieldOff size={13} /> : <Shield size={13} />}
                {customer.status === "blocked" ? "Unblock" : "Block"}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-sm font-medium border-b-2 transition-all ${
                  activeTab === tab.id
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab.label}
                {tab.id === "orders" && (
                  <span className="ml-1.5 text-xs text-gray-400">({orderHistory.length})</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* ===== OVERVIEW TAB ===== */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatBox
                  icon={ShoppingBag}
                  label="Total Orders"
                  value={customer.totalOrders}
                  color="indigo"
                />
                <StatBox
                  icon={DollarSign}
                  label="Total Spent"
                  value={`$${customer.totalSpent.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
                  color="emerald"
                />
                <StatBox
                  icon={TrendingUp}
                  label="Avg. Order Value"
                  value={`$${avgOrderValue.toFixed(2)}`}
                  color="amber"
                />
                <StatBox
                  icon={CalendarDays}
                  label="Customer Since"
                  value={customer.joinedDate}
                  color="sky"
                />
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Contact Info */}
                <div className="bg-gray-50 rounded-xl p-5 space-y-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Contact Information
                  </h4>
                  <div className="space-y-3">
                    <InfoRow icon={Mail} label="Email" value={customer.email} />
                    <InfoRow icon={Phone} label="Phone" value={customer.phone} />
                    <InfoRow icon={MapPin} label="Location" value={customer.location} />
                  </div>
                </div>

                {/* Segment & Notes */}
                <div className="bg-gray-50 rounded-xl p-5 space-y-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Details
                  </h4>
                  <div className="space-y-3">
                    <InfoRow label="Segment" value={customer.segment} />
                    <InfoRow label="Status" value={<CustomerStatusBadge status={customer.status} size="md" />} />
                    <InfoRow label="Last Order" value={customer.lastOrder || "N/A"} />
                    <InfoRow label="Tags" value={
                      <div className="flex flex-wrap gap-1.5">
                        {customer.tags?.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-white border border-gray-200 text-gray-500 text-[11px] rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    } />
                  </div>
                </div>
              </div>

              {/* Recent Orders Preview */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-gray-700">Recent Orders</h4>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-xs text-indigo-500 font-medium hover:text-indigo-600 flex items-center gap-1 transition-colors"
                  >
                    View All <ChevronRight size={12} />
                  </button>
                </div>
                <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
                  {orderHistory.slice(0, 3).map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => onViewOrder(order)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package size={14} className="text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">#{order.id}</p>
                          <p className="text-xs text-gray-400">{order.date} · {order.items} items</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-800">${order.amount.toFixed(2)}</p>
                        <OrderStatusBadge status={order.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===== ORDERS TAB ===== */}
          {activeTab === "orders" && (
            <div className="space-y-3">
              {/* Order Summary Bar */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <p className="text-xs text-gray-400">Total Orders</p>
                  <p className="text-lg font-bold text-gray-800">{orderHistory.length}</p>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div className="flex-1">
                  <p className="text-xs text-gray-400">Total Spent</p>
                  <p className="text-lg font-bold text-gray-800">
                    ${orderHistory.reduce((s, o) => s + (o.status !== "cancelled" ? o.amount : 0), 0).toFixed(2)}
                  </p>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div className="flex-1">
                  <p className="text-xs text-gray-400">Avg. Value</p>
                  <p className="text-lg font-bold text-gray-800">
                    ${(orderHistory.reduce((s, o) => s + (o.status !== "cancelled" ? o.amount : 0), 0) / orderHistory.filter(o => o.status !== "cancelled").length).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Orders List */}
              <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
                {orderHistory.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => onViewOrder(order)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                        <Package size={18} className="text-gray-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-indigo-600">#{order.id}</span>
                          <OrderStatusBadge status={order.status} />
                          <PaymentStatusBadge status={order.payment} />
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {order.date} · {order.items} item{order.items > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gray-800">${order.amount.toFixed(2)}</span>
                      <ChevronRight size={16} className="text-gray-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== ACTIVITY TAB ===== */}
          {activeTab === "activity" && (
            <div className="relative">
              <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gray-100" />
              <div className="space-y-0">
                {activities.map((activity, i) => {
                  const Icon = activity.icon;
                  const iconColorMap = {
                    order: "bg-indigo-100 text-indigo-500",
                    login: "bg-sky-100 text-sky-500",
                    review: "bg-amber-100 text-amber-500",
                    update: "bg-gray-100 text-gray-500",
                  };

                  return (
                    <div key={i} className="relative flex items-start gap-4 pb-6 last:pb-0">
                      <div
                        className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          iconColorMap[activity.type] || "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <Icon size={14} />
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <p className="text-sm text-gray-700">{activity.text}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatBox = ({ icon: Icon, label, value, color }) => {
  const colorMap = {
    indigo: "bg-indigo-50 text-indigo-500",
    emerald: "bg-emerald-50 text-emerald-500",
    amber: "bg-amber-50 text-amber-500",
    sky: "bg-sky-50 text-sky-500",
  };

  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${colorMap[color]}`}>
        <Icon size={18} />
      </div>
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="text-base font-bold text-gray-800">{value}</p>
    </div>
  );
};

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    {Icon && <Icon size={15} className="text-gray-400 mt-0.5 flex-shrink-0" />}
    {!Icon && <span className="text-xs text-gray-400 w-[60px] flex-shrink-0 pt-0.5">{label}</span>}
    <div className="min-w-0">
      {Icon && <p className="text-[11px] text-gray-400 mb-0.5">{label}</p>}
      <div className="text-sm text-gray-700">{value}</div>
    </div>
  </div>
);

export default CustomerDetailModal;