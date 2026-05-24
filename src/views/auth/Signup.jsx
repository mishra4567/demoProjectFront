// src/views/auth/Register.jsx
// 21.05.2026

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthController from "../../controllers/AuthController";
import { Button, Input, Alert } from "../../components";

/* ── eye icon ── */
const EyeIcon = ({ open }) =>
  open ? (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
      <path
        fillRule="evenodd"
        d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
        clipRule="evenodd"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path
        fillRule="evenodd"
        d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z"
        clipRule="evenodd"
      />
      <path d="M10.748 13.93l2.523 2.523a10.04 10.04 0 01-6.27 0l2.523-2.523a2.5 2.5 0 001.224 0zM6.364 17.382l-1.53-1.53A9.958 9.958 0 012 10.999a10 10 0 011.58-5.394l1.53 1.53A7.96 7.96 0 003 11a7.96 7.96 0 003.364 6.382z" />
    </svg>
  );

/* ── password strength ── */
function strengthOf(pw) {
  if (!pw) return { score: 0, label: "" };
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return { score: s, label: ["", "Weak", "Fair", "Good", "Strong"][s] };
}

const strengthColor = (s) =>
  [
    "",
    "var(--color-danger)",
    "var(--color-warning)",
    "var(--color-info)",
    "var(--color-success)",
  ][s] || "";

