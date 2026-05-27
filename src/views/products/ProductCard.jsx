// src/views/products/ProductCard.jsx
import { Link } from "react-router-dom";
import { Badge } from "../../components";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/productdetails/${product.id}`}
      className="group block bg-surface border border-border rounded-lg
        overflow-hidden hover:border-border-strong hover:shadow-md
        transition-all duration-200"
    >
      {/* Image */}
      <div className="w-full aspect-square bg-surface-raised overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105
              transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-subtle">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v13.5a1.5 1.5 0 001.5 1.5z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 space-y-1.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          {product.category_name && (
            <Badge variant="default">{product.category_name}</Badge>
          )}
          {product.brand_name && (
            <Badge variant="info">{product.brand_name}</Badge>
          )}
        </div>

        <h3 className="font-medium text-text text-sm leading-snug line-clamp-2">
          {product.name}
        </h3>

        {product.short_desc && (
          <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
            {product.short_desc}
          </p>
        )}

        <div className="pt-1">
          <span
            className="text-xs font-medium text-accent
            group-hover:text-accent-hover transition-colors"
          >
            View details →
          </span>
        </div>
      </div>
    </Link>
  );
}
