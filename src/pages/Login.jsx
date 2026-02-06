import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        username: e.target.username.value,
        password: e.target.password.value,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Product Management</h2>
        <form onSubmit={submit}>
          <input
            name="username"
            placeholder="Username"
            required
            autoFocus
            aria-label="Username"
            disabled={loading}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            aria-label="Password"
            disabled={loading}
          />
          {error && <p style={{ color: "#e74c3c", textAlign: "center" }}>{error}</p>}
          {loading ? (
            <LoadingSpinner size="small" message="Logging in..." />
          ) : (
            <button type="submit">Login</button>
          )}
        </form>
      </div>
    </div>
  );
}
