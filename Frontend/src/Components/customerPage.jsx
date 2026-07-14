import React, { useState, useMemo } from "react";
import CustomerFilters from "./Customer/CustomerFilters";
import CustomerRow from "./Customer/CustomerRow";
import CustomerDetailModal from "./Customer/CustomerDetailModal";

const mockCustomers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 234-5678",
    location: "New York, US",
    avatar: "https://picsum.photos/seed/cust-sarah/80/80.jpg",
    totalOrders: 12,
    totalSpent: 1249.88,
    joinedDate: "Aug 15, 2024",
    joinedDateShort: "Aug '24",
    lastOrder: "Jan 28, 2025",
    status: "vip",
    segment: "Regular",
    tags: ["fashion", "repeat buyer"],
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@email.com",
    phone: "+1 (555) 345-6789",
    location: "San Francisco, US",
    avatar: "https://picsum.photos/seed/cust-mike/80/80.jpg",
    totalOrders: 8,
    totalSpent: 923.94,
    joinedDate: "Sep 22, 2024",
    joinedDateShort: "Sep '24",
    lastOrder: "Jan 28, 2025",
    status: "active",
    segment: "Retail",
    tags: ["sneakers", "tech"],
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+1 (555) 456-7890",
    location: "Austin, US",
    avatar: "https://picsum.photos/seed/cust-emily/80/80.jpg",
    totalOrders: 3,
    totalSpent: 219.97,
    joinedDate: "Dec 01, 2024",
    joinedDateShort: "Dec '24",
    lastOrder: "Jan 27, 2025",
    status: "active",
    segment: "Regular",
    tags: ["hoodies"],
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james.wilson@email.com",
    phone: "+1 (555) 567-8901",
    location: "Chicago, US",
    avatar: "https://picsum.photos/seed/cust-james/80/80.jpg",
    totalOrders: 1,
    totalSpent: 164.94,
    joinedDate: "Jan 27, 2025",
    joinedDateShort: "Jan '25",
    lastOrder: "Jan 27, 2025",
    status: "new",
    segment: "Regular",
    tags: [],
  },
  {
    id: 5,
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    phone: "+1 (555) 678-9012",
    location: "Seattle, US",
    avatar: "https://picsum.photos/seed/cust-lisa/80/80.jpg",
    totalOrders: 21,
    totalSpent: 3421.56,
    joinedDate: "Mar 10, 2024",
    joinedDateShort: "Mar '24",
    lastOrder: "Jan 26, 2025",
    status: "vip",
    segment: "Wholesale",
    tags: ["wholesale", "bulk buyer", "fashion"],
  },
  {
    id: 6,
    name: "David Brown",
    email: "david.brown@email.com",
    phone: "+1 (555) 789-0123",
    location: "Miami, US",
    avatar: "https://picsum.photos/seed/cust-david/80/80.jpg",
    totalOrders: 2,
    totalSpent: 99.98,
    joinedDate: "Nov 15, 2024",
    joinedDateShort: "Nov '24",
    lastOrder: "Dec 20, 2024",
    status: "blocked",
    segment: "Regular",
    tags: ["flagged"],
  },
  {
    id: 7,
    name: "Anna Martinez",
    email: "anna.martinez@email.com",
    phone: "+1 (555) 890-1234",
    location: "Denver, US",
    avatar: "https://picsum.photos/seed/cust-anna/80/80.jpg",
    totalOrders: 6,
    totalSpent: 567.88,
    joinedDate: "Jul 08, 2024",
    joinedDateShort: "Jul '24",
    lastOrder: "Jan 25, 2025",
    status: "active",
    segment: "Retail",
    tags: ["activewear", "yoga"],
  },
  {
    id: 8,
    name: "Robert Taylor",
    email: "robert.taylor@email.com",
    phone: "+1 (555) 901-2345",
    location: "Portland, US",
    avatar: "https://picsum.photos/seed/cust-robert/80/80.jpg",
    totalOrders: 0,
    totalSpent: 0,
    joinedDate: "Jan 20, 2025",
    joinedDateShort: "Jan '25",
    lastOrder: null,
    status: "inactive",
    segment: "Regular",
    tags: ["signed up"],
  },
  {
    id: 9,
    name: "Sophia Lee",
    email: "sophia.lee@company.com",
    phone: "+1 (555) 012-3456",
    location: "Los Angeles, US",
    avatar: "https://picsum.photos/seed/cust-sophia/80/80.jpg",
    totalOrders: 45,
    totalSpent: 8920.55,
    joinedDate: "Jan 05, 2024",
    joinedDateShort: "Jan '24",
    lastOrder: "Jan 24, 2025",
    status: "vip",
    segment: "Corporate",
    tags: ["corporate", "bulk", "premium"],
  },
  {
    id: 10,
    name: "Daniel Kim",
    email: "daniel.kim@email.com",
    phone: "+1 (555) 123-4567",
    location: "Boston, US",
    avatar: "https://picsum.photos/seed/cust-daniel/80/80.jpg",
    totalOrders: 4,
    totalSpent: 389.96,
    joinedDate: "Oct 30, 2024",
    joinedDateShort: "Oct '24",
    lastOrder: "Jan 22, 2025",
    status: "active",
    segment: "Retail",
    tags: ["jeans", "denim"],
  },
];

