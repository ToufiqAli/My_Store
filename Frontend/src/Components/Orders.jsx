import React, { useState, useMemo } from "react";
import OrderFilters from "./Orders/OrderFilters";
import OrdersTable from "./Orders/OrdersTable";
import OrderDetailModal from "./Orders/OrderDetailModal";
import { OrderStatusBadge } from "./Orders/OrderStatusBadge";

// Mock Data
const mockOrders = [
  {
    id: "10421",
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 (555) 234-5678",
    customerAvatar: "https://picsum.photos/seed/sarah-j/80/80.jpg",
    products: [
      { name: "Classic White T-Shirt", variant: "Size M, White", qty: 2, price: 29.99, image: "https://picsum.photos/seed/tshirt-w/80/80.jpg" },
      { name: "Slim Fit Jeans", variant: "Size 32, Blue", qty: 1, price: 59.99, image: "https://picsum.photos/seed/jeans-b/80/80.jpg" },
    ],
    date: "Jan 28, 2025",
    time: "09:30 AM",
    amount: 119.97,
    paymentStatus: "paid",
    orderStatus: "shipped",
    address: "1234 Oak Street, Apt 5B, New York, NY 10001, USA",
  },
  {
    id: "10420",
    customer: "Mike Chen",
    email: "mike@example.com",
    phone: "+1 (555) 345-6789",
    customerAvatar: "https://picsum.photos/seed/mike-c/80/80.jpg",
    products: [
      { name: "Running Sneakers Pro", variant: "Size 10, Black", qty: 1, price: 129.99, image: "https://picsum.photos/seed/sneaker-bk/80/80.jpg" },
      { name: "Sport Socks Pack", variant: "3-Pack, Gray", qty: 1, price: 15.99, image: "https://picsum.photos/seed/socks-gy/80/80.jpg" },
      { name: "Leather Belt", variant: "Size L, Brown", qty: 1, price: 34.99, image: "https://picsum.photos/seed/belt-br/80/80.jpg" },
    ],
    date: "Jan 28, 2025",
    time: "08:15 AM",
    amount: 180.97,
    paymentStatus: "paid",
    orderStatus: "processing",
    address: "567 Maple Ave, San Francisco, CA 94102, USA",
  },
  {
    id: "10419",
    customer: "Emily Davis",
    email: "emily@example.com",
    phone: "+1 (555) 456-7890",
    customerAvatar: "https://picsum.photos/seed/emily-d/80/80.jpg",
    products: [
      { name: "Oversized Hoodie", variant: "Size S, Sage Green", qty: 1, price: 69.99, image: "https://picsum.photos/seed/hoodie-sg/80/80.jpg" },
    ],
    date: "Jan 27, 2025",
    time: "04:22 PM",
    amount: 69.99,
    paymentStatus: "paid",
    orderStatus: "delivered",
    address: "890 Pine Road, Austin, TX 73301, USA",
  },
  {
    id: "10418",
    customer: "James Wilson",
    email: "james@example.com",
    phone: "+1 (555) 567-8901",
    customerAvatar: "https://picsum.photos/seed/james-w/80/80.jpg",
    products: [
      { name: "Graphic Tee Collection", variant: "Size L, Multi", qty: 3, price: 24.99, image: "https://picsum.photos/seed/graphic-tee/80/80.jpg" },
      { name: "Cargo Shorts", variant: "Size 34, Khaki", qty: 2, price: 44.99, image: "https://picsum.photos/seed/shorts-kh/80/80.jpg" },
    ],
    date: "Jan 27, 2025",
    time: "02:10 PM",
    amount: 164.94,
    paymentStatus: "unpaid",
    orderStatus: "pending",
    address: "321 Elm Street, Chicago, IL 60601, USA",
  },
  {
    id: "10417",
    customer: "Lisa Anderson",
    email: "lisa@example.com",
    phone: "+1 (555) 678-9012",
    customerAvatar: "https://picsum.photos/seed/lisa-a/80/80.jpg",
    products: [
      { name: "Denim Jacket", variant: "Size M, Light Wash", qty: 1, price: 89.99, image: "https://picsum.photos/seed/denim-jk/80/80.jpg" },
      { name: "Canvas Tote Bag", variant: "Natural", qty: 1, price: 25.99, image: "https://picsum.photos/seed/tote-nt/80/80.jpg" },
      { name: "Silver Necklace", variant: "18 inch", qty: 1, price: 45.99, image: "https://picsum.photos/seed/necklace-sv/80/80.jpg" },
      { name: "Sunglasses", variant: "Tortoise", qty: 1, price: 39.99, image: "https://picsum.photos/seed/sunglass-tt/80/80.jpg" },
    ],
    date: "Jan 26, 2025",
    time: "11:45 AM",
    amount: 201.96,
    paymentStatus: "paid",
    orderStatus: "shipped",
    address: "654 Birch Lane, Seattle, WA 98101, USA",
  },
  {
    id: "10416",
    customer: "David Brown",
    email: "david@example.com",
    phone: "+1 (555) 789-0123",
    customerAvatar: "https://picsum.photos/seed/david-b/80/80.jpg",
    products: [
      { name: "Formal Dress Shirt", variant: "Size 16, White", qty: 2, price: 49.99, image: "https://picsum.photos/seed/shirt-wf/80/80.jpg" },
    ],
    date: "Jan 26, 2025",
    time: "09:00 AM",
    amount: 99.98,
    paymentStatus: "refunded",
    orderStatus: "cancelled",
    address: "987 Cedar Drive, Miami, FL 33101, USA",
  },
  {
    id: "10415",
    customer: "Anna Martinez",
    email: "anna@example.com",
    phone: "+1 (555) 890-1234",
    customerAvatar: "https://picsum.photos/seed/anna-m/80/80.jpg",
    products: [
      { name: "Yoga Leggings", variant: "Size S, Black", qty: 2, price: 39.99, image: "https://picsum.photos/seed/legging-bk/80/80.jpg" },
      { name: "Sports Bra", variant: "Size S, Pink", qty: 1, price: 29.99, image: "https://picsum.photos/seed/bra-pk/80/80.jpg" },
    ],
    date: "Jan 25, 2025",
    time: "06:30 PM",
    amount: 109.97,
    paymentStatus: "paid",
    orderStatus: "delivered",
    address: "246 Walnut Court, Denver, CO 80201, USA",
  },
  {
    id: "10414",
    customer: "Robert Taylor",
    email: "robert@example.com",
    phone: "+1 (555) 901-2345",
    customerAvatar: "https://picsum.photos/seed/robert-t/80/80.jpg",
    products: [
      { name: "Leather Wallet", variant: "Brown", qty: 1, price: 54.99, image: "https://picsum.photos/seed/wallet-br/80/80.jpg" },
      { name: "Watch", variant: "Silver Band", qty: 1, price: 199.99, image: "https://picsum.photos/seed/watch-sv/80/80.jpg" },
      { name: "Cufflinks Set", variant: "Gold", qty: 1, price: 35.99, image: "https://picsum.photos/seed/cufflink-gd/80/80.jpg" },
    ],
    date: "Jan 25, 2025",
    time: "03:15 PM",
    amount: 290.97,
    paymentStatus: "partial",
    orderStatus: "processing",
    address: "135 Ash Boulevard, Portland, OR 97201, USA",
  },
];

const OrdersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState(mockOrders);

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchId = order.id.toLowerCase().includes(q);
        const matchCustomer = order.customer.toLowerCase().includes(q);
        const matchProduct = order.products.some((p) => p.name.toLowerCase().includes(q));
        if (!matchId && !matchCustomer && !matchProduct) return false;
      }

      // Status
      if (statusFilter !== "All" && order.orderStatus !== statusFilter.toLowerCase()) return false;

      // Payment
      if (paymentFilter !== "All" && order.paymentStatus !== paymentFilter.toLowerCase()) return false;

      // Date range (simplified)
      if (dateRange.from) {
        const fromDate = new Date(dateRange.from);
        const orderDate = new Date(order.date.replace(",", ""));
        if (orderDate < fromDate) return false;
      }
      if (dateRange.to) {
        const toDate = new Date(dateRange.to);
        const orderDate = new Date(order.date.replace(",", ""));
        if (orderDate > toDate) return false;
      }

      return true;
    });
  }, [orders, searchQuery, statusFilter, paymentFilter, dateRange]);

  const handleShip = (order) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === order.id ? { ...o, orderStatus: "shipped" } : o))
    );
    setSelectedOrder(null);
  };

  const handleCancel = (order) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === order.id ? { ...o, orderStatus: "cancelled" } : o))
    );
  };

  const handleExport = () => {
    alert("Exporting orders to CSV...");
  };

  const handleNewOrder = () => {
    alert("Opening new order form...");
  };

  // Quick status count badges for top area
  const statusCounts = useMemo(() => {
    const counts = { pending: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0, returned: 0 };
    orders.forEach((o) => {
      if (counts[o.orderStatus] !== undefined) counts[o.orderStatus]++;
    });
    return counts;
  }, [orders]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Orders</h1>
            <p className="text-sm text-gray-400 mt-1">
              Manage and track all customer orders
            </p>
          </div>
        </div>

        {/* Quick Status Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <QuickStatusPill
            label="All Orders"
            count={orders.length}
            active={statusFilter === "All"}
            onClick={() => setStatusFilter("All")}
          />
          <QuickStatusPill
            label="Pending"
            count={statusCounts.pending}
            active={statusFilter === "Pending"}
            onClick={() => setStatusFilter("Pending")}
            dotColor="bg-amber-500"
          />
          <QuickStatusPill
            label="Processing"
            count={statusCounts.processing}
            active={statusFilter === "Processing"}
            onClick={() => setStatusFilter("Processing")}
            dotColor="bg-blue-500"
          />
          <QuickStatusPill
            label="Shipped"
            count={statusCounts.shipped}
            active={statusFilter === "Shipped"}
            onClick={() => setStatusFilter("Shipped")}
            dotColor="bg-indigo-500"
          />
          <QuickStatusPill
            label="Delivered"
            count={statusCounts.delivered}
            active={statusFilter === "Delivered"}
            onClick={() => setStatusFilter("Delivered")}
            dotColor="bg-emerald-500"
          />
          <QuickStatusPill
            label="Cancelled"
            count={statusCounts.cancelled}
            active={statusFilter === "Cancelled"}
            onClick={() => setStatusFilter("Cancelled")}
            dotColor="bg-rose-500"
          />
        </div>

        {/* Filters */}
        <OrderFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          paymentFilter={paymentFilter}
          onPaymentChange={setPaymentFilter}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onExport={handleExport}
          onNewOrder={handleNewOrder}
          resultCount={filteredOrders.length}
        />

        {/* Table */}
        <OrdersTable
          orders={filteredOrders}
          onViewDetail={setSelectedOrder}
          onShip={handleShip}
          onCancel={handleCancel}
        />
      </div>

      {/* Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onShip={handleShip}
        />
      )}
    </div>
  );
};

// Quick Status Pill
const QuickStatusPill = ({ label, count, active, onClick, dotColor }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-150 border ${
        active
          ? "bg-indigo-50 border-indigo-200 text-indigo-600"
          : "bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
      }`}
    >
      {dotColor && <span className={`w-2 h-2 rounded-full ${dotColor}`} />}
      {label}
      <span
        className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
          active ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-500"
        }`}
      >
        {count}
      </span>
    </button>
  );
};

export default OrdersPage;