
import React, { useState, useMemo } from "react";
import ProductFilters from "./Products/ProductFilters";
import ProductCard from "./Products/ProductCard";
import ProductFormModal from "./Products/ProductFormModal";
import DeleteConfirmModal from "./Products/DeleteConfirmModal";

const mockProducts = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    sku: "TSH-WHT-001",
    category: "T-Shirts",
    description: "Premium cotton white t-shirt with a relaxed fit.",
    price: 29.99,
    comparePrice: 39.99,
    costPerItem: 12.00,
    quantity: 145,
    stockStatus: "in_stock",
    featured: true,
    tags: ["cotton", "basics", "white"],
    images: [{ id: 1, url: "https://picsum.photos/seed/prod-tshirt-w/400/400.jpg" }],
    variants: [],
    image: "https://picsum.photos/seed/prod-tshirt-w/400/400.jpg",
  },
  {
    id: 2,
    name: "Slim Fit Dark Wash Jeans",
    sku: "JNS-DWK-002",
    category: "Jeans",
    description: "Modern slim fit jeans in dark wash denim.",
    price: 59.99,
    comparePrice: null,
    costPerItem: 24.00,
    quantity: 8,
    stockStatus: "low_stock",
    featured: false,
    tags: ["denim", "slim", "dark wash"],
    images: [{ id: 2, url: "https://picsum.photos/seed/prod-jeans-d/400/400.jpg" }],
    variants: [],
    image: "https://picsum.photos/seed/prod-jeans-d/400/400.jpg",
  },
  {
    id: 3,
    name: "Urban Runner Sneakers",
    sku: "SNK-URB-003",
    category: "Sneakers",
    description: "Lightweight running sneakers with cloud cushioning.",
    price: 129.99,
    comparePrice: 159.99,
    costPerItem: 55.00,
    quantity: 0,
    stockStatus: "out_of_stock",
    featured: true,
    tags: ["running", "lightweight", "sneakers"],
    images: [{ id: 3, url: "https://picsum.photos/seed/prod-sneaker-u/400/400.jpg" }],
    variants: [],
    image: "https://picsum.photos/seed/prod-sneaker-u/400/400.jpg",
  },
  {
    id: 4,
    name: "Leather Minimalist Wallet",
    sku: "ACC-WLT-004",
    category: "Accessories",
    description: "Slim leather wallet with RFID protection.",
    price: 34.99,
    comparePrice: null,
    costPerItem: 14.00,
    quantity: 220,
    stockStatus: "in_stock",
    featured: false,
    tags: ["leather", "wallet", "minimal"],
    images: [{ id: 4, url: "https://picsum.photos/seed/prod-wallet-l/400/400.jpg" }],
    variants: [],
    image: "https://picsum.photos/seed/prod-wallet-l/400/400.jpg",
  },
  {
    id: 5,
    name: "Oversized Graphic Hoodie",
    sku: "HOD-GRF-005",
    category: "Hoodies",
    description: "Cozy oversized hoodie with exclusive graphic print.",
    price: 69.99,
    comparePrice: 89.99,
    costPerItem: 28.00,
    quantity: 52,
    stockStatus: "in_stock",
    featured: true,
    tags: ["hoodie", "graphic", "oversized"],
    images: [{ id: 5, url: "https://picsum.photos/seed/prod-hoodie-g/400/400.jpg" }],
    variants: [],
    image: "https://picsum.photos/seed/prod-hoodie-g/400/400.jpg",
  },
  {
    id: 6,
    name: "Vintage Denim Jacket",
    sku: "JCK-VDJ-006",
    category: "Jackets",
    description: "Classic vintage-wash denim jacket.",
    price: 89.99,
    comparePrice: null,
    costPerItem: 38.00,
    quantity: 3,
    stockStatus: "low_stock",
    featured: false,
    tags: ["denim", "jacket", "vintage"],
    images: [{ id: 6, url: "https://picsum.photos/seed/prod-jacket-v/400/400.jpg" }],
    variants: [],
    image: "https://picsum.photos/seed/prod-jacket-v/400/400.jpg",
  },
  {
    id: 7,
    name: "Striped Cotton Polo",
    sku: "TSH-STR-007",
    category: "T-Shirts",
    description: "Classic striped polo in premium pique cotton.",
    price: 44.99,
    comparePrice: null,
    costPerItem: 18.00,
    quantity: 88,
    stockStatus: "in_stock",
    featured: false,
    tags: ["polo", "striped", "cotton"],
    images: [{ id: 7, url: "https://picsum.photos/seed/prod-polo-s/400/400.jpg" }],
    variants: [],
    image: "https://picsum.photos/seed/prod-polo-s/400/400.jpg",
  },
  {
    id: 8,
    name: "Canvas Tote Bag",
    sku: "ACC-TOT-008",
    category: "Bags",
    description: "Durable canvas tote with inner pocket.",
    price: 25.99,
    comparePrice: 34.99,
    costPerItem: 9.00,
    quantity: 0,
    stockStatus: "out_of_stock",
    featured: false,
    tags: ["canvas", "tote", "bag"],
    images: [{ id: 8, url: "https://picsum.photos/seed/prod-tote-c/400/400.jpg" }],
    variants: [],
    image: "https://picsum.photos/seed/prod-tote-c/400/400.jpg",
  },
];
const ProductsPage = () => {
  const [products, setProducts] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }

    if (categoryFilter !== "All") {
      result = result.filter((p) => p.category === categoryFilter);
    }

    if (stockFilter !== "All") {
      const statusMap = {
        "In Stock": "in_stock",
        "Low Stock": "low_stock",
        "Out of Stock": "out_of_stock",
      };
      result = result.filter((p) => p.stockStatus === statusMap[stockFilter]);
    }

    switch (sortBy) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name_asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name_desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "stock_desc":
        result.sort((a, b) => b.quantity - a.quantity);
        break;
      case "stock_asc":
        result.sort((a, b) => a.quantity - b.quantity);
        break;
      case "oldest":
        result.sort((a, b) => a.id - b.id);
        break;
      default:
        result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [products, searchQuery, categoryFilter, stockFilter, sortBy]);

  const handleSaveProduct = (productData) => {
    if (productData.id) {
      // Edit
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === productData.id) {
            const mainImage = productData.images?.[0]?.url || p.image;
            return { ...p, ...productData, image: mainImage };
          }
          return p;
        })
      );
    } else {
      // Add
      const newProduct = {
        ...productData,
        id: Date.now(),
        image: productData.images?.[0]?.url || "https://picsum.photos/seed/new-prod/400/400.jpg",
      };
      setProducts((prev) => [newProduct, ...prev]);
    }
    setEditingProduct(null);
  };

  const handleDeleteProduct = (product) => {
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
    setDeletingProduct(null);
  };

  const handleToggleFeatured = (product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, featured: !p.featured } : p))
    );
  };

  const handleDuplicate = (product) => {
    const dup = {
      ...product,
      id: Date.now(),
      name: `${product.name} (Copy)`,
      sku: `${product.sku}-COPY`,
      featured: false,
    };
    setProducts((prev) => [dup, ...prev]);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("All");
    setStockFilter("All");
    setShowFilters(false);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Products</h1>
            <p className="text-sm text-gray-400 mt-1">
              Manage your product catalog ({products.length} total)
            </p>
          </div>
        </div>

        {/* Filters */}
        <ProductFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          stockFilter={stockFilter}
          onStockChange={setStockFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          onClearFilters={handleClearFilters}
          onAddProduct={() => setEditingProduct({ __new: true })}
          resultCount={filteredProducts.length}
          totalCount={products.length}
        />

        {/* Product Grid / List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode="grid"
                onEdit={setEditingProduct}
                onDelete={setDeletingProduct}
                onToggleFeatured={handleToggleFeatured}
                onDuplicate={handleDuplicate}
                onView={() => {}}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {/* List Header */}
            <div className="hidden md:flex items-center gap-4 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              <span className="w-16">Image</span>
              <span className="flex-1">Product</span>
              <span className="w-24 text-right">Price</span>
              <span className="w-28">Status</span>
              <span className="w-16 text-center">Stock</span>
              <span className="w-10" />
            </div>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode="list"
                onEdit={setEditingProduct}
                onDelete={setDeletingProduct}
                onToggleFeatured={handleToggleFeatured}
                onDuplicate={handleDuplicate}
                onView={() => {}}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-3xl">📦</span>
            </div>
            <p className="text-base font-semibold text-gray-600">No products found</p>
            <p className="text-sm text-gray-400 mt-1 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => setEditingProduct({ __new: true })}
              className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-xl transition-colors shadow-sm shadow-indigo-200"
            >
              Add Your First Product
            </button>
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      {editingProduct && (
        <ProductFormModal
          product={editingProduct.__new ? null : editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleSaveProduct}
        />
      )}

      {/* Delete Confirm */}
      {deletingProduct && (
        <DeleteConfirmModal
          product={deletingProduct}
          onClose={() => setDeletingProduct(null)}
          onConfirm={handleDeleteProduct}
        />
      )}
    </div>
  );
};

export default ProductsPage;