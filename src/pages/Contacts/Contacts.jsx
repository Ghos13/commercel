import React, { useState } from "react";


const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Спасибо, ${formData.name}! Ваше сообщение отправлено.`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contacts-page">
      <h1>Контакттар</h1>

      <div className="contact-info">
        <div>
          <h2>Биз менен байланыш</h2>
          <p>📍 Дарек: Бишкек, Кыргызстан</p>
          <p>📞 Телефон: +996 555 123 456</p>
          <p>✉ Email: info@dts.kg</p>
          <p>🕒 Иш убактысы: Дүйшөмбү – Жума, 09:00 – 18:00</p>
        </div>

        <div className="contact-map">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.136456234656!2d74.5984!3d42.8733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389ecb6904c80f0b%3A0x44a927b0c731d6bb!2sBishkek%2C%20Kyrgyzstan!5e0!3m2!1sen!2sus!4v1695936123456!5m2!1sen!2sus"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="contact-form">
        <h2>Жазуу</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name" 
            placeholder="Атыңыз" 
            value={formData.name} 
            onChange={handleChange} 
            required
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange} 
            required
          />
          <textarea 
            name="message" 
            placeholder="Сиздин билдирүү" 
            value={formData.message} 
            onChange={handleChange} 
            required
          ></textarea>
          <button type="submit">Жөнөтүү</button>
        </form>
      </div>
    </div>
  );
};

export default Contacts;
