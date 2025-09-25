const Footer = () => {
  return (
    <>
      <section className="footer">
        <div className="footer-bg">
          <div className="container">
            <div className="footer-content">
              <div>
                <h4>О компании</h4>
                <p>Мы создаём IT-решения для вашего бизнеса.</p>
                <p className="copyright">© 2025 IT Run</p>
              </div>
              <div>
                <h4>Контакты</h4>
                <p>Email: info@it-run.kg</p>
                <p>Тел: +996 555 123 456</p>
              </div>
              <div>
                <h4>Соцсети</h4>
                <a href="#">Instagram</a> | <a href="#">Telegram</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
