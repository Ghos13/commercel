import React from "react";
import { Link } from "react-router-dom";

import newsImg1 from "../../images/gaming-laptops-og-image-C_hhqOLl.webp";
import newsImg2 from "../../images/gaming-laptops-og-image-C_hhqOLl.webp";
import newsImg3 from "../../images/gaming-laptops-og-image-C_hhqOLl.webp";

function News() {
  const newsList = [
    {
      id: 1,
      title: "Компания жаңы продуктун сунуштады",
      date: "2025-09-20",
      description:
        "Биздин компания IT тармагында жаңы инновациялык продуктун сунуштады. Бул продукт ишти 2 эсе тездетет жана кардарлар үчүн ыңгайлуулукту арттырат.",
      image: newsImg1,
      category: "Компания жөнүндө",
    },
    {
      id: 2,
      title: "Бизнес семинары",
      date: "2025-09-15",
      description:
        "Биздин адистер катышкан бизнес семинары ийгиликтүү өттү. Иш чарада жаңы бизнес өнөктөштөр менен келишим түзүлдү.",
      image: newsImg2,
      category: "Иш-чаралар",
    },
    {
      id: 3,
      title: "Компаниянын 10 жылдыгы",
      date: "2025-09-10",
      description:
        "Компания өзүнүн 10 жылдык мааракесин белгиледи. Бул убакыт ичинде ондогон долбоорлор ийгиликтүү ишке ашырылды.",
      image: newsImg3,
      category: "Маалыматтык",
    },
  ];

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
        {/* Фильтры */}
        <div className="news-filters">
          <button>Бардыгы</button>
          <button>Компания жөнүндө</button>
          <button>Маалыматтык</button>
          <button>Иш-чаралар</button>
        </div>

        {/* Список новостей */}
        <div className="news-list">
          {newsList.map((item) => (
            <div key={item.id} className="news-card">
              <img src={item.image} alt={item.title} className="news-img" />
              <div className="news-content">
                <span className="news-category">{item.category}</span>
                <h2>{item.title}</h2>
                <span className="news-date">{item.date}</span>
                <p>{item.description}</p>
                <Link to={`/news/${item.id}`} className="read-more">
                  Толугураак окуу →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Акыркы жаңылыктар */}
        <div className="latest-news">
          <h3>Акыркы жаңылыктар</h3>
          <ul>
            {newsList.map((item) => (
              <li key={item.id}>
                <Link to={`/news/${item.id}`}>{item.title}</Link>
                <span className="small-date">{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default News;
