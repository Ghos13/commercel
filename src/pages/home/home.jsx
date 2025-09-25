import ProbItem from "../../images/gaming-laptops-og-image-C_hhqOLl.webp";
const Home = () => {
  return (
    <>
      <section className="home">
        <div className="banner">
          <div className="container">
            <div className="home-content">
              <div className="banner-content">
                <div className="banner-text">
                  <h1>banner</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="products">
        <div className="container">
          <div className="products-recomend">
            <h2 className="products-recomend-title">Products title</h2>
            <div className="products-recomend-carts">
              <div class="card">
                <img src={ProbItem} alt="Beru" />
                <h3>Беру</h3>
                <p>1200 с.</p>
                <button class="buy-btn">Сатып алуу</button>
              </div>
              <div class="card">
                <img src={ProbItem} alt="Beru" />
                <h3>Беру</h3>
                <p>1200 с.</p>
                <button class="buy-btn">Сатып алуу</button>
              </div>
              <div class="card">
                <img src={ProbItem} alt="Beru" />
                <h3>Беру</h3>
                <p>1200 с.</p>
                <button class="buy-btn">Сатып алуу</button>
              </div>
              <div class="card">
                <img src={ProbItem} alt="Beru" />
                <h3>Беру</h3>
                <p>1200 с.</p>
                <button class="buy-btn">Сатып алуу</button>
              </div>
              <div class="card">
                <img src={ProbItem} alt="Beru" />
                <h3>Беру</h3>
                <p>1200 с.</p>
                <button class="buy-btn">Сатып алуу</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
