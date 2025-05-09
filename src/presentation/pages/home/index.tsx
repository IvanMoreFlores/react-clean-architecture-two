import { useState } from "react";
import { DSDivSign, DSNavBar } from "../../components";
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
        <div></div>
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
