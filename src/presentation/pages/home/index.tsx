import { useState } from "react";
import { DSButton, DSDivSign, DSNavBar, DSText } from "../../components";
import "./styles.css";
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
            <div>
              <p className="p-hero">FIND CLOTHES</p>
              <p className="p-hero">THAT MATCHES</p>
              <p className="p-hero">YOUR STYLE</p>
              <DSText variant="p" color="black">
                Browse through our diverse range of meticulously crafted
                garments, designed 
              </DSText>
              <DSButton text="Shop Now" onClick={() => {}} />
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
    </section>
  );
};

export default PageHome;
