import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Input, Button, Card, Alert } from "../../components/index";
// import AuthController from "../../controllers/AuthController";

export default function Login() {
  // const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  // const [error, setError] = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  // const submit = () => AuthController.login(form, navigate, setError);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-base">
      <Card className="w-full max-w-sm p-6 flex flex-col gap-4">
        <Card.Header>Login</Card.Header>
        <Card.Body className="flex flex-col gap-4">
          {/* {error && <Alert variant="danger">{error}</Alert>} */}
          <Input
            name="email"
            label="Email"
            value={form.email}
            onChange={handle}
          />
          <Input
            name="password"
            label="Password"
            value={form.password}
            onChange={handle}
            type="password"
          />
          <Button
            // onClick={submit}
            fullWidth>
            Login
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
