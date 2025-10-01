import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Простая локальная валидация
    if (!email || !password) {
      setError("Пожалуйста, заполните все поля");
      return;
    }

    setLoading(true);
    setError("");

    // Эмуляция запроса к серверу
    setTimeout(() => {
      if (email === "user@example.com" && password === "123456") {
        setError("");
        if (rememberMe) {
          localStorage.setItem("user", JSON.stringify({ email }));
        }
        navigate("/catalog");
      } else {
        setError("Неверный email или пароль");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Вход в аккаунт</h2>

        {error && <p className="error">{error}</p>}

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Введите email"
          required
        />

        <label>Пароль:</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            required
          />
          <button
            type="button"
            className="show-pass"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Скрыть" : "Показать"}
          </button>
        </div>

        <div className="remember-forgot">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Запомнить меня
          </label>
          <Link to="/forgot">Забыли пароль?</Link>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Вход..." : "Войти"}
        </button>

        <p>
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
