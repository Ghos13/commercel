import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";
import Home from "./pages/home/home.jsx";
import Catalog from "./pages/cotalog/cotalog.jsx";
import ProductPage from "./pages/ProductPage/ProductPage.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import About from "./pages/About/About.jsx";
import Contacts from "./pages/Contacts/Contacts.jsx";
import News from "./pages/News/News.jsx";
import Events from "./pages/Events/Events.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/checkout" element={<Checkout />} /> */}
        {/* <Route path="/profile" element={<Profile />} /> */}
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
