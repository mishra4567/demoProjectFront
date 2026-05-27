// src/views/products/ProductGrid.jsx
import ProductCard from "./ProductCard";
import { Spinner, Alert } from "../../components";

export default function ProductGrid({ products, loading, error }) {
  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner size="lg" />
      </div>
    );

  if (error) return <Alert variant="danger">{error}</Alert>;

  if (!products.length)
    return (
      <div className="text-center py-20 text-text-muted text-sm">
        No products found.
      </div>
    );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
