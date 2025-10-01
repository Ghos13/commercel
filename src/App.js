// App.js
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import Register from "./pages/auth/Register.jsx";
import Login from "./pages/auth/login.jsx";
import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";
import Home from "./pages/home/home.jsx";
import Catalog from "./pages/catalog/Сatalog.jsx";
import Details from "./pages/details/details.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import About from "./pages/About/About.jsx";
import Contacts from "./pages/Contacts/Contacts.jsx";
import News from "./pages/News/News.jsx";
import Events from "./pages/Events/Events.jsx";

import { InfoContext } from "./providers/info.js";

function App() {
  const { info_data, info_loading } = useContext(InfoContext);

  if (info_loading) {
    return <h1>Anti Ddos guard... (by Aidar) and (WorthlessSoul)</h1>;
  }

  return (
    <BrowserRouter>
      <Header />

      {/* Динамический favicon и title */}
      {info_data && (
        <Helmet>
          <title>{info_data.title || "Магазин"}</title>
          <link
            rel="icon"
            href={info_data.logo || "/favicon.png"}
            type="image/png"
          />
        </Helmet>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/news" element={<News />} />
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<p>Страница не найдена</p>} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
