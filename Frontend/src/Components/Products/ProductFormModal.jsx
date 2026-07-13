import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Upload,
  ImagePlus,
  Trash2,
  GripVertical,
  Plus,
  Minus,
  AlertCircle,
  Info,
  DollarSign,
  Tag,
  Package,
  Layers,
} from "lucide-react";

const emptyProduct = {
  name: "",
  description: "",
  sku: "",
  category: "",
  price: "",
  comparePrice: "",
  costPerItem: "",
  quantity: "",
  stockStatus: "in_stock",
  featured: false,
  tags: [],
  images: [],
  variants: [],
};

const categories = ["T-Shirts", "Jeans", "Sneakers", "Accessories", "Hoodies", "Jackets", "Shorts", "Bags"];

const ProductFormModal = ({ product, onClose, onSave }) => {
  const isEditing = !!product;
  const [form, setForm] = useState(isEditing ? { ...product } : { ...emptyProduct });
  const [tagInput, setTagInput] = useState("");
  const [activeTab, setActiveTab] = useState("general");
  const [errors, setErrors] = useState({});
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const tabs = [
    { id: "general", label: "General", icon: Tag },
    { id: "pricing", label: "Pricing", icon: DollarSign },
    { id: "inventory", label: "Inventory", icon: Package },
    { id: "images", label: "Images", icon: ImagePlus },
    { id: "variants", label: "Variants", icon: Layers },
  ];

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !form.tags.includes(tag)) {
      updateField("tags", [...form.tags, tag]);
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    updateField("tags", form.tags.filter((t) => t !== tag));
  };

  const handleImageUpload = (files) => {
    const newImages = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      name: file.name,
      file,
    }));
    updateField("images", [...form.images, ...newImages]);
  };

  const removeImage = (id) => {
    updateField("images", form.images.filter((img) => img.id !== id));
  };

  const addVariant = () => {
    updateField("variants", [
      ...form.variants,
      { id: Date.now(), name: "", sku: "", price: "", quantity: "" },
    ]);
  };

  const updateVariant = (id, field, value) => {
    updateField(
      "variants",
      form.variants.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  const removeVariant = (id) => {
    updateField("variants", form.variants.filter((v) => v.id !== id));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Product name is required";
    if (!form.category) e.category = "Category is required";
    if (!form.sku.trim()) e.sku = "SKU is required";
    if (!form.price || parseFloat(form.price) < 0) e.price = "Valid price is required";
    if (form.quantity === "" || parseInt(form.quantity) < 0) e.quantity = "Quantity is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      // Switch to first tab with error
      if (errors.name || errors.category || errors.sku) setActiveTab("general");
      if (errors.price) setActiveTab("pricing");
      if (errors.quantity) setActiveTab("inventory");
      return;
    }
    onSave({
      ...form,
      price: parseFloat(form.price),
      comparePrice: form.comparePrice ? parseFloat(form.comparePrice) : null,
      costPerItem: form.costPerItem ? parseFloat(form.costPerItem) : null,
      quantity: parseInt(form.quantity),
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-8 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl mb-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <div>
            <h2 className="text-lg font-bold text-gray-800">
              {isEditing ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="text-sm text-gray-400 mt-0.5">
              {isEditing ? `Editing #${form.sku}` : "Fill in the product details below"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex">
          {/* Tab Navigation */}
          <div className="w-48 border-r border-gray-100 py-4 px-3 flex-shrink-0 hidden md:block">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                    {errors[tab.id === "general" ? "name" : tab.id === "pricing" ? "price" : "quantity"] && (
                      <AlertCircle size={13} className="text-rose-500 ml-auto" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Mobile Tabs */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20 flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-all ${
                    activeTab === tab.id ? "text-indigo-600" : "text-gray-400"
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-6 min-h-[500px] md:mb-0 mb-16">
            {/* ===== GENERAL TAB ===== */}
            {activeTab === "general" && (
              <div className="space-y-5 max-w-xl">
                <FormField
                  label="Product Name"
                  required
                  error={errors.name}
                  value={form.name}
                  onChange={(v) => updateField("name", v)}
                  placeholder="e.g. Classic White T-Shirt"
                />
                <FormField
                  label="Description"
                  type="textarea"
                  value={form.description}
                  onChange={(v) => updateField("description", v)}
                  placeholder="Describe your product..."
                  rows={4}
                />
                <FormField
                  label="SKU"
                  required
                  error={errors.sku}
                  value={form.sku}
                  onChange={(v) => updateField("sku", v)}
                  placeholder="e.g. TSH-WHT-001"
                  hint="Unique product identifier"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  {errors.category && (
                    <p className="text-xs text-rose-500 mb-1.5">{errors.category}</p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => updateField("category", cat)}
                        className={`px-3.5 py-2 rounded-xl text-sm font-medium border transition-all ${
                          form.category === cat
                            ? "bg-indigo-50 border-indigo-200 text-indigo-600"
                            : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {form.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-lg"
                      >
                        #{tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="text-gray-400 hover:text-rose-500 transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                      placeholder="Add a tag..."
                      className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
                    />
                    <button
                      onClick={addTag}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-sm font-medium transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className={`relative w-10 h-6 rounded-full transition-colors ${form.featured ? "bg-indigo-500" : "bg-gray-200"}`}>
                    <div
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${form.featured ? "translate-x-4" : ""}`}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Featured Product</span>
                </label>
              </div>
            )}

            {/* ===== PRICING TAB ===== */}
            {activeTab === "pricing" && (
              <div className="space-y-5 max-w-xl">
                <FormField
                  label="Selling Price"
                  required
                  error={errors.price}
                  value={form.price}
                  onChange={(v) => updateField("price", v)}
                  placeholder="0.00"
                  prefix="$"
                  type="number"
                  hint="The price customers will pay"
                />
                <FormField
                  label="Compare at Price"
                  value={form.comparePrice}
                  onChange={(v) => updateField("comparePrice", v)}
                  placeholder="0.00"
                  prefix="$"
                  type="number"
                  hint="Original price before discount (shown with strikethrough)"
                />
                {form.price && form.comparePrice && parseFloat(form.comparePrice) > parseFloat(form.price) && (
                  <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <Info size={16} className="text-emerald-600 flex-shrink-0" />
                    <p className="text-sm text-emerald-700">
                      Discount: <span className="font-bold">{Math.round(((form.comparePrice - form.price) / form.comparePrice) * 100)}% off</span>
                      {" "}(${(form.comparePrice - form.price).toFixed(2)} savings)
                    </p>
                  </div>
                )}
                <FormField
                  label="Cost Per Item"
                  value={form.costPerItem}
                  onChange={(v) => updateField("costPerItem", v)}
                  placeholder="0.00"
                  prefix="$"
                  type="number"
                  hint="How much it costs you to produce or purchase"
                />
                {form.price && form.costPerItem && (
                  <div className="p-4 bg-gray-50 rounded-xl space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Profit per item</span>
                      <span className={`font-bold ${(form.price - form.costPerItem) >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                        ${Math.max(0, form.price - form.costPerItem).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Margin</span>
                      <span className={`font-bold ${(form.price - form.costPerItem) / form.price * 100 >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                        {Math.max(0, ((form.price - form.costPerItem) / form.price * 100)).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ===== INVENTORY TAB ===== */}
            {activeTab === "inventory" && (
              <div className="space-y-5 max-w-xl">
                <FormField
                  label="Quantity"
                  required
                  error={errors.quantity}
                  value={form.quantity}
                  onChange={(v) => updateField("quantity", v)}
                  placeholder="0"
                  type="number"
                  hint="Number of items available"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock Status</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: "in_stock", label: "In Stock", color: "emerald" },
                      { value: "low_stock", label: "Low Stock", color: "amber" },
                      { value: "out_of_stock", label: "Out of Stock", color: "rose" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => updateField("stockStatus", opt.value)}
                        className={`px-4 py-3 rounded-xl text-sm font-medium border-2 transition-all text-center ${
                          form.stockStatus === opt.value
                            ? opt.color === "emerald"
                              ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                              : opt.color === "amber"
                              ? "border-amber-400 bg-amber-50 text-amber-700"
                              : "border-rose-400 bg-rose-50 text-rose-700"
                            : "border-gray-200 text-gray-500 hover:border-gray-300"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex gap-2">
                    <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-700">
                      <p className="font-medium">Low Stock Alert</p>
                      <p className="text-amber-600 mt-0.5">You'll be notified when stock falls below 10 units.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===== IMAGES TAB ===== */}
            {activeTab === "images" && (
              <div className="space-y-5 max-w-2xl">
                {/* Upload Zone */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    handleImageUpload(e.dataTransfer.files);
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`
                    relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer
                    transition-all duration-200
                    ${dragOver
                      ? "border-indigo-400 bg-indigo-50/50"
                      : "border-gray-300 hover:border-indigo-300 hover:bg-gray-50"
                    }
                  `}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e.target.files)}
                  />
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Upload size={22} className="text-gray-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    Drop images here or <span className="text-indigo-500">browse</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG, WEBP up to 5MB each. Max 8 images.
                  </p>
                </div>

                {/* Image Grid */}
                {form.images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {form.images.map((img, i) => (
                      <div
                        key={img.id}
                        className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group"
                      >
                        <img
                          src={img.url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                        {i === 0 && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 bg-indigo-500 text-white text-[10px] font-bold rounded-md">
                            MAIN
                          </span>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          {i !== 0 && (
                            <button
                              onClick={() => {
                                const newImgs = [form.images[i], ...form.images.filter((_, idx) => idx !== i)];
                                updateField("images", newImgs);
                              }}
                              className="p-1.5 bg-white/90 rounded-lg text-gray-700 hover:bg-white transition-colors"
                              title="Set as main"
                            >
                              <GripVertical size={14} />
                            </button>
                          )}
                          <button
                            onClick={() => removeImage(img.id)}
                            className="p-1.5 bg-white/90 rounded-lg text-rose-500 hover:bg-white transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {form.images.length === 0 && (
                  <div className="text-center py-8">
                    <ImagePlus size={40} className="text-gray-200 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">No images uploaded yet</p>
                  </div>
                )}
              </div>
            )}

            {/* ===== VARIANTS TAB ===== */}
            {activeTab === "variants" && (
              <div className="space-y-5 max-w-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Product Variants</p>
                    <p className="text-xs text-gray-400 mt-0.5">Different versions of your product (size, color, etc.)</p>
                  </div>
                  <button
                    onClick={addVariant}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-xl hover:bg-indigo-100 transition-colors"
                  >
                    <Plus size={14} /> Add Variant
                  </button>
                </div>

                {form.variants.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl">
                    <Layers size={40} className="text-gray-200 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-500">No variants added</p>
                    <p className="text-xs text-gray-400 mt-1">Add variants like different sizes or colors</p>
                    <button
                      onClick={addVariant}
                      className="mt-4 px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded-xl hover:bg-indigo-600 transition-colors"
                    >
                      Add First Variant
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {form.variants.map((variant, i) => (
                      <div
                        key={variant.id}
                        className="p-4 border border-gray-200 rounded-xl space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-500">Variant {i + 1}</span>
                          <button
                            onClick={() => removeVariant(variant.id)}
                            className="p-1 text-gray-400 hover:text-rose-500 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <input
                            type="text"
                            value={variant.name}
                            onChange={(e) => updateVariant(variant.id, "name", e.target.value)}
                            placeholder="e.g. Size M"
                            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
                          />
                          <input
                            type="text"
                            value={variant.sku}
                            onChange={(e) => updateVariant(variant.id, "sku", e.target.value)}
                            placeholder="SKU"
                            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
                          />
                          <input
                            type="number"
                            value={variant.price}
                            onChange={(e) => updateVariant(variant.id, "price", e.target.value)}
                            placeholder="Price"
                            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
                          />
                          <input
                            type="number"
                            value={variant.quantity}
                            onChange={(e) => updateVariant(variant.id, "quantity", e.target.value)}
                            placeholder="Qty"
                            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50 sticky bottom-0 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-xl transition-colors shadow-sm shadow-indigo-200"
          >
            {isEditing ? "Save Changes" : "Create Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Form Field
const FormField = ({
  label,
  required,
  error,
  value,
  onChange,
  placeholder,
  type = "text",
  prefix,
  hint,
  rows,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {label}
      {required && <span className="text-rose-500 ml-0.5">*</span>}
    </label>
    {error && <p className="text-xs text-rose-500 mb-1.5 flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
    {type === "textarea" ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all resize-none ${error ? "border-rose-300" : "border-gray-200"}`}
      />
    ) : (
      <div className="relative">
        {prefix && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{prefix}</span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full ${prefix ? "pl-7" : "pl-3.5"} pr-3.5 py-2.5 bg-white border rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all ${error ? "border-rose-300" : "border-gray-200"}`}
        />
      </div>
    )}
    {hint && !error && (
      <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
        <Info size={11} />{hint}
      </p>
    )}
  </div>
);

export default ProductFormModal;