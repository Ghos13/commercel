const Contacts = () => {
  return (
    <section className="contacts">
      <div className="container">
        <div className="contacts-content">
          <div className="creator-contacts">
            <div className="contact">
              <h1>Контакты</h1>
              <p>Свяжитесь с нами удобным для вас способом:</p>
              <ul>
                <li>☎ Телефон: +996 555 123 456</li>
                <li>✉ Email: info@it-run.kg</li>
                <li>📍 Адрес: Бишкек, ул. Итников, 12</li>
                <li>💬 WhatsApp: +996 700 123 456</li>
              </ul>
              <h2>Мы в соцсетях</h2>
              <p>
                <a href="https://t.me/it-run" target="_blank">Telegram</a> |{" "}
                <a href="https://instagram.com/it-run" target="_blank">Instagram</a> |{" "}
                <a href="https://facebook.com/it-run" target="_blank">Facebook</a>
              </p>
            </div>
          </div>
          <div className="additional-info">
            <h3>О нас</h3>
            <p>Мы команда IT-Run, специализирующаяся на разработке веб-приложений и цифровых решений. Свяжитесь с нами для сотрудничества или консультации!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;