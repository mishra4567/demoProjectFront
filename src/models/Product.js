// src/models/Product.js
import httpService from "../services/HttpService";

const Product = {
  /**
   * GET /api/v1/products?page=1
   * @param {number} page
   */
  all: (page = 1) => httpService.get(`/products?page=${page}`),

  /**
   * GET /api/v1/products/:id
   * @param {number|string} id
   */
  find: (id) => httpService.get(`/products/${id}`),
};

export default Product;
