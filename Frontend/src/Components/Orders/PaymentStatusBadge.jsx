import React from "react";

const paymentConfig = {
  paid: {
    label: "Paid",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    ring: "ring-emerald-500/20",
    icon: "check",
  },
  unpaid: {
    label: "Unpaid",
    bg: "bg-rose-50",
    text: "text-rose-700",
    dot: "bg-rose-500",
    ring: "ring-rose-500/20",
    icon: "alert",
  },
  refunded: {
    label: "Refunded",
    bg: "bg-gray-100",
    text: "text-gray-600",
    dot: "bg-gray-500",
    ring: "ring-gray-500/20",
    icon: "return",
  },
  partial: {
    label: "Partial",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
    ring: "ring-amber-500/20",
    icon: "half",
  },
  failed: {
    label: "Failed",
    bg: "bg-red-50",
    text: "text-red-700",
    dot: "bg-red-500",
    ring: "ring-red-500/20",
    icon: "x",
  },
  pending_payment: {
    label: "Pending",
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    dot: "bg-yellow-500",
    ring: "ring-yellow-500/20",
    icon: "clock",
  },
  authorized: {
    label: "Authorized",
    bg: "bg-sky-50",
    text: "text-sky-700",
    dot: "bg-sky-500",
    ring: "ring-sky-500/20",
    icon: "lock",
  },
  captured: {
    label: "Captured",
    bg: "bg-teal-50",
    text: "text-teal-700",
    dot: "bg-teal-500",
    ring: "ring-teal-500/20",
    icon: "pin",
  },
};

// Tiny SVG icons for each payment state
const StatusIcon = ({ type, size = 12 }) => {
  const icons = {
    check: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    alert: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    return: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
      </svg>
    ),
    half: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    x: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    clock: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    lock: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    pin: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L12 8" />
        <path d="M15 11h-6" />
        <path d="M12 22v-7" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  };

  return icons[type] || null;
};

const PaymentStatusBadge = ({
  status,
  size = "sm",
  showIcon = false,
  showDot = true,
  showLabel = true,
  pulse = false,
  className = "",
}) => {
  const config = paymentConfig[status] || paymentConfig.unpaid;

  const sizeMap = {
    xs: "px-1.5 py-0.5 text-[10px] gap-1",
    sm: "px-2.5 py-1 text-[11px] gap-1.5",
    md: "px-3 py-1.5 text-xs gap-1.5",
    lg: "px-4 py-2 text-sm gap-2",
  };

  const dotSizeMap = {
    xs: "w-1 h-1",
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-2.5 h-2.5",
  };

  const iconSizeMap = {
    xs: 9,
    sm: 10,
    md: 12,
    lg: 14,
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full
        ${config.bg} ${config.text}
        ${sizeMap[size]}
        ${className}
        transition-all duration-200
      `}
      title={config.label}
    >
      {/* Dot */}
      {showDot && (
        <span className="relative flex items-center justify-center">
          <span
            className={`${dotSizeMap[size]} rounded-full ${config.dot}`}
          />
          {pulse && status === "pending_payment" && (
            <span
              className={`absolute ${dotSizeMap[size]} rounded-full ${config.dot} animate-ping opacity-75`}
            />
          )}
        </span>
      )}

      {/* Icon */}
      {showIcon && (
        <StatusIcon type={config.icon} size={iconSizeMap[size]} />
      )}

      {/* Label */}
      {showLabel && config.label}
    </span>
  );
};

// Convenience sub-components
PaymentStatusBadge.Paid = (props) => <PaymentStatusBadge status="paid" {...props} />;
PaymentStatusBadge.Unpaid = (props) => <PaymentStatusBadge status="unpaid" {...props} />;
PaymentStatusBadge.Refunded = (props) => <PaymentStatusBadge status="refunded" {...props} />;
PaymentStatusBadge.Partial = (props) => <PaymentStatusBadge status="partial" {...props} />;
PaymentStatusBadge.Failed = (props) => <PaymentStatusBadge status="failed" {...props} />;
PaymentStatusBadge.Pending = (props) => <PaymentStatusBadge status="pending_payment" {...props} />;
PaymentStatusBadge.Authorized = (props) => <PaymentStatusBadge status="authorized" {...props} />;
PaymentStatusBadge.Captured = (props) => <PaymentStatusBadge status="captured" {...props} />;

export default PaymentStatusBadge;