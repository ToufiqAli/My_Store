import React, { useState } from "react";
import {
  MoreHorizontal,
  Mail,
  Phone,
  Eye,
  Pencil,
  Shield,
  ShieldOff,
  Crown,
  Ban,
  ChevronRight,
  MapPin,
} from "lucide-react";
import CustomerStatusBadge from "./CustomerStatusBadge";

const CustomerRow = ({
  customer,
  onView,
  onEdit,
  onToggleBlock,
  onToggleVip,
  onSendEmail,
}) => {
  const [actionsOpen, setActionsOpen] = useState(false);

  return (
    <>
      {/* Desktop Row */}
      <tr className="group border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors duration-150">
        {/* Checkbox */}
        <td className="py-3.5 px-4">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 text-indigo-500 focus:ring-indigo-500/20 cursor-pointer"
          />
        </td>

        {/* Customer */}
        <td className="py-3.5 px-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={customer.avatar}
                alt={customer.name}
                className="w-10 h-10 rounded-xl object-cover ring-1 ring-gray-100"
              />
              <span
                className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-white rounded-full ${
                  customer.status === "active" || customer.status === "vip"
                    ? "bg-emerald-500"
                    : customer.status === "blocked"
                    ? "bg-rose-500"
                    : "bg-gray-400"
                }`}
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onView(customer)}
                  className="text-sm font-semibold text-gray-800 hover:text-indigo-600 transition-colors truncate"
                >
                  {customer.name}
                </button>
                {customer.status === "vip" && (
                  <Crown size={12} className="text-amber-400 fill-amber-400 flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-gray-400 truncate">{customer.email}</p>
            </div>
          </div>
        </td>

        {/* Phone */}
        <td className="py-3.5 px-4">
          <span className="text-sm text-gray-600 whitespace-nowrap">{customer.phone}</span>
        </td>

        {/* Location */}
        <td className="py-3.5 px-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <MapPin size={12} className="text-gray-400 flex-shrink-0" />
            <span className="truncate max-w-[120px]">{customer.location}</span>
          </div>
        </td>

        {/* Orders */}
        <td className="py-3.5 px-4">
          <span className="text-sm font-medium text-gray-700">{customer.totalOrders}</span>
        </td>

        {/* Total Spent */}
        <td className="py-3.5 px-4">
          <span className="text-sm font-semibold text-gray-800">
            ${customer.totalSpent.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </td>

        {/* Joined */}
        <td className="py-3.5 px-4">
          <span className="text-sm text-gray-500 whitespace-nowrap">{customer.joinedDate}</span>
        </td>

        {/* Status */}
        <td className="py-3.5 px-4">
          <CustomerStatusBadge status={customer.status} />
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
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg shadow-gray-200/50 py-1.5 z-20">
                  <ActionBtn icon={Eye} label="View Details" onClick={() => { onView(customer); setActionsOpen(false); }} />
                  <ActionBtn icon={Pencil} label="Edit Profile" onClick={() => { onEdit(customer); setActionsOpen(false); }} />
                  <ActionBtn icon={Mail} label="Send Email" onClick={() => { onSendEmail(customer); setActionsOpen(false); }} />
                  <div className="my-1 border-t border-gray-100" />
                  <ActionBtn
                    icon={customer.status === "vip" ? Crown : Crown}
                    label={customer.status === "vip" ? "Remove VIP" : "Make VIP"}
                    onClick={() => { onToggleVip(customer); setActionsOpen(false); }}
                    highlight={customer.status !== "vip"}
                  />
                  <ActionBtn
                    icon={customer.status === "blocked" ? ShieldOff : Shield}
                    label={customer.status === "blocked" ? "Unblock" : "Block"}
                    danger={customer.status !== "blocked"}
                    onClick={() => { onToggleBlock(customer); setActionsOpen(false); }}
                  />
                </div>
              </>
            )}
          </div>
        </td>
      </tr>

      {/* Mobile Card */}
      <div className="lg:hidden border-b border-gray-100 last:border-0 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={customer.avatar} alt="" className="w-11 h-11 rounded-xl object-cover ring-1 ring-gray-100" />
              <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-white rounded-full ${
                customer.status === "active" || customer.status === "vip" ? "bg-emerald-500" : customer.status === "blocked" ? "bg-rose-500" : "bg-gray-400"
              }`} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-gray-800">{customer.name}</span>
                {customer.status === "vip" && <Crown size={11} className="text-amber-400 fill-amber-400" />}
              </div>
              <p className="text-xs text-gray-400">{customer.email}</p>
            </div>
          </div>
          <CustomerStatusBadge status={customer.status} />
        </div>

        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="bg-gray-50 rounded-lg p-2.5 text-center">
            <p className="text-xs text-gray-400">Orders</p>
            <p className="text-sm font-bold text-gray-800 mt-0.5">{customer.totalOrders}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2.5 text-center">
            <p className="text-xs text-gray-400">Spent</p>
            <p className="text-sm font-bold text-gray-800 mt-0.5">${customer.totalSpent.toFixed(0)}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2.5 text-center">
            <p className="text-xs text-gray-400">Joined</p>
            <p className="text-[11px] font-medium text-gray-600 mt-0.5">{customer.joinedDateShort}</p>
          </div>
        </div>

        <button
          onClick={() => onView(customer)}
          className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-indigo-500 font-medium hover:bg-indigo-50 rounded-lg transition-colors"
        >
          View Details <ChevronRight size={12} />
        </button>
      </div>
    </>
  );
};

const ActionBtn = ({ icon: Icon, label, danger, highlight, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors ${
      danger
        ? "text-rose-500 hover:bg-rose-50"
        : highlight
        ? "text-amber-600 hover:bg-amber-50"
        : "text-gray-600 hover:bg-gray-50"
    }`}
  >
    <Icon size={14} className={danger ? "text-rose-400" : highlight ? "text-amber-500" : "text-gray-400"} />
    {label}
  </button>
);

export default CustomerRow;