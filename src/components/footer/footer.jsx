import { InfoContext } from "../../providers/info";
import { useContext } from "react";
const Footer = () => {
  const { info_data, info_loading } = useContext(InfoContext);

  if (info_loading) {
    return <h1>Anti Ddos guard... (by Aidar) and (WorthlessSoul)</h1>;
  }
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
                <p>Email: <a >{info_data}</a> </p>
                <p>Тел: +996 555 123 456</p>
              </div>
              <div>
                <h4>Соцсети</h4>
                <a href={info_data.instagramm}>Instagram</a> | <a href={info_data.telegramm}>Telegram</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
