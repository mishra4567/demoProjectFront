// src/services/AuthService.js
// Laravel Sanctum — confirmed response shape:
// { status: true, message, token, customer: { id, name, email, phone, role, status, ... } }

import { HttpService } from "./HttpService";

export class AuthService {
  http;

  constructor() {
    this.http = new HttpService();
  }

  // ── POST /api/v1/login ───────────────────────────────────────────────────
  async login({ email, password }) {
    try {
      const data = await this.http.post("/login", { email, password });
      // data.status === true, data.token, data.customer confirmed
      if (data?.token && data?.customer) {
        this.setSession(data.token, data.customer);
      }
      return data;
    } catch (error) {
      console.log("AuthService :: login :: error", error);
      throw error;
    }
  }

  // ── POST /api/v1/register ────────────────────────────────────────────────
  async register({ name, email, password, password_confirmation }) {
    try {
      const data = await this.http.post("/register", {
        name,
        email,
        password,
        password_confirmation,
      });
      if (data?.token && data?.customer) {
        this.setSession(data.token, data.customer);
      }
      return data;
    } catch (error) {
      console.log("AuthService :: register :: error", error);
      throw error;
    }
  }

  // ── POST /api/v1/logout ──────────────────────────────────────────────────
  async logout() {
    try {
      await this.http.post("/logout");
    } catch (error) {
      console.log("AuthService :: logout :: error", error);
    } finally {
      this.clearSession();
    }
  }

  // ── GET /api/v1/customer/profile ─────────────────────────────────────────
  async getCurrentUser() {
    try {
      const data = await this.http.get("/customer/profile");
      return data?.customer ?? data;
    } catch (error) {
      console.log("AuthService :: getCurrentUser :: error", error);
      return null;
    }
  }

  // ── Session helpers ──────────────────────────────────────────────────────
  // Only persist the fields we actually use — strip sensitive/internal ones
  setSession(token, customer) {
    localStorage.setItem("auth_token", token);
    localStorage.setItem(
      "auth_customer",
      JSON.stringify({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone ?? null,
        role: customer.role ?? "",
        status: customer.status ?? 1,
      }),
    );
  }

  clearSession() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_customer");
  }

  getToken() {
    return localStorage.getItem("auth_token");
  }
  getUser() {
    return JSON.parse(localStorage.getItem("auth_customer") || "null");
  }
  isAuthenticated() {
    return !!this.getToken();
  }
}

const authService = new AuthService();
export default authService;
