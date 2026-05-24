// src/context/AuthContext.jsx
// Provides reactive auth state to the entire app.
// Components re-render automatically when the customer logs in or out.

import { createContext, useContext, useState, useCallback } from "react";
// import AuthController from "../controllers/AuthController";

/**
 * @typedef {Object} Customer
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {string|null} phone
 * @property {string} role
 * @property {number} status
 */

/**
 * @typedef {Object} AuthContextValue
 * @property {Customer|null} customer      - Currently logged-in customer
 * @property {boolean}       isAuth        - true if token + active
 * @property {Function}      login         - Call after successful login
 * @property {Function}      logout        - Clears session + resets state
 * @property {Function}      refresh       - Re-reads customer from localStorage
 */

const AuthContext = createContext(/** @type {AuthContextValue} */ ({}));
const TOKEN_KEY = "auth_token";
const CUSTOMER_KEY = "auth_customer";

function readCutomer() {
  try {
    const customer = localStorage.getItem(CUSTOMER_KEY);
    return customer ? JSON.parse(customer) : null;
  } catch (error) {
    console.log("AuthContext :: readCustomer :: error", error);
    return null;
  }
}

export function AuthProvider({ children }) {
  // Initialise from localStorage so page refresh keeps the user logged in
  const [customer, setCustomer] = useState(() => readCutomer());

  const isAuth = !!customer && (customer.status ?? 1) === 1;

  /**
   * Called by Login / Register views inside onSuccess.
   * Also persists to localStorage so a hard refresh keeps the session.
   * @param {Customer} customerData
   */
  const login = useCallback((customerData) => {
    // ✅ persist to localStorage immediately
    localStorage.setItem(
      CUSTOMER_KEY,
      JSON.stringify({
        id: customerData.id,
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone ?? null,
        role: customerData.role ?? "",
        status: customerData.status ?? 1,
      }),
    );
    setCustomer(customerData); // update React state → triggers re-render
  }, []);

  /**
   * Calls AuthController.logout (hits /api/v1/logout + clears localStorage)
   * then resets React state so Navbar, guards etc. all update instantly.
   */
  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(CUSTOMER_KEY);
    setCustomer(null);
  }, []);

  /**
   * Re-reads customer from localStorage.
   * Useful after a profile update.
   */
  const refresh = useCallback(() => {
    setCustomer(readCutomer());
  }, []);

  return (
    <AuthContext.Provider value={{ customer, isAuth, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook — use anywhere inside the app.
 * const { customer, isAuth, logout } = useAuth();
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

export default AuthContext;
