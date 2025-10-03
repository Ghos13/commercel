import React from "react";


function Events() {
  // Моковые данные событий
  const eventsList = [
    {
      id: 1,
      title: "IT конференция 2025",
      date: "2025-10-05",
      location: "Бишкек, Кыргыз Республикасы",
      description: "Конференцияда IT адистер өз тажрыйбаларын бөлүшөт жана жаңы технологияларды талкуулашат."
    },
    {
      id: 2,
      title: "Бизнес семинары",
      date: "2025-10-12",
      location: "Ош, Кыргыз Республикасы",
      description: "Семинарда стартаптарды өнүктүрүү жана бизнес стратегиялары жөнүндө сөз болот."
    },
    {
      id: 3,
      title: "Компаниянын жылдык жыйын",
      date: "2025-10-20",
      location: "Бишкек, Кыргыз Республикасы",
      description: "Компаниянын кызматкерлери жана өнөктөштөрү жылдык жыйынга чогулат."
    }
  ];

  return (
    <div className="news-banner">
      <h1>Иш-чаралар</h1>
      <ul className="events-list">
        {eventsList.map(event => (
          <li key={event.id} className="event-item">
            <h2>{event.title}</h2>
            <span className="date">{event.date}</span>
            <span className="location">{event.location}</span>
            <p>{event.description}</p>
            <button className="read-more">Толугураак окуу</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Events;
