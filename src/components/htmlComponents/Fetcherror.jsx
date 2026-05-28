// src/views/errors/FetchError.jsx
// Demo page — shows what a fetch error looks like + how to debug it.
// Drop this into a route like /debug/fetch-error during development.

import { useState } from "react";
import { Link } from "react-router-dom";

// ── Status configs ────────────────────────────────────────────────────────────
const SCENARIOS = [
  {
    id: "network",
    label: "Failed to fetch",
    status: null,
    color: "danger",
    icon: "ti-wifi-off",
    cause: "Server is not running or the base URL is wrong.",
    fixes: [
      { code: "php artisan serve", desc: "Start the Laravel server" },
      {
        code: "console: BaseURL → http://127.0.0.1:8000/api/v1",
        desc: "Check the URL in browser console",
      },
      {
        code: "VITE_LARAVEL_BASE_URL=http://127.0.0.1:8000",
        desc: "Verify .env matches config.js key",
      },
    ],
  },
  {
    id: "cors",
    label: "CORS blocked",
    status: null,
    color: "warning",
    icon: "ti-shield-off",
    cause: "Browser blocked the request — server missing CORS headers.",
    fixes: [
      {
        code: "$middleware->api(prepend: [HandleCors::class]);",
        desc: "bootstrap/app.php — add HandleCors",
      },
      {
        code: "'allowed_origins' => ['http://localhost:5173']",
        desc: "config/cors.php — add Vite origin",
      },
      {
        code: "php artisan config:clear",
        desc: "Clear config cache after changes",
      },
    ],
  },
  {
    id: "401",
    label: "401 Unauthorized",
    status: 401,
    color: "warning",
    icon: "ti-lock",
    cause: "No token sent, or Sanctum token is invalid / expired.",
    fixes: [
      {
        code: "headers['Authorization'] = `Bearer ${token}`",
        desc: "HttpService — attach token to request",
      },
      {
        code: "localStorage.getItem('auth_token')",
        desc: "Check token exists in localStorage",
      },
      {
        code: "Route::middleware('auth:sanctum')",
        desc: "Laravel — confirm route uses Sanctum guard",
      },
    ],
  },
  {
    id: "422",
    label: "422 Unprocessable",
    status: 422,
    color: "warning",
    icon: "ti-forms",
    cause: "Laravel validation failed — check the errors object.",
    fixes: [
      {
        code: "data.errors → { email: ['The email field is required.'] }",
        desc: "Errors is an object of arrays",
      },
      {
        code: "Object.values(data.errors).flat()[0]",
        desc: "HttpService unpacks first error message",
      },
      {
        code: "Validator::make($request->all(), [...rules])",
        desc: "Check Laravel validation rules",
      },
    ],
  },
  {
    id: "404",
    label: "404 Not Found",
    status: 404,
    color: "info",
    icon: "ti-route-off",
    cause: "Endpoint doesn't exist — wrong URL or route not registered.",
    fixes: [
      {
        code: "php artisan route:list --path=api",
        desc: "List all registered API routes",
      },
      {
        code: "Route::prefix('v1')->group(fn() => ...)",
        desc: "Confirm /api/v1 prefix in api.php",
      },
      {
        code: "httpService.get('/products')",
        desc: "Check endpoint string matches route",
      },
    ],
  },
  {
    id: "500",
    label: "500 Server Error",
    status: 500,
    color: "danger",
    icon: "ti-bug",
    cause: "Laravel threw an exception — check laravel.log.",
    fixes: [
      {
        code: "storage/logs/laravel.log",
        desc: "Read the full stack trace here",
      },
      {
        code: "APP_DEBUG=true",
        desc: ".env — enable debug for JSON error detail",
      },
      {
        code: "Non-JSON response from server: <!DOCTYPE html>",
        desc: "HttpService catches HTML 500 pages",
      },
    ],
  },
];

const COLOR_CLASSES = {
  danger: {
    badge: "bg-danger-subtle text-danger border-danger/20",
    icon: "text-danger",
  },
  warning: {
    badge: "bg-warning-subtle text-warning-fg border-warning/20",
    icon: "text-warning",
  },
  info: {
    badge: "bg-info-subtle text-info-fg border-info/20",
    icon: "text-info",
  },
};

