import { useState, useContext, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { CategoryContext } from "../../providers/category";
import { BrandContext } from "../../providers/brand";
import { AuthContext } from "../../providers/auth";
import Probimg from "../../images/gaming-laptops-og-image-C_hhqOLl.webp";
import Spinner from "../Spinner.jsx/Spinner";

function Catalog() {
  const { cart, userData, setCart } = useContext(AuthContext);
  const { categoryData, categoryLoading } = useContext(CategoryContext);
  const { brandData, brandLoading } = useContext(BrandContext);

  const [loadingAddToCart, setLoadingAddToCart] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 6;

  // 🔹 Мемоизация fetchProducts
  const fetchProducts = useCallback(async (page = 1, query = "", categories = []) => {
    if (!userData) {
      setError("Пожалуйста, войдите в аккаунт для поиска товаров");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      let url = `${process.env.REACT_APP_API}api/products/?page=${page}`;
      if (query) url += `&q=${encodeURIComponent(query)}`;
      if (categories.length > 0) url += `&category=${categories.join(",")}`;

      console.log("Fetching products with URL:", url); // Для отладки

      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(userData.token && { Authorization: `Bearer ${userData.token}` }),
        },
      });

      if (!res.ok) {
        throw new Error(`Ошибка ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      setProducts(data.results || []);
      setTotalPages(data.num_pages || 1);
    } catch (err) {
      console.error("Ошибка при загрузке товаров:", err);
      setError("Не удалось загрузить товары. Попробуйте снова позже.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [userData]);

  // 🔎 Debounce для поиска
  useEffect(() => {
    if (!userData) return; // Пропускаем, если пользователь не авторизован

    const delayDebounce = setTimeout(() => {
      console.log("Calling fetchProducts with:", { currentPage, searchTerm, selectedCategory }); // Для отладки
      fetchProducts(currentPage, searchTerm, selectedCategory);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [currentPage, searchTerm, selectedCategory, fetchProducts]);

  // 🔹 Первоначальная загрузка
  useEffect(() => {
    if (userData) {
      fetchProducts(1, "", []); // Загружаем товары при монтировании
    }
  }, [fetchProducts]);

  // 🔹 Добавление товара в корзину
  const handleAddToCart = async (product) => {
    setLoadingAddToCart(true);
    try {
      const bodyData = {
        product: product.id,
        count: 1,
        price: product.price,
        product_name: product.title,
      };

      const res = await fetch(`${process.env.REACT_APP_API}accounts/bucket/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(userData.token && { Authorization: `Bearer ${userData.token}` }),
        },
        credentials: "include",
        body: JSON.stringify(bodyData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(`Ошибка при добавлении в корзину: ${err.message || "Неизвестная ошибка"}`);
      }

      const data = await res.json();
      setCart((prev) => {
        const index = prev.findIndex((item) => item.id === data.id);
        if (index !== -1) {
          const updated = [...prev];
          updated[index].count += 1;
          return updated;
        }
        return [...prev, data];
      });
    } catch (err) {
      console.error("Сетевая ошибка:", err);
      setError(err.message);
    } finally {
      setLoadingAddToCart(false);
    }
  };

  const changeSelectedCategory = (id) => {
    setSelectedCategory((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
    );
    setCurrentPage(1);
  };

  return (
    <div className="catalog">
      {error && <p className="error">{error}</p>}

      {categoryLoading ? (
        <Spinner text="Загрузка категорий..." />
      ) : (
        <div className="category-buttons">
          {categoryData.map((cat) => (
            <button
              key={cat.id}
              className={
                selectedCategory.includes(cat.id)
                  ? "category_is_selected"
                  : "category_no_selected"
              }
              onClick={() => changeSelectedCategory(cat.id)}
            >
              {cat.title}
            </button>
          ))}
        </div>
      )}

      {brandLoading ? (
        <Spinner text="Загрузка брендов..." />
      ) : (
        <div className="brand-buttons">
          {brandData.map((brand) => (
            <button key={brand.id}>{brand.title}</button>
          ))}
        </div>
      )}

      <h1>Каталог</h1>

      {userData ? (
        <div className="search-box">
          <input
            type="text"
            placeholder="Поиск товара..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      ) : (
        <p>Пожалуйста, войдите в аккаунт для поиска товаров</p>
      )}

      <div className="products">
        {loading ? (
          <Spinner text="Загрузка товаров..." />
        ) : products.length > 0 ? (
          products.map((prod) => (
            <div key={prod.id} className="product-card">
              <img src={prod.image || Probimg} alt={prod.title} />
              <h3>
                <Link to={`/details/${prod.id}`}>{prod.title}</Link>
              </h3>
              <p>{prod.price} сом</p>
              {userData && (
                <button
                  onClick={() => handleAddToCart(prod)}
                  disabled={loadingAddToCart}
                >
                  {loadingAddToCart ? "⏳ Добавление..." : "В корзину"}
                </button>
              )}
            </div>
          ))
        ) : (
          <p>Товары не найдены</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="prev"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Назад
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="next"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Вперёд
          </button>
        </div>
      )}

      {userData && (
        <div className="cart">
          <h2>Корзина</h2>
          {cart.length > 0 ? (
            <ul>
              {cart.map((item, idx) => (
                <li key={idx}>
                  {item.product_name} - {item.price} сом ({item.count})
                </li>
              ))}
            </ul>
          ) : (
            <p>Корзина пуста</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Catalog;