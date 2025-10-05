import { useState, useContext } from "react";
import { AuthContext } from "../../providers/auth.js";
import Spinner from "../Spinner.jsx/Spinner.jsx";
import OrderModal from "../../components/order/OrderModal.jsx";

function Cart() {
  const { cart, setCart, userData, setUserData } = useContext(AuthContext);

  const [discount, setDiscount] = useState(0);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [modal,setModal] = useState();

  const updateQty = async (id, qty) => {
    try {
      setLoadingUpdate(true); 
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

  const order = () => {

      setModal(<OrderModal set_func={setModal} />);

  }

  return (
    <div className="cart-page">
      {  modal && (
           <div
             className="modal-container"
             onClick={() => setModal(null)} 
           >
             <div
               className="modal-content"
               onClick={(e) => e.stopPropagation()} 
             >
               {modal}
             </div>
           </div>
      )}

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
                  <span className="name">{item.product_name}</span>
                  <span className="description">{item.description}</span>
                  <span className="unit-price">{item.price} сом / {item.count} шт</span>
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
          
          { userData.orders.length == 0 ? 
          <button
            className="checkout-btn"
            onClick={() => order()}
          >
            ✅ Перейти к оплате
          </button> :

          <button className="checkout-btn">
            У вас активный заказ 
          </button>
          }
        </div>
      )}
      

    </div>

  );
}

export default Cart;
