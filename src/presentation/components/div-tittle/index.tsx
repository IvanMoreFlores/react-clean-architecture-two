import { DSButton } from "..";
import { Product } from "../../../domain/entities/product.entity";
import styles from "./Tittle.module.scss";
import { useNavigate } from "react-router";

interface IProps {
  title: string;
  onClick: () => void;
  divider?: boolean;
  products?: Product[];
}

const DSDivTittle = ({ title, onClick, divider = false, products }: IProps) => {
  const navigate = useNavigate();
  const getFourProducts = () => {
    return [...(products ?? [])].sort(() => Math.random() - 0.5).slice(0, 4);
  };

  const calculateDiscount = (price: number, discountPercentage: number) => {
    return price / (1 + discountPercentage / 100);
  };

  const handleClickProduct = (id: number) => {
    navigate(`/detail/${id}`);
  };

  const productsToShow = getFourProducts();

  return (
    <div className={styles["div-arrival"]}>
      <p className={styles["p-arrival"]}>{title}</p>
      <div className={styles["div-cards"]}>
        {productsToShow?.map((product) => (
          <button
            type="button"
            onClick={() => handleClickProduct(product.id)}
            key={product.id}
            className={styles["div-card-product"]}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              textAlign: "inherit",
              width: "100%",
            }}
          >
            <div className={styles["div-card-product-img"]}>
              <img src={product?.thumbnail} alt="Card" />
            </div>
            <div>
              <p className={styles["p-title-product"]}>{product?.title}</p>
              <p>{product?.rating}</p>
              <div className={styles["div-price-product"]}>
                <p className={styles["p-price-product"]}>
                  $
                  {calculateDiscount(
                    product?.price,
                    product?.discountPercentage
                  ).toFixed(2)}
                </p>
                <p className={styles["p-discount-product"]}>
                  ${product?.price}
                </p>
                <div className={styles["div-porcent-product"]}>
                  <p className={styles["p-porcent-product"]}>
                    -{product?.discountPercentage}%
                  </p>
                </div>
              </div>
            </div>
          </button>
        ))}
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
