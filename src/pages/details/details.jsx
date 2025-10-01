// Details.js
import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Probimg from "../../images/gaming-laptops-og-image-C_hhqOLl.webp";
import { CategoryContext } from "../../providers/category";

const Details = () => {
  const { categoryData } = useContext(CategoryContext);
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API}api/products/${id}/`
        );
        if (!res.ok) {
          setProduct(null);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (er) {
        setProduct(null);
        setLoading(false);
        console.log(er);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (!product) return <p>Товар не найден</p>;

  const addToCart = () => {
    setAdded(true);
    console.log(
      `Добавлено в корзину: ${product.name}, количество: ${quantity}`
    );
  };

  const categoryName =
    categoryData?.find((cat) => cat.id === product.category)?.title ||
    "Неизвестная";

  return (
    <div className="details-page">
      <h1>{product.name}</h1>
      <img src={product.cover || Probimg} alt={product.name} />
      <p>Цена: {product.price} сом</p>
      <p>Категория: {categoryName}</p>

      <div className="quantity-selector">
        <label>Количество: </label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>

      <button className="add-cart-btn" onClick={addToCart}>
        {added ? "Добавлено!" : "Добавить в корзину"}
      </button>

      <div className="back-link">
        <Link to="/catalog">← Назад в каталог</Link>
      </div>
    </div>
  );
};

export default Details;
