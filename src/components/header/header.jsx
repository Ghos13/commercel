import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/auth.js";

function Header({ cart }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { userData, setUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLogout = () => {
    setUserData(null);
    localStorage.removeItem("userData");
    navigate("/login");
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

          {/* 👇 Корзина отображается только если пользователь авторизован */}
          {userData && (
            <Link to="/cart" className="hs-cart">
              🛒
              {cart?.length > 0 && (
                <span className="hs-cart-count">{cart.length}</span>
              )}
            </Link>
          )}

          {/* 👇 Если не авторизован — Войти, если авторизован — Выйти */}
          {!userData ? (
            <Link to="/login" className="hs-login">
              Войти
            </Link>
          ) : (
            <button className="hs-login" onClick={handleLogout}>
              Выйти
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
