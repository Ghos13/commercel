import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CategoryContext } from "../../providers/category";
import { BrandContext } from "../../providers/brand";
import { AuthContext } from "../../providers/auth";
import Probimg from "../../images/gaming-laptops-og-image-C_hhqOLl.webp";
import Spinner from "../Spinner.jsx/Spinner";

function Catalog() {
  const { cart,userData,setCart } = useContext(AuthContext);
  const { categoryData, categoryLoading } = useContext(CategoryContext);
  const { brandData, brandLoading } = useContext(BrandContext);
  const [loadingAddToCart, setLoadingAddToCart] = useState(false);





















  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");



  // 🔹 Пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 6;
  
  const [selectedBrands,setSelectedBrands] = useState([]);
  const [selectedCategory,setSelectedCategory] = useState([]);


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
      setLoadingAddToCart(true); // начало загрузки

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
        },
        credentials: "include",
        body: JSON.stringify(bodyData),
      });

      if (res.ok) {
        const data = await res.json();

        setCart((prev) => {
          const index = prev.findIndex((item) => item.id === data.id);

          if (index !== -1) {
            // если товар уже есть в корзине — увеличиваем количество
            const updated = [...prev];
            updated[index].count += 1;
            return updated;
          } else {
            // если нового товара нет — добавляем
            return [...prev, data];
          }
        });
      } else {
        const err = await res.json();
        console.error("Ошибка при добавлении в корзину:", err);
      }
    } catch (error) {
      console.error("Сетевая ошибка:", error);
    } finally {
      setLoadingAddToCart(false); // конец загрузки
    }
  };



  const changeSelectedCategory = (id) => {
    console.log(selectedCategory);
    setSelectedCategory((prev) => {
      if (prev.includes(id)) {
         return prev.filter((catId) => catId !== id);
       } else {
         return [...prev, id];
       }
    })
  }

  return (
    <div className="catalog">
      {/* Категории */}
      {categoryLoading ? (
    <Spinner text={"Загрузка категорий..."} />
) : (
        <div className="category-buttons">
          {categoryData.map((cat) => {
            const class_name = selectedCategory.includes(cat.id) ? "category_is_selected" : "category_no_selected";

            return <button key={cat.id} className={class_name} onClick={() => changeSelectedCategory(cat.i)}>{cat.title}</button>
          } 
          )}
        </div>
      )}

      {/* Бренды */}
      {brandLoading ? (
    <Spinner text={"Загрузка брендов..."} />
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
    <Spinner text={"Загрузка товаров..."} />
        ) : products.length > 0 ? (
          products.map((prod) => (
            <div key={prod.id} className="product-card">
              <img src={prod.cover || Probimg} alt={prod.title} />
              <h3>
                <Link to={`/details/${prod.id}`}>{prod.title}</Link>
              </h3>
              <p>{prod.price} сом</p>
              {userData && (
                <button onClick={() => handleAddToCart(prod)} disabled={loadingAddToCart}>
                  {loadingAddToCart ? "⏳ Добавление..." : "В корзину"}
                </button>
              )}
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
