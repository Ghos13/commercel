// Catalog.js
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CategoryContext } from "../../providers/category";
import { BrandContext } from "../../providers/brand";
import Probimg from "../../images/gaming-laptops-og-image-C_hhqOLl.webp";

function Catalog() {
  const { categoryData, categoryLoading } = useContext(CategoryContext);
  const { brandData, brandLoading } = useContext(BrandContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API}api/products/`);
        if (!res.ok) {
          setLoading(false);
          return;
        }
        const data = await res.json();
        setProducts(data.results || []);
        setLoading(false);
      } catch (er) {
        setLoading(false);
        console.log(er);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
    console.log(`Добавлено в корзину: ${product.title}`);
  };

  return (
    <div className="catalog">
      {/* Категории */}
      {categoryLoading ? (
        <h2>Загрузка категорий...</h2>
      ) : (
        <div className="category-buttons">
          {categoryData.map(cat => <button key={cat.id}>{cat.title}</button>)}
        </div>
      )}

      {/* Бренды */}
      {brandLoading ? (
        <h2>Загрузка брендов...</h2>
      ) : (
        <div className="brand-buttons">
          {brandData.map(brand => <button key={brand.id}>{brand.title}</button>)}
        </div>
      )}

      <h1>Каталог</h1>

      {/* Товары */}
      <div className="products">
        {loading ? (
          <p>Товары не найдены</p>
        ) : (
          products.map(prod => (
            <div key={prod.id} className="product-card">
              <img src={prod.cover || Probimg} alt={prod.title} />
              <h3>
                <Link to={`/detail/${prod.id}`}>{prod.title}</Link>
              </h3>
              <p>{prod.price} сом</p>
              <button onClick={() => handleAddToCart(prod)}>В корзину</button>
            </div>
          ))
        )}
      </div>

      {/* Корзина */}
      <div className="cart">
        <h2>Корзина</h2>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item, idx) => (
              <li key={idx}>{item.title} - {item.price} сом</li>
            ))}
          </ul>
        ) : (
          <p>Корзина пуста</p>
        )}
      </div>
    </div>
  );
}

export default Catalog;
