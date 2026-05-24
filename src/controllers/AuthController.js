// src/controllers/AuthController.js
// Bridges views ↔ AuthService. No axios here — all HTTP is in AuthService.

import authService from "../services/AuthService";

const AuthController = {
  /**
   * Login — called from Login.jsx
   * @param {{ email: string, password: string }} formData
   * @param {{ login: Function }} authContext  - from useAuth()
   * @param {Function} navigate               - from useNavigate()
   * @param {Function} setError
   * @param {Function} setLoading
   */
  login: async (formData, { login }, navigate, setError, setLoading) => {
    try {
      setLoading(true);
      setError("");

      const data = await authService.login(formData);
      // authService already persisted token + customer to localStorage

      login(data.customer); // update React context → triggers re-render
      navigate("/"); // redirect to home/dashboard
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Invalid credentials. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  },

  /**
   * Register — called from Register.jsx
   * @param {{ name: string, email: string, password: string, password_confirmation: string }} formData
   * @param {{ login: Function }} authContext
   * @param {Function} navigate
   * @param {Function} setError
   * @param {Function} setLoading
   */
  register: async (formData, setError, setLoading) => {
    try {
      setLoading(true);
      setError("");

      const data = await authService.register(formData);

      return data; // ← return data, let Register.jsx handle login + navigate
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Registration failed. Please try again.",
      );
      return null;
    } finally {
      setLoading(false);
    }
  },

  /**
   * Logout — called from Header.jsx
   * authService.logout() hits POST /api/v1/logout + clears localStorage
   * Then authContext.logout() resets React state
   * @param {{ logout: Function }} authContext
   * @param {Function} navigate
   */
  logout: async ({ logout }, navigate) => {
    try {
      await authService.logout(); // revoke Sanctum token on server
    } catch (_) {
      // silently fail — token may already be invalid
    } finally {
      logout(); // clear localStorage + reset context
      navigate("/");
    }
  },

  /**
   * Refresh profile from server — useful after profile update
   * @param {{ refresh: Function }} authContext
   */
  refreshProfile: async ({ refresh }) => {
    const customer = await authService.getCurrentUser();
    if (customer) {
      // re-persist fresh data then sync context
      authService.setSession(authService.getToken(), customer);
      refresh();
    }
  },
};

export default AuthController;
