import React from "react";


function News() {
  // Моковые данные новостей
  const newsList = [
    {
      id: 1,
      title: "Компания жаңы продуктун сунуштады",
      date: "2025-09-20",
      description: "Биздин компания IT тармагында жаңы инновациялык продуктун сунуштады..."
    },
    {
      id: 2,
      title: "Бизнес семинары",
      date: "2025-09-15",
      description: "Биздин адистер катышкан бизнес семинарынын жыйынтыктары..."
    },
    {
      id: 3,
      title: "Компаниянын 10 жылдыгы",
      date: "2025-09-10",
      description: "Компания 10 жылдык мааракесин белгиледи, көптөгөн жаңылыктар жана ийгиликтер..."
    }
  ];

  return (
    <div className="news">
      <h1>Жаңылыктар</h1>
      <ul className="news-list">
        {newsList.map(item => (
          <li key={item.id} className="news-item">
            <h2>{item.title}</h2>
            <span className="date">{item.date}</span>
            <p>{item.description}</p>
            <button className="read-more">Толугураак окуу</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default News;
