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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 6;




 
  const [formData,setFormData] = useState({
    page:1,q:"",min_price:0,max_price:0,on_sale:false,new:false,categories:[],brands:[],ordering: "-date",
  });

  const [debouncedFormData, setDebouncedFormData] = useState(formData);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFormData(formData);
    }, 500);
    return () => clearTimeout(handler);
  }, [formData.q, formData.min_price, formData.max_price]);


  const changeSelectedCategory = (id) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(id)
        ? prev.categories.filter((c) => c !== id)
        : [...prev.categories, id],
    }));
  };
  
  const changeSelectedBrand = (id) => {
    setFormData((prev) => ({
      ...prev,
      brands: prev.brands.includes(id)
        ? prev.brands.filter((b) => b !== id)
        : [...prev.brands, id],
    }));
  };
  
  const handleSearch = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value ,page:1}));
  };
  
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked,page:1 }));
  };


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams();
        const data = { ...debouncedFormData, ...formData, page: currentPage };

        if (data.categories.length > 0)
          params.append("category", data.categories.join(","));
        if (data.brands.length > 0)
          params.append("brand", data.brands.join(","));
        if (data.q) params.append("q", data.q);
        if (data.min_price) params.append("min_price", data.min_price);
        if (data.max_price) params.append("max_price", data.max_price);
        if (data.on_sale) params.append("on_sale", "true");
        if (data.new) params.append("new", "true");
        if (data.ordering) params.append("ordering", data.ordering);

        params.append("page",data.page);


        const res = await fetch(
          `${process.env.REACT_APP_API}api/products/filter/?${params.toString()}`
        );
        if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
        const result = await res.json();
        setProducts(result.results);
        setTotalPages(result.num_pages);
      } catch (err) {
        console.error("Ошибка фильтрации:", err);
      }
    };

    fetchProducts();
  }, [formData.ordering,debouncedFormData, formData.categories, formData.brands, formData.on_sale, formData.new, currentPage]);
 
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
        throw new Error(
          `Ошибка при добавлении в корзину: ${
            err.message || "Неизвестная ошибка"
          }`
        );
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
    } finally {
      setLoadingAddToCart(false);
    }
  };

  return (
    <div className="catalog">
     

      {categoryLoading ? (
        <Spinner text="Загрузка категорий..." />
         ) : (
           <div className="category-buttons">
             {categoryData.map((cat) => (
               <button
                 key={cat.id}
                 className={formData.categories.includes(cat.id) ? "category_is_selected" : "category_no_selected"}
                 onClick={() => changeSelectedCategory(cat.id)}
               >
                 {cat.title}
               </button>
             ))}

             <button className={formData.new ? "category_is_selected" : "category_no_selected"} onClick={handleCheckboxChange}>
                Новинки
             </button>

            </div>

      )}
   
      {brandLoading ? (
           <Spinner text="Загрузка брендов..." />
         ) : (
              <div className="brand-buttons">
                {brandData.map((brand) => (
                  <button
                    key={brand.id}
                    className={formData.brands.includes(brand.id) ? "brand_is_selected" : "brand_no_selected"}
                    onClick={() => changeSelectedBrand(brand.id)}
                  >
                    {brand.title}
                  </button>
                ))}

                <button className={  formData.on_sale ? "brand_is_selected" : "brand_no_selected" } onClick={handleCheckboxChange}> 
                  Со Скидкой
                </button>

              </div>
      )}

      <div className="sort-block">
        <label htmlFor="sort-select">Сортировка:</label>
        <select
          id="sort-select"
          name="ordering"
          value={formData.ordering}
          onChange={handleSearch}
        >
          <option value="-date">Новые → Старые</option>
          <option value="date">Старые → Новые</option>
          <option value="price">Цена ↑</option>
          <option value="-price">Цена ↓</option>
          <option value="id">ID ↑</option>
          <option value="-id">ID ↓</option>
        </select>
      </div>
      
      

      <h1>Каталог</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Поиск товара..."
          value={formData.q}
          name="q"
          onChange={handleSearch}
        />


        <input 
           type="number"
           placeholder="min_price"
           value={formData.min_price}
           name="min_price"
           onChange={handleSearch}
        />

        <input 
           type="number"
           placeholder="max_price"
           name="max_price"
           value={formData.max_price}
           onChange={handleSearch}
        
        />
      
      </div>




      <div className="productse">
        {loading ? (
          <Spinner text="Загрузка товаров..." />
        ) : products.length > 0 ? (
          products.map((prod) => (
            <div key={prod.id} className="product-card">
              <img src={prod.cover || Probimg} alt={prod.title} />
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
