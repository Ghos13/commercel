import { useState } from "react";


function Cart() {
  // Моковые товары в корзине (можно заменить на props или загрузку с сервера)
  const [cart, setCart] = useState([
    { id: 1, name: "Ноутбук ASUS", price: 45000, qty: 1, image: "/images/img1.jpg" },
    { id: 2, name: "Кроссовки Nike", price: 12000, qty: 2, image: "/images/img2.jpg" },
    { id: 3, name: "Смартфон Samsung", price: 32000, qty: 1, image: "/images/img3.jpg" },
  ]);

  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);

  // Изменение количества
  const updateQty = (id, qty) => {
    setCart(cart.map(item => item.id === id ? { ...item, qty: Math.max(1, qty) } : item));
  };

  // Удаление товара
  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Применение промокода
  const applyPromo = () => {
    if (promo.toLowerCase() === "sale10") {
      const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
      setDiscount(subtotal * 0.1);
    } else {
      setDiscount(0);
      alert("Неверный промокод");
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal - discount;

  return (
    <div className="sebet">
      <h1>Себет</h1>
      {cart.length === 0 ? (
        <p className="empty">Корзина пуста</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map(item => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <span className="name">{item.name}</span>
                <input 
                  type="number" 
                  value={item.qty} 
                  min="1" 
                  onChange={(e) => updateQty(item.id, +e.target.value)} 
                />
                <span className="price">{item.price * item.qty} сом</span>
                <button className="remove-btn" onClick={() => removeItem(item.id)}>Удалить</button>
              </li>
            ))}
          </ul>

         

          <div className="summary">
            <p>Скидка: {discount} сом</p>
            <p className="total">Итого: {total} сом</p>
          </div>

          <button className="checkout-btn" onClick={() => alert("Переход к оплате")}>
            Перейти к оплате
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