// ── Components ────────────────────────────────────────────────────────────────
function StatusPill({ status, color }) {
  const c = COLOR_CLASSES[color] ?? COLOR_CLASSES.info;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full
      text-[11px] font-bold border ${c.badge}`}
    >
      {status ?? "Network"}
    </span>
  );
}

function CodeSnip({ code }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div
      className="flex items-center gap-2 bg-bg-subtle border border-border
      rounded-md px-3 py-1.5 font-mono text-xs text-text group"
    >
      <span className="flex-1 truncate">{code}</span>
      <button
        onClick={copy}
        aria-label="Copy"
        className="shrink-0 text-text-subtle hover:text-accent transition-colors"
      >
        <i className={`ti ${copied ? "ti-check text-success" : "ti-copy"}`} />
      </button>
    </div>
  );
}

function ScenarioCard({ scenario, active, onClick }) {
  const c = COLOR_CLASSES[scenario.color] ?? COLOR_CLASSES.info;
  return (
    <button
      onClick={onClick}
      className={[
        "w-full text-left px-4 py-3 rounded-lg border transition-all duration-150",
        active
          ? "bg-surface border-accent shadow-sm"
          : "bg-surface border-border hover:border-border-strong hover:bg-surface-raised",
      ].join(" ")}
    >
      <div className="flex items-center gap-2.5">
        <i
          className={`ti ${scenario.icon} text-base ${c.icon}`}
          aria-hidden="true"
        />
        <span className="text-sm font-semibold text-text flex-1">
          {scenario.label}
        </span>
        <StatusPill status={scenario.status} color={scenario.color} />
      </div>
    </button>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function FetchError() {
  const [active, setActive] = useState(SCENARIOS[0]);

  const c = COLOR_CLASSES[active.color] ?? COLOR_CLASSES.info;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-text-muted mb-3">
          <Link to="/" className="hover:text-text transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-text-subtle">Debug</span>
          <span>/</span>
          <span className="text-text">Fetch Errors</span>
        </div>
        <h1 className="font-display text-2xl font-bold text-text mb-1">
          Fetch error reference
        </h1>
        <p className="text-sm text-text-muted">
          Click a scenario to see the cause and how to fix it.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Scenario list */}
        <div className="flex flex-col gap-2">
          {SCENARIOS.map((s) => (
            <ScenarioCard
              key={s.id}
              scenario={s}
              active={active.id === s.id}
              onClick={() => setActive(s)}
            />
          ))}
        </div>

        {/* Detail panel */}
        <div className="md:col-span-2 bg-surface border border-border rounded-xl overflow-hidden">
          {/* Panel header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
            <span
              className={`w-9 h-9 rounded-lg flex items-center justify-center
              border ${c.badge}`}
            >
              <i className={`ti ${active.icon} text-lg`} aria-hidden="true" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-semibold text-base text-text">
                  {active.label}
                </h2>
                <StatusPill status={active.status} color={active.color} />
              </div>
              <p className="text-xs text-text-muted mt-0.5">{active.cause}</p>
            </div>
          </div>

          {/* Mock error alert */}
          <div className="mx-5 mt-5">
            <div
              className={`flex items-start gap-3 px-4 py-3 rounded-lg border
              ${c.badge} text-sm`}
            >
              <i
                className={`ti ${active.icon} mt-0.5 shrink-0`}
                aria-hidden="true"
              />
              <div>
                <p className="font-semibold">{active.label}</p>
                <p className="text-xs opacity-80 mt-0.5">{active.cause}</p>
              </div>
            </div>
          </div>

          {/* Fixes */}
          <div className="px-5 py-5 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-subtle">
              How to fix
            </h3>
            <ol className="space-y-3">
              {active.fixes.map((fix, i) => (
                <li key={i} className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-5 h-5 rounded-full bg-surface-raised border border-border
                      flex items-center justify-center text-[10px] font-bold text-text-muted shrink-0"
                    >
                      {i + 1}
                    </span>
                    <span className="text-xs text-text-muted">{fix.desc}</span>
                  </div>
                  <div className="pl-7">
                    <CodeSnip code={fix.code} />
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* HttpService note */}
          <div className="mx-5 mb-5 px-4 py-3 rounded-lg bg-bg-subtle border border-border">
            <p className="text-xs text-text-muted leading-relaxed">
              <span className="font-semibold text-text">
                Check the console first —{" "}
              </span>
              <code className="font-mono bg-surface px-1 py-0.5 rounded text-[11px] border border-border">
                HttpService
              </code>{" "}
              logs{" "}
              <code className="font-mono bg-surface px-1 py-0.5 rounded text-[11px] border border-border">
                BaseURL →
              </code>{" "}
              on every page load. If it shows{" "}
              <code className="font-mono bg-surface px-1 py-0.5 rounded text-[11px] border border-border text-danger">
                undefined/api/v1
              </code>{" "}
              your{" "}
              <code className="font-mono bg-surface px-1 py-0.5 rounded text-[11px] border border-border">
                .env
              </code>{" "}
              key name doesn't match{" "}
              <code className="font-mono bg-surface px-1 py-0.5 rounded text-[11px] border border-border">
                config.js
              </code>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
