import React from "react";


function About() {
  return (
    <div className="about">
      <h1>Биз тууралуу</h1>

      <section className="company-info">
        <h2>Компаниянын миссиясы</h2>
        <p>
          Биздин компания эң мыкты IT кызматтарын көрсөтүүгө умтулат.
          Биздин максат – кардарлардын бизнесин өнүктүрүү жана
          инновациялык чечимдерди сунуштоо.
        </p>
      </section>

      <section className="team">
        <h2>Биздин команда</h2>
        <p>
          Биздин команда профессионалдардан турат, ар бир мүчө өз тармагында
          мыкты тажрыйбага ээ.
        </p>
      </section>

      <section className="contacts">
        <h2>Контакт</h2>
        <p>Электрондук почта: info@mycompany.kg</p>
        <p>Телефон: +996 555 123 456</p>
        <p>Дарек: Бишкек, Кыргыз Республикасы</p>
      </section>
    </div>
  );
}

export default About;
