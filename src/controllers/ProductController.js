// src/controllers/ProductController.js
import Product from "../models/Product";

const ProductController = {
  /**
   * Fetch paginated products and push into state
   * @param {Function} setProducts
   * @param {Function} setPagination
   * @param {Function} setLoading
   * @param {Function} setError
   * @param {number}   page
   */
  index: async (setProducts, setPagination, setLoading, setError, page = 1) => {
    try {
      setLoading(true);
      setError("");

      const data = await Product.all(page);
      // { status: true, products: { data: [...], current_page, last_page, total, per_page } }

      setProducts(data.products.data);
      setPagination({
        currentPage: data.products.current_page,
        lastPage: data.products.last_page,
        total: data.products.total,
        perPage: data.products.per_page,
      });
    } catch (err) {
      setError(err?.message || "Failed to load products.");
    } finally {
      setLoading(false);
    }
  },
  /**
   * GET /api/v1/products/:id
   * Fetch a single product and push into state.
   *
   * @param {number|string} id
   * @param {Function}      setProduct  - (product) => void
   * @param {Function}      setLoading  - (boolean) => void
   * @param {Function}      setError    - (string) => void
   */
  show: async (id, setProduct, setLoading, setError) => {
    try {
      setLoading(true);
      setError("");

      const data = await Product.find(id);
      // { status: true, product: { ... } }

      setProduct(data.product);
    } catch (err) {
      setError(err?.message || "Failed to load product.");
    } finally {
      setLoading(false);
    }
  },
};

export default ProductController;
