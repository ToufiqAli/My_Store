import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const topProducts = [
  { id: 1, name: "Classic White T-Shirt", category: "T-Shirts", sold: 342, revenue: 10254.58, trend: 12.5, image: "https://picsum.photos/seed/anl-tsh/60/60.jpg" },
  { id: 2, name: "Urban Runner Sneakers", category: "Sneakers", sold: 185, revenue: 24048.15, trend: 8.2, image: "https://picsum.photos/seed/anl-snk/60/60.jpg" },
  { id: 3, name: "Slim Fit Dark Wash Jeans", category: "Jeans", sold: 156, revenue: 9358.44, trend: -2.4, image: "https://picsum.photos/seed/anl-jns/60/60.jpg" },
  { id: 4, name: "Oversized Graphic Hoodie", category: "Hoodies", sold: 128, revenue: 8958.72, trend: 15.1, image: "https://picsum.photos/seed/anl-hod/60/60.jpg" },
  { id: 5, name: "Leather Minimalist Wallet", category: "Accessories", sold: 98, revenue: 3429.02, trend: 5.7, image: "https://picsum.photos/seed/anl-wlt/60/60.jpg" },
];

const TopProductsTable = () => {
  const maxSold = Math.max(...topProducts.map((p) => p.sold));

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 lg:p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-gray-800">Top Selling Products</h3>
          <p className="text-sm text-gray-400 mt-0.5">By revenue this period</p>
        </div>
        <button className="text-xs text-indigo-500 font-medium hover:text-indigo-600 transition-colors">
          View All
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pb-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400 w-8">#</th>
              <th className="pb-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">Product</th>
              <th className="pb-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">Category</th>
              <th className="pb-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">Sold</th>
              <th className="pb-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400">Revenue</th>
              <th className="pb-3 text-right text-[11px] font-semibold uppercase tracking-wider text-gray-400">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {topProducts.map((product, i) => (
              <tr key={product.id} className="group hover:bg-gray-50/50 transition-colors">
                <td className="py-3.5">
                  <span className="text-sm font-bold text-gray-300">{i + 1}</span>
                </td>
                <td className="py-3.5">
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt="" className="w-9 h-9 rounded-lg object-cover" />
                    <span className="text-sm font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">{product.name}</span>
                  </div>
                </td>
                <td className="py-3.5">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{product.category}</span>
                </td>
                <td className="py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700 w-8">{product.sold}</span>
                    <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden hidden lg:block">
                      <div
                        className="h-full bg-indigo-400 rounded-full"
                        style={{ width: `${(product.sold / maxSold) * 100}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-3.5">
                  <span className="text-sm font-semibold text-gray-800">${product.revenue.toLocaleString()}</span>
                </td>
                <td className="py-3.5 text-right">
                  <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${product.trend >= 0 ? "text-emerald-600" : "text-rose-500"}`}>
                    {product.trend >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {Math.abs(product.trend)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile List */}
      <div className="md:hidden space-y-3">
        {topProducts.map((product, i) => (
          <div key={product.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <span className="text-lg font-bold text-gray-200 w-6 text-center">{i + 1}</span>
            <img src={product.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
              <p className="text-xs text-gray-400">{product.sold} sold</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-800">${(product.revenue / 1000).toFixed(1)}k</p>
              <p className={`text-[11px] font-semibold flex items-center justify-end gap-0.5 ${product.trend >= 0 ? "text-emerald-600" : "text-rose-500"}`}>
                {product.trend >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {Math.abs(product.trend)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProductsTable;