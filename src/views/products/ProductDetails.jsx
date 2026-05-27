import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductController from "../../controllers/ProductController";
import { Badge } from "../../components";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    ProductController.show(id, setProduct, setLoading, setError);
  }, [id]);

  // Loading
  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  // Error
  if (error) {
    return <div className="py-20 text-center text-red-500">{error}</div>;
  }

  // No Product
  if (!product) {
    return <div className="py-20 text-center">Product not found</div>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-10">
      {/* Product Image */}
      <div>
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full rounded-xl border"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-gray-500 mt-2">{product.short_desc}</p>
        </div>

        {/* Category + Brand */}
        <div className="flex items-center gap-2 flex-wrap">
          {product.category_name && (
            <Badge variant="default" size="sm">
              {product.category_name}
            </Badge>
          )}

          {product.brand_name && (
            <Badge variant="primary" size="sm">
              {product.brand_name}
            </Badge>
          )}

          {!product.status && (
            <Badge variant="danger" size="sm">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Variants */}
        {product.variants?.length > 0 && (
          <div>
            <h2 className="font-semibold mb-2">Variants</h2>

            <div className="space-y-2">
              {product.variants.map((variant) => (
                <div key={variant.id} className="border rounded-lg p-3">
                  <div>SKU: {variant.sku}</div>

                  <div>Price: ₹{variant.price}</div>

                  <div>Size: {variant.size_name}</div>

                  <div className="flex items-center gap-2">
                    Color:
                    <span
                      className="w-5 h-5 rounded-full border"
                      style={{
                        backgroundColor: variant.color_hex,
                      }}
                    />
                    {variant.color_name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery */}
        {product.gallery?.length > 0 && (
          <div>
            <h2 className="font-semibold mb-2">Gallery</h2>

            <div className="grid grid-cols-3 gap-3">
              {product.gallery.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  className="rounded-lg border"
                />
              ))}
            </div>
          </div>
        )}

        {/* Add To Cart */}
        <button className="bg-black text-white px-6 py-3 rounded-lg">
          Add To Cart
        </button>
      </div>
    </div>
  );
}
