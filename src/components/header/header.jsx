import { Link } from "react-router-dom";
import logo from "../../../src/images/DTS-logobr.png";
const Header = () => {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-menu">
            <div className="header-menu_logo">
              <Link to="/">
                {/* <img className="header_logo" src={logo} alt="logo-DTS" /> */}
                <i>
                  <strong className="header-menu_strong">DTS</strong>{" "}
                </i>
              </Link>
            </div>
            <nav className="header-menu_nav">
              <ul className="header-navbar">
                <li>
                  <Link className="link-in-header" to="/catalog">каталог</Link>
                </li>
                <li>
                  <Link className="link-in-header" to="/cart">себет</Link>
                </li>
                {/* <li>
                  <Link className="link-in-header" to="/checkout">төлөм</Link>
                </li> */}
                {/* <li>
                  <Link className="link-in-header" to="/profile">профиль</Link>
                </li> */}
                <li>
                  <Link className="link-in-header" to="/about">биз тууралуу</Link>
                </li>
                <li>
                  <Link className="link-in-header" to="/contacts">контакттар</Link>
                </li>
                <li>
                  <Link className="link-in-header" to="/news">жаңылыктар</Link>
                </li>
                <li>
                  <Link className="link-in-header" to="/events">иш-чаралар</Link>
                </li>
              </ul>
              <p></p>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
