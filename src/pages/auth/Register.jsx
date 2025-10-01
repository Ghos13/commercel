import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Пожалуйста, заполните все поля");
      return;
    }

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    if (!agree) {
      setError("Вы должны принять условия использования");
      return;
    }

    setLoading(true);
    setError("");

    // Эмуляция регистрации
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("user", JSON.stringify({ name, email }));
      navigate("/catalog");
    }, 1000);
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Регистрация</h2>

        {error && <p className="error">{error}</p>}

        <label>Имя:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя"
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Введите email"
          required
        />

        <label>Пароль:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
          required
        />

        <label>Подтвердите пароль:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Повторите пароль"
          required
        />

        <div className="agree">
          <label>
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
            />
            Я принимаю <Link to="/terms">условия использования</Link>
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Регистрация..." : "Зарегистрироваться"}
        </button>

        <p>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