const strengthBg = (s) =>
  [
    "",
    "var(--color-danger-subtle)",
    "var(--color-warning-subtle)",
    "var(--color-info-subtle)",
    "var(--color-success-subtle)",
  ][s] || "";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth(); // push customer into global state

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showPwC, setShowPwC] = useState(false);
  const [done, setDone] = useState(false);

  const strength = strengthOf(form.password);

  // ── Client-side validation ─────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address";
    if (form.password.length < 8)
      e.password = "Password must be at least 8 characters";
    if (form.password !== form.password_confirmation)
      e.password_confirmation = "Passwords do not match";
    setFieldErrors(e);
    return !Object.keys(e).length;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setFieldErrors((er) => ({ ...er, [e.target.name]: "" }));
    setError("");
  };

  // ── Submit — calls AuthController.register with your exact signature ───────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // ✅ AuthController.register only does the API call + returns data
    const data = await AuthController.register(form, setError, setLoading);
    console.log("data:", data);
    console.log("customer:", data?.customer);
    console.log("status:", data?.customer?.status);
    if (data?.customer) {
      login(data.customer); // ✅ update React context FIRST — component still mounted
      setDone(true); // show success screen
      setTimeout(() => navigate("/"), 1600); // then navigate after 1.6s
    }
    // await AuthController.register(
    //   form, // { name, email, password, password_confirmation }
    //   { login }, // AuthContext — login(customer) updates global state
    //   (path) => {
    //     // Custom navigate: show success screen first, then redirect
    //     setDone(true);
    //     setTimeout(() => navigate(path), 1600);
    //   },
    //   setError, // (message: string) => void
    //   setLoading, // (bool) => void
    // );
  };

  /* ── Success screen ── */
  if (done)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--color-bg-base)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "var(--color-success-subtle)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-success)"
              strokeWidth="2.5"
              style={{ width: 32, height: 32 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 24,
              fontWeight: 700,
              color: "var(--color-text)",
              marginBottom: 6,
            }}
          >
            You're in!
          </h2>
          <p style={{ color: "var(--color-text-muted)", fontSize: 14 }}>
            Redirecting to your store…
          </p>
        </div>
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "var(--color-bg-base)",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* ── LEFT: brand panel ── */}
      <div
        className="register-left-panel"
        style={{
          display: "none",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "44%",
          flexShrink: 0,
          background: "var(--color-surface)",
          borderRight: "1px solid var(--color-border)",
          padding: "48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative blob */}
        <svg
          viewBox="0 0 600 600"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            top: -120,
            right: -150,
            opacity: 0.06,
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <g transform="translate(300,300)">
            <path
              fill="var(--color-accent)"
              d="M120,-157C153,-129,174,-88,185,-44C196,0,196,47,178,87C160,127,123,160,82,177C40,193,-6,193,-50,178C-95,162,-137,131,-163,89C-189,47,-198,-6,-186,-56C-174,-106,-141,-154,-100,-181C-58,-208,-8,-215,36,-204C80,-193,87,-185,120,-157Z"
            />
          </g>
        </svg>

        <div style={{ position: "relative", zIndex: 1 }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: 20,
              letterSpacing: "-.5px",
              color: "var(--color-text)",
            }}
          >
            Shop<span style={{ color: "var(--color-accent)" }}>App</span>
          </span>
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 12px",
              borderRadius: 99,
              fontSize: 12,
              fontWeight: 700,
              background: "var(--color-accent-subtle)",
              color: "var(--color-warning-fg)",
              border: "1px solid rgba(217,119,6,.22)",
              width: "fit-content",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "currentColor",
                display: "inline-block",
                animation: "pulse 1.5s infinite",
              }}
            />
            Trusted by 40,000+ shoppers
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-1.5px",
              fontSize: "clamp(2rem,3.2vw,2.7rem)",
              color: "var(--color-text)",
            }}
          >
            Your favourite
            <br />
            <span style={{ color: "var(--color-accent)" }}>brands,</span>
            <br />
            one place.
          </h1>

          <p
            style={{
              fontSize: 14,
              lineHeight: 1.65,
              color: "var(--color-text-muted)",
              maxWidth: 300,
            }}
          >
            Create a free account and unlock exclusive deals, faster checkout,
            and real-time order tracking.
          </p>

          <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              "Free shipping on orders above ₹499",
              "Easy 30-day returns",
              "Real-time order tracking",
            ].map((f) => (
              <li
                key={f}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 13.5,
                  color: "var(--color-text-muted)",
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: "var(--color-success-subtle)",
                    color: "var(--color-success)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    style={{ width: 10, height: 10 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2 6l3 3 5-5"
                    />
                  </svg>
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <p
          style={{
            position: "relative",
            zIndex: 1,
            fontSize: 11.5,
            color: "var(--color-text-subtle)",
          }}
        >
          © 2026 ShopApp. All rights reserved.
        </p>
      </div>

      {/* ── RIGHT: form ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px",
          minWidth: 0,
        }}
      >
        <div
          className="mobile-logo"
          style={{ marginBottom: 32, alignSelf: "flex-start" }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: 19,
              color: "var(--color-text)",
            }}
          >
            Shop<span style={{ color: "var(--color-accent)" }}>App</span>
          </span>
        </div>

        <div style={{ width: "100%", maxWidth: 400 }}>
          {/* Heading */}
          <div style={{ marginBottom: 28 }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 24,
                letterSpacing: "-.5px",
                color: "var(--color-text)",
                marginBottom: 6,
              }}
            >
              Create your account
            </h2>
            <p style={{ fontSize: 14, color: "var(--color-text-muted)" }}>
              Already have one?{" "}
              <Link
                to="/login"
                style={{
                  color: "var(--color-accent)",
                  fontWeight: 600,
                  textDecorationLine: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* API / server error */}
          {error && (
            <div style={{ marginBottom: 20 }}>
              <Alert variant="danger" onDismiss={() => setError("")}>
                {error}
              </Alert>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            noValidate
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <Input
              label="Full name"
              name="name"
              type="text"
              placeholder="Arjun Mehta"
              value={form.name}
              onChange={handleChange}
              error={fieldErrors.name}
              autoComplete="name"
              autoFocus
            />

            <Input
              label="Email address"
              name="email"
              type="email"
              placeholder="arjun@example.com"
              value={form.email}
              onChange={handleChange}
              error={fieldErrors.email}
              autoComplete="email"
            />

            {/* Password + strength meter */}
            <div>
              <div style={{ position: "relative" }}>
                <Input
                  label="Password"
                  name="password"
                  type={showPw ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  error={fieldErrors.password}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label="Toggle password visibility"
                  style={{
                    position: "absolute",
                    right: 12,
                    top: 34,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--color-text-subtle)",
                    padding: 0,
                    lineHeight: 1,
                  }}
                >
                  <EyeIcon open={showPw} />
                </button>
              </div>

              {form.password && (
                <div
                  style={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <div style={{ display: "flex", gap: 4 }}>
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        style={{
                          height: 4,
                          flex: 1,
                          borderRadius: 99,
                          transition: "background .3s",
                          background:
                            i <= strength.score
                              ? strengthColor(strength.score)
                              : "var(--color-border)",
                        }}
                      />
                    ))}
                  </div>
                  <p
                    style={{
                      fontSize: 11.5,
                      color: "var(--color-text-subtle)",
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    Strength:{" "}
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: 11.5,
                        padding: "1px 7px",
                        borderRadius: 99,
                        background: strengthBg(strength.score),
                        color: strengthColor(strength.score),
                      }}
                    >
                      {strength.label}
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div style={{ position: "relative" }}>
              <Input
                label="Confirm password"
                name="password_confirmation"
                type={showPwC ? "text" : "password"}
                placeholder="Repeat your password"
                value={form.password_confirmation}
                onChange={handleChange}
                error={fieldErrors.password_confirmation}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPwC((v) => !v)}
                aria-label="Toggle confirm password visibility"
                style={{
                  position: "absolute",
                  right: 12,
                  top: 34,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--color-text-subtle)",
                  padding: 0,
                  lineHeight: 1,
                }}
              >
                <EyeIcon open={showPwC} />
              </button>
            </div>

            {/* Terms */}
            <p
              style={{
                fontSize: 12,
                color: "var(--color-text-subtle)",
                lineHeight: 1.6,
                marginTop: -4,
              }}
            >
              By creating an account you agree to our{" "}
              <a
                href="#"
                style={{
                  color: "var(--color-text-muted)",
                  textDecorationLine: "underline",
                  textUnderlineOffset: 2,
                }}
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                style={{
                  color: "var(--color-text-muted)",
                  textDecorationLine: "underline",
                  textUnderlineOffset: 2,
                }}
              >
                Privacy Policy
              </a>
              .
            </p>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
            >
              Create account
            </Button>
          </form>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              margin: "24px 0",
            }}
          >
            <span
              style={{ flex: 1, height: 1, background: "var(--color-border)" }}
            />
            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "var(--color-text-subtle)",
              }}
            >
              or continue with
            </span>
            <span
              style={{ flex: 1, height: 1, background: "var(--color-border)" }}
            />
          </div>

          {/* OAuth buttons */}
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            {[
              {
                name: "Google",
                icon: (
                  <svg viewBox="0 0 24 24" style={{ width: 16, height: 16 }}>
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                ),
              },
              {
                name: "GitHub",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ width: 16, height: 16 }}
                  >
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                ),
              },
            ].map(({ name, icon }) => (
              <button
                key={name}
                type="button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "10px 16px",
                  borderRadius: 9,
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "var(--font-sans)",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text)",
                  cursor: "pointer",
                  transition: "all .15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    "var(--color-border-strong)";
                  e.currentTarget.style.background =
                    "var(--color-surface-raised)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.background = "var(--color-surface)";
                }}
              >
                {icon} {name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .register-left-panel { display: flex !important; }
          .mobile-logo { display: none !important; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: .4; }
        }
      `}</style>
    </div>
  );
}
