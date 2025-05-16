import { DSButton } from "..";
import styles from "./Tittle.module.scss";

interface IProps {
  title: string;
  onClick: () => void;
  divider?: boolean;
}

const DSDivTittle = ({ title, onClick, divider = false }: IProps) => {
  return (
    <div className={styles["div-arrival"]}>
      <p className={styles["p-arrival"]}>{title}</p>
      <div className={styles["div-cards"]}>
        <div>
          <div>
            <img src="/src/presentation/assets/img/card.png" alt="Card" />
          </div>
          <div>
            <p className={styles["p-title-product"]}>T-shirt with Tape Details</p>
            <p>3.5</p>
            <p className={styles["p-price-product"]}>$120</p>
          </div>
        </div>
        <div>
          <div>
            <img src="/src/presentation/assets/img/card.png" alt="Card" />
          </div>
          <div>
            <p className={styles["p-title-product"]}>T-shirt with Tape Details</p>
            <p>3.5</p>
            <p className={styles["p-price-product"]}>$120</p>
          </div>
        </div>
        <div>
          <div>
            <img src="/src/presentation/assets/img/card.png" alt="Card" />
          </div>
          <div>
            <p className={styles["p-title-product"]}>T-shirt with Tape Details</p>
            <p>3.5</p>
            <p className={styles["p-price-product"]}>$120</p>
          </div>
        </div>
        <div>
          <div>
            <img src="/src/presentation/assets/img/card.png" alt="Card" />
          </div>
          <div>
            <p className={styles["p-title-product"]}>T-shirt with Tape Details</p>
            <p>3.5</p>
            <p className={styles["p-price-product"]}>$120</p>
          </div>
        </div>
      </div>
      <DSButton
        color="black"
        backgroundColor="transparent"
        borderColor="gray"
        text="View All"
        onClick={onClick}
      />
      {divider && <div className={styles["div-divider"]}></div>}
    </div>
  );
};

export default DSDivTittle;
