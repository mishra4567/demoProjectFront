// src/views/Home.jsx
import { useState, useEffect } from "react";
import ProductController from "../controllers/ProductController";
import ProductGrid from "./products/ProductGrid";
import Pagination from "./products/Pagination";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0,
    perPage: 12,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = (page = 1) => {
    ProductController.index(
      setProducts,
      setPagination,
      setLoading,
      setError,
      page,
    );
  };

  useEffect(() => {
    loadProducts(1);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-text">
            Products
          </h1>
          {!loading && !error && (
            <p className="text-sm text-text-muted mt-0.5">
              {pagination.total} items available
            </p>
          )}
        </div>
      </div>

      {/* Product grid */}
      <ProductGrid products={products} loading={loading} error={error} />

      {/* Pagination */}
      {!loading && !error && (
        <Pagination pagination={pagination} onPageChange={loadProducts} />
      )}
    </div>
  );
}
