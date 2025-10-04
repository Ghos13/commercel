import { useState,useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/auth";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {userData : authData,userLoading : authLoading} = useContext(AuthContext);

    const logoutSubmit = async () => {
        window.location.href = `${process.env.REACT_APP_API}/accounts/logout/`
    }
  return (
    <header className="header">
      <div className="container">
        <div className="header-menu">
          {/* ЛОГО */}
          <div className="header-menu_logo">
            <Link to="/">
              {/* <img className="header_logo" src={logo} alt="logo-DTS" /> */}
              <i>
                <strong className="header-menu_strong">DTS</strong>
              </i>
            </Link>
          </div>

          {/* БУРГЕР */}
          <button
            className={`burger ${isOpen ? "active" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* МЕНЮ */}
          <nav className={`header-menu_nav ${isOpen ? "open" : ""}`}>
            <ul className="header-navbar">
              <li>
                <Link className="link-in-header" to="/catalog">
                  каталог
                </Link>
              </li>

              {authData &&
              <li>
                <Link className="link-in-header" to="/cart">
                  себет
                </Link>
              </li>
              }
              
              <li>
                <Link className="link-in-header" to="/about">
                  биз тууралуу
                </Link>
              </li>
              <li>
                <Link className="link-in-header" to="/contacts">
                  контакттар
                </Link>
              </li>
              <li>
                <Link className="link-in-header" to="/news">
                  жаңылыктар
                </Link>
              </li>
              
            </ul>
          </nav>

          {/* LOGIN / SIGNIN */}
          <div className="auth-links">
            {
            authData ?
                <>             
                <button className="longout-btn" onClick={() => logoutSubmit()}> Logout</button>
                </>
            :
            <>
            <Link className="link-in-header" to="/login">
              login
            </Link>
            </>
            }
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
