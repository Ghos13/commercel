import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CategoryContext } from "../../providers/category";
import { BrandContext } from "../../providers/brand";
import { AuthContext } from "../../providers/auth";
import Probimg from "../../images/gaming-laptops-og-image-C_hhqOLl.webp";

function Catalog() {
  const { cart,userData,setCart } = useContext(AuthContext);
  const { categoryData, categoryLoading } = useContext(CategoryContext);
  const { brandData, brandLoading } = useContext(BrandContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 🔹 Пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 6;

  const fetchProducts = async (page = 1, query = "") => {
    setLoading(true);
    try {
      let url = `${process.env.REACT_APP_API}api/products/?page=${page}`;
      if (query) {
        url += `&q=${encodeURIComponent(query)}`;
      }

      const res = await fetch(url);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      const data = await res.json();
      setProducts(data.results || []);
      setTotalPages(
        data.num_pages
      );
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    // 🔎 Вызываем fetch при изменении страницы или поискового запроса
    const delayDebounce = setTimeout(() => {
      fetchProducts(currentPage, searchTerm);
    }, 300); // небольшой дебаунс, чтобы не слать запрос при каждом нажатии клавиши

    return () => clearTimeout(delayDebounce);
  }, [currentPage, searchTerm]);

  const handleAddToCart = async (product) => {
  try {
    const bodyData = {
      product: product.id,  
      count: 1,          
      price: product.price,
      product_name: product.title
    };

    const res = await fetch(`${process.env.REACT_APP_API}accounts/bucket/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(bodyData),
    });

    if (res.ok) {
      const data = await res.json();

        setCart((prev) => {
        // ищем индекс объекта с таким же id
        const index = prev.findIndex(item => item.id === data.id);
      
        if (index !== -1) {
          // если есть — увеличиваем count
          const updated = [...prev];
          updated[index].count += 1;
          return updated;
        } else {
          // если нет — добавляем новый объект
          return [...prev, data];
        }
      });
    } else {
      const err = await res.json();
      console.error("Ошибка при добавлении в корзину:", err);
    }
  } catch (error) {
    console.error("Сетевая ошибка:", error);
  }
  };

  return (
    <div className="catalog">
      {/* Категории */}
      {categoryLoading ? (
        <h2>Загрузка категорий...</h2>
      ) : (
        <div className="category-buttons">
          {categoryData.map((cat) => (
            <button key={cat.id}>{cat.title}</button>
          ))}
        </div>
      )}

      {/* Бренды */}
      {brandLoading ? (
        <h2>Загрузка брендов...</h2>
      ) : (
        <div className="brand-buttons">
          {brandData.map((brand) => (
            <button key={brand.id}>{brand.title}</button>
          ))}
        </div>
      )}

      <h1>Каталог</h1>

      {/* 🔎 Поиск */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Поиск товара..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // сброс на первую страницу при поиске
          }}
        />
      </div>

      {/* 🛍️ Товары */}
      <div className="products">
        {loading ? (
          <p>Загрузка товаров...</p>
        ) : products.length > 0 ? (
          products.map((prod) => (
            <div key={prod.id} className="product-card">
              <img src={prod.cover || Probimg} alt={prod.title} />
              <h3>
                <Link to={`/details/${prod.id}`}>{prod.title}</Link>
              </h3>
              <p>{prod.price} сом</p>
              { userData && 
              <button onClick={() => handleAddToCart(prod)}>В корзину</button>
              }
            </div>
          ))
        ) : (
          <p>Товары не найдены</p>
        )}
      </div>

      {/* 📌 Пагинация */}
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

      {/* 🛒 Корзина */}

      { userData && 
      <div className="cart">
        <h2>Корзина</h2>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item, idx) => (
              <li key={idx}>
                {item.product_name} - {item.price} сом  ( {item.count} )
              </li>
            ))}
          </ul>
        ) : (
          <p>Корзина пуста</p>
        )}
      </div>
      }
    </div>
  );
}

export default Catalog;
