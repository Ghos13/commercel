import { Link } from "react-router-dom";
import { InfoContext } from "../../providers/info";
import { CategoryContext } from "../../providers/category";
import { useContext, useEffect, useState } from "react";
import Spinner from "../Spinner.jsx/Spinner";
import productImg from "../../images/gaming-laptops-og-image-C_hhqOLl.webp";

const Home = () => {
  const { info_data, info_loading } = useContext(InfoContext);
  const { categoryData, categoryLoading } = useContext(CategoryContext);

  const [recommend_products, setRProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const req = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API}api/products/?page_size=4`
        );

        if (!res.ok) {
          console.log(res.status);
        }

        const data = await res.json();
        setLoading(false);
        setRProduct(data.results);
      } catch (er) {
        console.log(er);
      }
    };

    req();
  }, []);

  if (info_loading == null) return <h1>Error </h1>;

  if (info_loading) return <Spinner text={"Загрузка категорий..."} />;

  return (
    <div className="home">
      {/* 🔹 Баннер */}
      <section className="banner">
        <div className="container">
          <div className="banner-content">
            <h1>Добро пожаловать в {info_data.title}</h1>
            <p>Лучшие товары по выгодным ценам</p>
            <Link to="/catalog" className="btn-primary">
              Перейти в каталог
            </Link>
          </div>
        </div>
      </section>

      {/* 🔹 Рекомендованные товары */}
      <section className="products">
        <div className="container">
          <h2 className="section-title">Рекомендованные товары</h2>
          <div className="products-grid">
            {loading ? (
              <Spinner text={"Загрузка товаров..."} />
            ) : (
              recommend_products.map((elem) => (
                <div className="card" key={elem.id}>
                  <img src={elem.cover} alt="Товар" />
                  <h3>{elem.title}</h3>
                  <p>{elem.price} сом</p>
                  <button className="buy-btn">Сатып алуу</button>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 🔹 Категории */}
      <section className="categories">
        <div className="container">
          <h2 className="section-title">Категории</h2>
          <div className="categories-list">
            {categoryLoading ? (
              <Spinner text={"Загрузка категорий..."} />
            ) : (
              categoryData.map((elem) => (
                <Link to="/catalog" className="category">
                  {elem.title}
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 🔹 О компании */}
      <section className="about-preview">
        <div className="container">
          <h2 className="section-title">О нас</h2>
          <p>
            Мы — магазин DTS Shop. У нас вы найдете электронику, одежду и
            технику по доступным ценам. Доставка по всей стране.
          </p>
          <Link to="/about" className="btn-secondary">
            Подробнее
          </Link>
        </div>
      </section>

      {/* 🔹 Новости */}
      <section className="news-preview">
        <div className="container">
          <h2 className="section-title">Новости</h2>
          <ul>
            <li>🎉 Скидки до 50% на электронику</li>
            <li>🛍 Новые коллекции одежды</li>
          </ul>
          <Link to="/news" className="btn-secondary">
            Все новости
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
