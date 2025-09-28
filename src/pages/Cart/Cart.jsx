import { useState } from "react";


function Cart() {
  const [cart, setCart] = useState([
    { 
      id: 1, 
      name: "Ноутбук ASUS", 
      price: 45000, 
      qty: 1, 
      image: "/images/img1.jpg",
      description: "Мощный ноутбук с Intel i5, 8 ГБ ОЗУ и SSD 512 ГБ. Отлично подходит для работы и игр."
    },
    { 
      id: 2, 
      name: "Кроссовки Nike", 
      price: 12000, 
      qty: 2, 
      image: "/images/img2.jpg",
      description: "Стильные и удобные кроссовки для ежедневной носки и спорта."
    },
    { 
      id: 3, 
      name: "Смартфон Samsung", 
      price: 32000, 
      qty: 1, 
      image: "/images/img3.jpg",
      description: "Смартфон с AMOLED экраном, 128 ГБ памяти и камерой 50 МП. Отлично подходит для фото и видео."
    },
  ]);

  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);

  const updateQty = (id, qty) => {
    setCart(cart.map(item => item.id === id ? { ...item, qty: Math.max(1, qty) } : item));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const applyPromo = () => {
    if (promo.toLowerCase() === "sale10") {
      const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
      setDiscount(subtotal * 0.1);
      alert("Промокод применен! Скидка 10%");
    } else {
      setDiscount(0);
      alert("Неверный промокод");
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal - discount;
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

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
                    <button onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                    <input 
                      type="number" 
                      value={item.qty} 
                      min="1" 
                      onChange={(e) => updateQty(item.id, +e.target.value)} 
                    />
                    <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  </div>
                  <span className="price">{item.price * item.qty} сом</span>
                </div>
                <button className="remove-btn" onClick={() => removeItem(item.id)}>✖</button>
              </li>
            ))}
          </ul>

          <div className="promo">
            <input 
              type="text" 
              value={promo} 
              placeholder="Введите промокод" 
              onChange={(e) => setPromo(e.target.value)} 
            />
            <button onClick={applyPromo}>Применить</button>
          </div>

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
