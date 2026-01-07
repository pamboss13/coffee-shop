"use client";

import { useState, useEffect, useCallback } from "react";
import ProductForm from "./components/ProductForm";
import ProductsTable from "./components/ProductsTable";

type Category = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  categoryId: string | null;
  category: Category | null;
  imageUrl: string | null;
  available: boolean;
  createdAt: string;
};

type Tab = "products" | "categories" | "orders";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleProductSuccess = () => {
    fetchProducts();
    setEditingProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (product: Product) => {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) {
      return;
    }

    setDeletingId(product.id);
    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete product");
      }

      // Refresh the list
      fetchProducts();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  const tabs: { id: Tab; label: string; disabled?: boolean }[] = [
    { id: "products", label: "Products" },
    { id: "categories", label: "Categories", disabled: true },
    { id: "orders", label: "Orders", disabled: true },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Coffee Store Admin
        </h1>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => !tab.disabled && setActiveTab(tab.id)}
                disabled={tab.disabled}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : tab.disabled
                    ? "border-transparent text-gray-300 cursor-not-allowed"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
                {tab.disabled && (
                  <span className="ml-2 text-xs text-gray-400">(Coming soon)</span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Products Tab Content */}
        {activeTab === "products" && (
          <div className="space-y-8">
            {/* Form Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <ProductForm
                product={editingProduct}
                onSuccess={handleProductSuccess}
                onCancel={editingProduct ? handleCancelEdit : undefined}
              />
            </div>

            {/* Products List Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">All Products</h2>
              {isLoading ? (
                <div className="text-center py-8 text-gray-500">
                  Loading products...
                </div>
              ) : (
                <ProductsTable
                  products={products}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                  isDeleting={deletingId}
                />
              )}
            </div>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {activeTab === "categories" && (
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-500">Categories management coming soon...</p>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-500">Orders management coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}
