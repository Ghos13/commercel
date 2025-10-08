import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header({ cart }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <header className="hs-header">
      <div className="hs-inner">
        {/* Логотип */}
        <Link to="/" className="hs-logo">
          🛒 DTS
        </Link>

        {/* Правая панель */}
        <div className="hs-right">
          <button className="hs-theme-btn" onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <Link to="/cart" className="hs-cart">
            🛒
            {cart?.length > 0 && (
              <span className="hs-cart-count">{cart.length}</span>
            )}
          </Link>

          <Link to="/login" className="hs-login">
            Войти
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
