import React from "react";
import { Clock, Loader2, Truck, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

const statusConfig = {
  pending: {
    label: "Pending",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
    icon: Clock,
  },
  processing: {
    label: "Processing",
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-500",
    icon: Loader2,
  },
  shipped: {
    label: "Shipped",
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    dot: "bg-indigo-500",
    icon: Truck,
  },
  delivered: {
    label: "Delivered",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-rose-50",
    text: "text-rose-700",
    dot: "bg-rose-500",
    icon: XCircle,
  },
  returned: {
    label: "Returned",
    bg: "bg-gray-100",
    text: "text-gray-600",
    dot: "bg-gray-500",
    icon: AlertCircle,
  },
};

const paymentConfig = {
  paid: { label: "Paid", bg: "bg-emerald-50", text: "text-emerald-700" },
  unpaid: { label: "Unpaid", bg: "bg-rose-50", text: "text-rose-700" },
  refunded: { label: "Refunded", bg: "bg-gray-100", text: "text-gray-600" },
  partial: { label: "Partial", bg: "bg-amber-50", text: "text-amber-700" },
};

export const OrderStatusBadge = ({ status, size = "sm" }) => {
  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-xs";

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full ${config.bg} ${config.text} ${sizeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
};

export const PaymentStatusBadge = ({ status, size = "sm" }) => {
  const config = paymentConfig[status] || paymentConfig.unpaid;
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-xs";

  return (
    <span className={`inline-flex items-center font-medium rounded-full ${config.bg} ${config.text} ${sizeClasses}`}>
      {config.label}
    </span>
  );
};

export default OrderStatusBadge;