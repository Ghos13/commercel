import { useState,useContext } from "react";
import Prom from "../../images/gaming-laptops-og-image-C_hhqOLl.webp";
import { AuthContext  } from "../../providers/auth.js";

function Cart() {
  const {cart,setCart,userData, setUserData} = useContext(AuthContext);

  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);

  const updateQty = (id, qty) => {
    setCart(cart.map(item => item.id === id ? { ...item, count: Math.max(1, qty) } : item));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.count, 0);
  const total = subtotal - discount;
  const totalItems = cart.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="cart-page">
      <h1>🛒 Себет</h1>

      {cart.length === 0 ? (
        <p className="empty">Ваша корзина пуста. Добавьте товары!</p>
      ) : (
        <div className="cart-container">
          <ul className="cart-list">
            {cart.map(item => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-image" />
                <div className="cart-details">
                  <span className="name">{item.name}</span>
                  <span className="description">{item.description}</span>
                  <span className="unit-price">{item.price} сом / шт</span>
                  <div className="qty-control">
                    <button onClick={() => updateQty(item.id, item.count - 1)}>-</button>
                    <input 
                      type="number" 
                      value={item.qty} 
                      min="1" 
                      onChange={(e) => updateQty(item.id, +e.target.value)} 
                    />
                    <button onClick={() => updateQty(item.id, item.count + 1)}>+</button>
                  </div>
                  <span className="price">{item.price * item.count} сом</span>
                </div>
                <button className="remove-btn" onClick={() => removeItem(item.id)}>✖</button>
              </li>
            ))}
          </ul>

         

          <div className="summary">
            <p>Товаров: <strong>{totalItems}</strong></p>
            <p>Сумма без скидки: <strong>{subtotal} сом</strong></p>
            <p>Скидка: <strong>{discount} сом</strong></p>
            <p className="total">Итого: <strong>{total} сом</strong></p>
          </div>

          <button className="checkout-btn" onClick={() => alert("Переход к оплате")}>
            ✅ Перейти к оплате
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
