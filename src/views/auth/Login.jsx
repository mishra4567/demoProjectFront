// src/views/auth/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Card, Alert } from "../../components/index";
import { useAuth } from "../../context/AuthContext";
import AuthController from "../../controllers/AuthController";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = () =>
    AuthController.login(form, { login }, navigate, setError, setLoading);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-base">
      <Card className="w-full max-w-sm p-6 flex flex-col gap-4">
        <Card.Header>Login</Card.Header>

        <Card.Body className="flex flex-col gap-4">
          {error && (
            <Alert variant="danger" onDismiss={() => setError("")}>
              {error}
            </Alert>
          )}

          <Input
            name="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={handle}
            placeholder="you@example.com"
            autoComplete="email"
          />

          <Input
            name="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handle}
            placeholder="••••••••"
            autoComplete="current-password"
          />

          <Button onClick={submit} loading={loading} fullWidth>
            Login
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
