import { InfoContext } from "../../providers/info";
import { useContext } from "react";

const Footer = () => {
  const { info_data, info_loading } = useContext(InfoContext);

  if (info_loading) {
    return <h1>Anti DDoS Guard... (by Aidar) and (WorthlessSoul)</h1>;
  }

  if (!info_data) {
    return <h2>Ошибка загрузки информации о компании</h2>;
  }

  return (
    <section className="footer">
      <div className="footer-bg">
        <div className="container">
          <div className="footer-content">
            {/* О компании */}
            <div>
              <h4>О компании</h4>
              <p>Мы создаём IT-решения для вашего бизнеса.</p>
              <p className="copyright">© 2025 IT Run</p>
            </div>

            {/* Контакты */}
            <div>
              <h4>Контакты</h4>
              <p>
                Email:{" "}
                <a
                  href={`mailto:${info_data.gmail || "example@gmail.com"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {info_data.gmail || "example@gmail.com"}
                </a>
              </p>
              <p>Тел: {info_data.contact_number || "+996 555 123 456"}</p>
            </div>

            {/* Соцсети */}
            <div>
              <h4>Соцсети</h4>
              {info_data?.instagramm && (
                <a
                  href={info_data.instagramm}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              )}
              {info_data?.telegramm && (
                <>
                  {" | "}
                  <a
                    href={info_data.telegramm}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Telegram
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
