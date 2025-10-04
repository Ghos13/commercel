import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventImg from "../../images/gaming-laptops-og-image-C_hhqOLl.webp";
const api_url = `${process.env.REACT_APP_API}admin_api/events/`;

function News() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(api_url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error(`Ошибка: ${res.status}`);

        const data = await res.json();
        setNewsList(data);
      } catch (err) {
        console.error("Ошибка при получении событий:", err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="news">
      <div className="news-banner">
        <div className="container">
          <h1 className="news-main-title">Жаңылыктар</h1>
          <p className="news-subtitle">
            Биздин акыркы жаңылыктар, иш-чаралар жана жетишкендиктер менен
            таанышыңыз.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="news-filters">
          <button>Бардыгы</button>
          <button>Компания жөнүндө</button>
          <button>Маалыматтык</button>
          <button>Иш-чаралар</button>
        </div>

        <div className="news-list">
          {newsList.map((item) => (
            <div key={item.id} className="news-card">
              <img
                src={item.gallery?.[0]?.file || "{ EventImg }"}
                alt={item.title}
                className="news-img"
              />
              <div className="news-content">
                <span className="news-category">
                  {item.categories?.join(", ")}
                </span>
                <h2>{item.title}</h2>
                <span className="news-date">
                  {new Date(item.date_start).toLocaleDateString("ru-RU")}
                </span>
                <p>{item.desc}</p>
                <Link to={`/news/${item.id}`} className="read-more">
                  Толугураак окуу →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="latest-news">
          <h3>Акыркы жаңылыктар</h3>
          <ul>
            {newsList.map((item) => (
              <li key={item.id}>
                <Link to={`/news/${item.id}`}>{item.title}</Link>
                <span className="small-date">
                  {new Date(item.date_start).toLocaleDateString("ru-RU")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default News;