const CustomersPage = () => {
  const [customers, setCustomers] = useState(mockCustomers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [segmentFilter, setSegmentFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Quick stats
  const stats = useMemo(() => {
    const totalSpent = customers.reduce((s, c) => s + c.totalSpent, 0);
    const avgSpend = customers.filter((c) => c.totalOrders > 0).length > 0
      ? totalSpent / customers.filter((c) => c.totalOrders > 0).length
      : 0;
    return {
      total: customers.length,
      active: customers.filter((c) => c.status === "active" || c.status === "vip").length,
      vip: customers.filter((c) => c.status === "vip").length,
      totalSpent,
      avgSpend,
    };
  }, [customers]);

  // Filter
  const filteredCustomers = useMemo(() => {
    let result = [...customers];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.includes(q) ||
          c.location.toLowerCase().includes(q) ||
          c.tags.some((t) => t.includes(q))
      );
    }

    if (statusFilter !== "All") {
      result = result.filter((c) => c.status === statusFilter.toLowerCase());
    }

    if (segmentFilter !== "All") {
      result = result.filter((c) => c.segment === segmentFilter);
    }

    // Sort: VIP first, then by total spent desc
    result.sort((a, b) => {
      if (a.status === "vip" && b.status !== "vip") return -1;
      if (b.status === "vip" && a.status !== "vip") return 1;
      return b.totalSpent - a.totalSpent;
    });

    return result;
  }, [customers, searchQuery, statusFilter, segmentFilter]);

  const handleToggleBlock = (customer) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === customer.id
          ? { ...c, status: c.status === "blocked" ? "active" : "blocked" }
          : c
      )
    );
    if (selectedCustomer?.id === customer.id) {
      setSelectedCustomer((prev) => ({
        ...prev,
        status: prev.status === "blocked" ? "active" : "blocked",
      }));
    }
  };

  const handleToggleVip = (customer) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === customer.id
          ? { ...c, status: c.status === "vip" ? "active" : "vip" }
          : c
      )
    );
    if (selectedCustomer?.id === customer.id) {
      setSelectedCustomer((prev) => ({
        ...prev,
        status: prev.status === "vip" ? "active" : "vip",
      }));
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
    setSegmentFilter("All");
    setShowFilters(false);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Customers</h1>
            <p className="text-sm text-gray-400 mt-1">
              Manage your customer base and track engagement
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
          <QuickStat label="Total Customers" value={stats.total} icon="👥" />
          <QuickStat label="Active" value={stats.active} icon="✅" color="text-emerald-600" />
          <QuickStat label="VIP" value={stats.vip} icon="👑" color="text-amber-600" />
          <QuickStat label="Total Revenue" value={`$${stats.totalSpent.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`} icon="💰" />
          <QuickStat label="Avg. Spend" value={`$${stats.avgSpend.toFixed(0)}`} icon="📊" className="col-span-2 lg:col-span-1" />
        </div>

        {/* Filters */}
        <CustomerFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          segmentFilter={segmentFilter}
          onSegmentChange={setSegmentFilter}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          onClearFilters={handleClearFilters}
          onExport={() => alert("Exporting customers to CSV...")}
          onBulkEmail={() => alert("Opening bulk email composer...")}
          onAddCustomer={() => alert("Opening add customer form...")}
          resultCount={filteredCustomers.length}
          totalCount={customers.length}
          selectedCount={0}
        />

        {/* Customer Table */}
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
                  <th className="py-3 px-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    Customer
                  </th>
                  <th className="py-3 px-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    Phone
                  </th>
                  <th className="py-3 px-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    Location
                  </th>
                  <th className="py-3 px-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    Orders
                  </th>
                  <th className="py-3 px-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    Total Spent
                  </th>
                  <th className="py-3 px-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    Joined
                  </th>
                  <th className="py-3 px-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    Status
                  </th>
                  <th className="py-3 px-4 w-12" />
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <CustomerRow
                    key={customer.id}
                    customer={customer}
                    onView={setSelectedCustomer}
                    onEdit={() => {}}
                    onToggleBlock={handleToggleBlock}
                    onToggleVip={handleToggleVip}
                    onSendEmail={() => alert(`Opening email to ${customer.email}`)}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden divide-y divide-gray-100">
            {filteredCustomers.map((customer) => (
              <CustomerRow
                key={customer.id}
                customer={customer}
                onView={setSelectedCustomer}
                onEdit={() => {}}
                onToggleBlock={handleToggleBlock}
                onToggleVip={handleToggleVip}
                onSendEmail={() => alert(`Opening email to ${customer.email}`)}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredCustomers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">👤</span>
              </div>
              <p className="text-sm font-medium text-gray-600">No customers found</p>
              <p className="text-xs text-gray-400 mt-1">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedCustomer && (
        <CustomerDetailModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          onToggleBlock={handleToggleBlock}
          onToggleVip={handleToggleVip}
          onViewOrder={(order) => alert(`Navigating to order #${order.id}`)}
        />
      )}
    </div>
  );
};

const QuickStat = ({ label, value, icon, color = "text-gray-800", className = "" }) => (
  <div className={`bg-white rounded-xl border border-gray-200/80 p-4 hover:shadow-sm transition-all ${className}`}>
    <div className="flex items-center justify-between mb-2">
      <span className="text-lg">{icon}</span>
    </div>
    <p className={`text-xl font-bold ${color}`}>{value}</p>
    <p className="text-xs text-gray-400 mt-0.5">{label}</p>
  </div>
);

export default CustomersPage