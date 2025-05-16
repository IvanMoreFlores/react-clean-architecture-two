import { useState } from "react";
import {
  DSButton,
  DSDivSign,
  DSDivTittle,
  DSNavBar,
  DSText,
} from "../../components";
import "./styles.scss";
const PageHome = () => {
  const [open, setOpen] = useState<boolean>(true);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <section>
      {open && <DSDivSign onClose={handleOpen} />}
      <DSNavBar />
      <div>
        <div className="div-hero">
          <div className="div-hero-text">
            <div className="div-hero-img">
              <div>
                <p className="p-hero">FIND CLOTHES</p>
                <p className="p-hero">THAT MATCHES</p>
                <p className="p-hero">YOUR STYLE</p>
              </div>
              <DSText variant="p" color="black">
                Browse through our diverse range of meticulously crafted
                garments, designed
              </DSText>
              <div className="div-hero-button">
                <DSButton text="Shop Now" onClick={() => {}} />
              </div>
              <div className="div-hero-cards">
                <div>
                  <p className="p-card">200+</p>
                  <DSText variant="p" color="black">
                    International Brands
                  </DSText>
                </div>
                <div>
                  <p className="p-card">2,000+</p>
                  <DSText variant="p" color="black">
                    High-Quality Products
                  </DSText>
                </div>
                <div>
                  <p className="p-card">30,000+</p>
                  <DSText variant="p" color="black">
                    Happy Customers
                  </DSText>
                </div>
              </div>
            </div>
          </div>
          <div className="div-hero-img">
            <img
              className="img-hero"
              src="/src/presentation/assets/img/hero.png"
              alt="Hero"
            />
          </div>
        </div>
        <div className="div-brands">
          <img src="/src/presentation/assets/img/versace.svg" alt="Versace" />
          <img src="/src/presentation/assets/img/zara.svg" alt="Zara" />
          <img src="/src/presentation/assets/img/gucci.svg" alt="Gucci" />
          <img src="/src/presentation/assets/img/prada.svg" alt="Prada" />
          <img
            src="/src/presentation/assets/img/calvin-klein.svg"
            alt="Calvin"
          />
        </div>
      </div>
      <div className="div-arrival">
        <DSDivTittle divider title="New Arrivals" onClick={() => {}} />
        <DSDivTittle title="top selling" onClick={() => {}} />
      </div>
    </section>
  );
};

export default PageHome;
