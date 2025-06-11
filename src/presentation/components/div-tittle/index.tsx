import { DSButton } from "..";
import { Product } from "../../../domain/entities/products.entity";
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
              <img className="img-card" src={product?.thumbnail} alt="Card" />
            </div>
            <div className={styles["div-card-product-detail"]}>
              <p className={styles["p-title-product"]}>{product?.title}</p>
              <div className={styles["div-detail-rating"]}>
                <div className={styles["div-stars"]}>
                  {Array.from({ length: 5 }).map((_, index) => {
                    const rating = product?.rating ?? 0;
                    const startValue = index + 1;

                    if (rating >= startValue) {
                      return (
                        <img
                          key={index}
                          src="/assets/img/star-one.svg"
                          alt="star"
                          className={styles["img-star"]}
                        />
                      );
                    } else if (
                      rating >= startValue - 0.5 &&
                      rating < startValue
                    ) {
                      return (
                        <img
                          key={index}
                          src="/assets/img/star.svg"
                          alt="star"
                          className={styles["img-star"]}
                        />
                      );
                    } else {
                      return <></>;
                    }
                  })}
                </div>
                <p className={styles["p-detail-rating"]}>{product?.rating}/5</p>
              </div>
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
