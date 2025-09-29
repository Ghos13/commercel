import { Link } from "react-router-dom";
import { InfoContext } from "../../providers/info";
import { useContext } from "react";

import productImg from "../../images/gaming-laptops-og-image-C_hhqOLl.webp";

const Home = () => {
  const { info_data, info_loading } = useContext(InfoContext);

  if (info_loading == null) return <h1>Error </h1>;
  
  if (info_loading) return <h1>Downloading...</h1>;


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
            <div className="card">
              <img src={productImg} alt="Товар" />
              <h3>Ноутбук ASUS</h3>
              <p>45 000 сом</p>
              <button className="buy-btn">Сатып алуу</button>
            </div>
            <div className="card">
              <img src={productImg} alt="Товар" />
              <h3>Смартфон Samsung</h3>
              <p>32 000 сом</p>
              <button className="buy-btn">Сатып алуу</button>
            </div>
            <div className="card">
              <img src={productImg} alt="Товар" />
              <h3>Кроссовки Nike</h3>
              <p>12 000 сом</p>
              <button className="buy-btn">Сатып алуу</button>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Категории */}
      <section className="categories">
        <div className="container">
          <h2 className="section-title">Категории</h2>
          <div className="categories-list">
            <Link to="/catalog" className="category">
              Электроника
            </Link>
            <Link to="/catalog" className="category">
              Одежда
            </Link>
            <Link to="/catalog" className="category">
              Бытовая техника
            </Link>
            <Link to="/catalog" className="category">
              Аксессуары
            </Link>
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
            <li>🚚 Бесплатная доставка при заказе от 5000 сом</li>
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
