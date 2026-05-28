// src/services/HttpService.js

import config from "../config/config";

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} status
 * @property {string}  [message]
 * @property {Object}  [errors]   - Laravel 422 validation errors
 */

export class HttpService {
  /** @type {string} */
  baseUrl;

  constructor() {
    this.baseUrl = `${config.demoprojectApiBaseUrl}${config.apiPrefix}`;
    // console.log("BaseURL →", this.baseUrl);
    // → "http://127.0.0.1:8000/api/v1"
  }

  /**
   * Build request headers.
   * Called fresh on every request so auth_token is always current.
   * @returns {Record<string, string>}
   */
  getHeaders() {
    /** @type {Record<string, string>} */
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    const token = localStorage.getItem("auth_token");
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
  }

  /**
   * Core fetch wrapper — all HTTP methods route through here.
   * @param {string}      method
   * @param {string}      endpoint
   * @param {Object|null} body
   * @returns {Promise<any>}
   */
  async request(method, endpoint, body = null) {
    const options = {
      method,
      headers: this.getHeaders(),
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, options);

    // ── Safe JSON parse ──────────────────────────────────────────────
    // .json() throws if body is empty (logout, 204, etc.)
    // Always read as text first, then parse only if there's content
    const text = await response.text();

    /** @type {ApiResponse & Record<string, any>} */
    let data = null;

    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        // Laravel returned HTML (500 error page, redirect, etc.)
        throw new Error(`Non-JSON response from server: ${text.slice(0, 150)}`);
      }
    }

    // ── Handle errors ────────────────────────────────────────────────
    if (!response.ok || data?.status === false) {
      // 422 Unprocessable — validation errors
      if (response.status === 422 && data?.errors) {
        const firstError = Object.values(data.errors).flat()[0];
        throw new Error(
          /** @type {string} */ (firstError) || "Validation failed",
        );
      }
      // 401, 403, 500, etc.
      throw new Error(data?.message || `Request failed (${response.status})`);
    }

    return data;
  }

  /** @param {string} endpoint */
  get(endpoint) {
    return this.request("GET", endpoint);
  }

  /** @param {string} endpoint @param {Object} body */
  post(endpoint, body) {
    return this.request("POST", endpoint, body);
  }

  /** @param {string} endpoint @param {Object} body */
  put(endpoint, body) {
    return this.request("PUT", endpoint, body);
  }

  /** @param {string} endpoint @param {Object} body */
  patch(endpoint, body) {
    return this.request("PATCH", endpoint, body);
  }

  /** @param {string} endpoint */
  delete(endpoint) {
    return this.request("DELETE", endpoint);
  }
}

const httpService = new HttpService();
export default httpService;
