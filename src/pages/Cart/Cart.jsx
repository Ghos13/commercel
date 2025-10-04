import { useState, useContext } from "react";
import { AuthContext } from "../../providers/auth.js";
import Spinner from "../Spinner.jsx/Spinner.jsx";
function Cart() {
  const { cart, setCart, userData, setUserData } = useContext(AuthContext);

  const [discount, setDiscount] = useState(0);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const updateQty = async (id, qty) => {
    try {
      setLoadingUpdate(true); // старт загрузки
      let operation;

      if (qty === "inc" || qty === "dec") {
        operation = qty;
      } else {
        const numberQty = Math.max(1, Number(qty));
        operation = numberQty.toString();
      }

      const response = await fetch(
        `${process.env.REACT_APP_API}accounts/bucket/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ operation }),
        }
      );

      if (response.status === 200) {
        const updatedItem = await response.json();
        setCart(
          cart.map((item) =>
            item.id === id ? { ...item, count: updatedItem.count } : item
          )
        );
      } else if (response.status === 204) {
        setCart(cart.filter((item) => item.id !== id));
      } else {
        console.error("Ошибка при обновлении количества:", response.status);
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
    } finally {
      setLoadingUpdate(false); // конец загрузки
    }
  };

  const removeItem = async (id) => {
    try {
      setLoadingDelete(true); // старт загрузки
      const response = await fetch(
        `${process.env.REACT_APP_API}accounts/bucket/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (response.status === 204) {
        setCart(cart.filter((item) => item.id !== id));
      } else {
        console.error("Ошибка при удалении товара:", response.status);
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
    } finally {
      setLoadingDelete(false); // конец загрузки
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.count, 0);
  const total = subtotal - discount;
  const totalItems = cart.reduce((sum, item) => sum + item.count, 0);

  // Если идет любая загрузка
  if (loadingUpdate || loadingDelete) {
    return <Spinner text={"Загрузка товара..."} />;
  }

  return (
    <div className="cart-page">
      <h1>🛒 Себет</h1>

      {cart.length === 0 ? (
        <p className="empty">Ваша корзина пуста. Добавьте товары!</p>
      ) : (
        <div className="cart-container">
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-image" />
                <div className="cart-details">
                  <span className="name">{item.name}</span>
                  <span className="description">{item.description}</span>
                  <span className="unit-price">{item.price} сом / шт</span>
                  <div className="qty-control">
                    <button
                      disabled={loadingUpdate}
                      onClick={() => updateQty(item.id, "dec")}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.count}
                      min="1"
                      disabled={loadingUpdate}
                      onChange={(e) => updateQty(item.id, +e.target.value)}
                    />
                    <button
                      disabled={loadingUpdate}
                      onClick={() => updateQty(item.id, "inc")}
                    >
                      +
                    </button>
                  </div>
                  <span className="price">{item.price * item.count} сом</span>
                </div>
                <button
                  disabled={loadingDelete}
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>

          <div className="summary">
            <p>
              Товаров: <strong>{totalItems}</strong>
            </p>
            <p>
              Сумма без скидки: <strong>{subtotal} сом</strong>
            </p>
            <p>
              Скидка: <strong>{discount} сом</strong>
            </p>
            <p className="total">
              Итого: <strong>{total} сом</strong>
            </p>
          </div>

          <button
            className="checkout-btn"
            onClick={() => alert("Переход к оплате")}
          >
            ✅ Перейти к оплате
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
