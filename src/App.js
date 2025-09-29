import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";
import Home from "./pages/home/home.jsx";
import Catalog from "./pages/cotalog/cotalog.jsx";
import ProductPage from "./pages/ProductPage/ProductPage.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import About from "./pages/About/About.jsx";
import Contacts from "./pages/Contacts/Contacts.jsx";
import News from "./pages/News/News.jsx";
import Events from "./pages/Events/Events.jsx";
import { useContext } from "react";
import { InfoContext } from "./providers/info.js";
import { Helmet } from "react-helmet";

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
          <title>{info_data.title || "ХУЙ"}</title>
          <link rel="icon" href={info_data.logo} type="image/png" />
        </Helmet>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/news" element={<News />} />
        <Route path="/events" element={<Events />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
