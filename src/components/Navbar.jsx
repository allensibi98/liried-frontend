import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-brand">
        <div className="logo" aria-label="Liried logo">L</div>
        <span className="company-name">Liried</span>
      </div>
      <div className="navbar-links">
        <Link to="/dashboard" aria-label="Navigate to dashboard">Dashboard</Link>
        <Link to="/products" aria-label="Navigate to products">Products</Link>
        <button
          onClick={logout}
          className="logout-btn"
          aria-label="Logout from application"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default memo(Navbar);
