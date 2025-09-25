import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Probimg from "../../images/gaming-laptops-og-image-C_hhqOLl.webp";
function Catalog() {
  const allProducts = [
    {
      id: 1,
      name: "Ноутбук ASUS",
      price: 45000,
      category: "Электроника",
      image: Probimg,
    },
    {
      id: 2,
      name: "Смартфон Samsung",
      price: 32000,
      category: "Электроника",
      image: Probimg,
    },
    {
      id: 3,
      name: "Наушники JBL",
      price: 8000,
      category: "Аудио",
      image: Probimg,
    },
    {
      id: 4,
      name: "Кроссовки Nike",
      price: 12000,
      category: "Одежда",
      image: Probimg,
    },
    {
      id: 5,
      name: "Футболка Adidas",
      price: 2500,
      category: "Одежда",
      image: Probimg,
    },
    {
      id: 6,
      name: "Телевизор LG",
      price: 55000,
      category: "Электроника",
      image: Probimg,
    },
    {
      id: 7,
      name: "Мышь Logitech",
      price: 3000,
      category: "Электроника",
      image: Probimg,
    },
    {
      id: 8,
      name: "Куртка Puma",
      price: 9000,
      category: "Одежда",
      image: Probimg,
    },
    {
      id: 9,
      name: "Кофеварка Philips",
      price: 15000,
      category: "Бытовая техника",
      image: Probimg,
    },
  ];

  const categories = [
    "Все",
    "Электроника",
    "Аудио",
    "Одежда",
    "Бытовая техника",
  ];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [cart, setCart] = useState([]);

  const pageSize = 6;

  // Фильтрация
  let filtered = allProducts.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  if (category !== "Все") {
    filtered = filtered.filter((item) => item.category === category);
  }

  // Сортировка
  if (sort === "priceAsc") {
    filtered = filtered.sort((a, b) => a.price - b.price);
  }
  if (sort === "priceDesc") {
    filtered = filtered.sort((a, b) => b.price - a.price);
  }

  // Пагинация
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Добавление в корзину
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  ////
  const navigate = useNavigate();

  const goToCheckout = () => {
    navigate("/checkout", { state: { cart } });
  };

  // Кнопка
  return (
    <div className="catalog">
      <h1>Каталог</h1>

      {/* Фильтры */}
      <div className="filters">
        <input
          type="text"
          placeholder="Поиск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Сортировка</option>
          <option value="priceAsc">Цена: по возрастанию</option>
          <option value="priceDesc">Цена: по убыванию</option>
        </select>
      </div>

      {/* Товары */}
      {paginated.length > 0 ? (
        <div className="products">
          {paginated.map((item) => (
            <div key={item.id} className="card">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.price} сом</p>
              <button onClick={() => addToCart(item)}>В корзину</button>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty">Товары не найдены</p>
      )}

      {/* Пагинация */}
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Назад
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={page === i + 1 ? "active" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Вперёд
        </button>
      </div>

      {/* Корзина */}
      <div className="cart">
        <h2>Корзина</h2>
        {cart.length === 0 ? (
          <p>Корзина пуста</p>
        ) : (
          <ul>
            {cart.map((item, i) => (
              <li key={i}>
                <span>{item.name}</span>
                <span>{item.price} сом</span>
              </li>
            ))}
          </ul>
        )}
        <button onClick={goToCheckout}>Оформить заказ</button>
      </div>
    </div>
  );
}

export default Catalog;
