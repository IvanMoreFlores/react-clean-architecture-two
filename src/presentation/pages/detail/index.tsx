import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ProductUseCases } from "../../../application/use-cases/product.use-cases";
import { ProductApi } from "../../../insfrastructure/Product-api";
import { DSDivSign, DSNavBar } from "../../components";
import "./styles.scss";
import { Product } from "../../../domain/entities/products.entity";
import useProductStore from "../../store/zustand/ProductStore";
import { calculateDiscount, formatDate, formatDateSpanish } from "../../utils";
import { useCartStore } from "../../store/zustand/CartStore";

type size = "S" | "M" | "L" | "XL";
const DetailPage = () => {
  const { id } = useParams();
  const [open, setOpen] = useState<boolean>(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [imageSelected, setImageSelected] = useState<string | null>(null);
  const user = localStorage.getItem("user");
  const [colors, setColors] = useState<string>("red");
  const [size, setSize] = useState<size>("S");
  const { product: productStore, setProduct: setProductStore } =
    useProductStore();
  const { setCart, cart } = useCartStore();
  const [count, setCount] = useState<number>(
    cart.find((item) => item.id === Number(id))?.quantity ?? 1
  );
  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) {
        return;
      }

      if (productStore && productStore.id === Number(id)) {
        setProduct(productStore);
        setImageSelected(productStore.images[0]);
        return;
      }

      const useCase = new ProductUseCases(new ProductApi());
      const response = await useCase.getProductById(id?.toString() ?? "");
      if (response.status === 200) {
        console.log("Product details:", response);
        if ("response" in response) {
          setProductStore(response.response);
          setProduct(response.response);
          setImageSelected(response.response.images[0]);
        }
      }
    };
    fetchProductDetails();
  }, []);

  const handleImageClick = (imageUrl: string) => {
    setImageSelected(imageUrl);
  };

  // const getRandomColor = () => {
  //   const letters = "0123456789ABCDEF";
  //   let color = "#";
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }

  const handleColorClick = (color: string) => {
    setColors(color);
  };

  const handleSizeClick = (newSize: size) => {
    setSize(newSize);
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      const newProduct = {
        ...product,
        quantity: count,
        color: colors,
        size: size,
      };
      setCart(newProduct);
      alert("Producto agregado al carrito");
    }
  };

  return (
    <section>
      {!user ? open && <DSDivSign onClose={handleOpen} /> : null}
      <DSNavBar />
      <div className="div-divider-menu">
        <div className="div-divider"></div>
      </div>
      <div className="div-menu">
        <div>
          <p>Home</p>
        </div>
        <img src="/src/presentation/assets/icon/rigth.svg" alt="right" />
        <div>
          <p>Shop</p>
        </div>
        <img src="/src/presentation/assets/icon/rigth.svg" alt="right" />
        <div>
          <p>Men</p>
        </div>
        <img src="/src/presentation/assets/icon/rigth.svg" alt="right" />
        <div>
          <p>T-shirts</p>
        </div>
      </div>
      <div className="div-detail">
        <div className="div-detail-image">
          <div className="div-galery">
            {product?.images &&
              product.images
                .slice(0, 3)
                .map((image, index) => (
                  <img
                    onClick={() => handleImageClick(image)}
                    key={index}
                    src={image}
                    alt={`Product image ${index + 1}`}
                    className="img-galery"
                  />
                ))}
          </div>
          <div>
            <img
              className="img-selected-image"
              src={imageSelected ?? ""}
              alt=""
            />
          </div>
        </div>
        <div className="div-detail-info">
          <div className="div-detail-name">
            <p className="p-detail-name">{product?.title}</p>
          </div>
          <div className="div-detail-rating">
            <div className="div-stars">
              {Array.from({ length: 5 }).map((_, index) => {
                const rating = product?.rating ?? 0;
                const startValue = index + 1;

                if (rating >= startValue) {
                  return (
                    <img
                      key={index}
                      src="/src/presentation/assets/img/star-one.svg"
                      alt="star"
                      className="img-star"
                    />
                  );
                } else if (rating >= startValue - 0.5 && rating < startValue) {
                  return (
                    <img
                      key={index}
                      src="/src/presentation/assets/img/star.svg"
                      alt="star"
                      className="img-star"
                    />
                  );
                } else {
                  return <></>;
                }
              })}
            </div>
            <p className="p-detail-rating">{product?.rating}/5</p>
          </div>
          <div className="div-price-product">
            <p className="p-price-product">
              $
              {calculateDiscount(
                product?.price ?? 0,
                product?.discountPercentage ?? 0
              ).toFixed(2)}
            </p>
            <p className="p-discount-product">${product?.price}</p>
            <div className="div-porcent-product">
              <p className="p-porcent-product">
                -{product?.discountPercentage}%
              </p>
            </div>
          </div>
          <div className="div-detail-description">
            <p className="p-detail-description">{product?.description}</p>
          </div>
          <div className="div-divider"></div>
          <p className="p-detail-description">Select Colors</p>
          <div className="div-colors-product">
            <div
              onClick={() => handleColorClick("red")}
              style={{ backgroundColor: "red" }}
              className="div-colors"
            >
              {colors === "red" && (
                <img
                  src="/src/presentation/assets/icon/check.svg"
                  alt="check"
                  className="img-check"
                />
              )}
            </div>
            <div
              onClick={() => handleColorClick("blue")}
              style={{ backgroundColor: "blue" }}
              className="div-colors"
            >
              {colors === "blue" && (
                <img
                  src="/src/presentation/assets/icon/check.svg"
                  alt="check"
                  className="img-check"
                />
              )}
            </div>
            <div
              onClick={() => handleColorClick("green")}
              style={{ backgroundColor: "green" }}
              className="div-colors"
            >
              {colors === "green" && (
                <img
                  src="/src/presentation/assets/icon/check.svg"
                  alt="check"
                  className="img-check"
                />
              )}
            </div>
          </div>
          <div className="div-divider"></div>
          <p className="p-detail-description">Choose Size</p>
          <div className="div-size-products">
            <div
              onClick={() => handleSizeClick("S")}
              className="div-size-product"
              style={{ backgroundColor: size === "S" ? "#000" : "#f0f0f0" }}
            >
              <p
                style={{ color: size === "S" ? "#f0f0f0" : "#000" }}
                className="p-detail-product"
              >
                Small
              </p>
            </div>
            <div
              onClick={() => handleSizeClick("M")}
              className="div-size-product"
              style={{ backgroundColor: size === "M" ? "#000" : "#f0f0f0" }}
            >
              <p
                style={{ color: size === "M" ? "#f0f0f0" : "#000" }}
                className="p-detail-product"
              >
                Medium
              </p>
            </div>
            <div
              onClick={() => handleSizeClick("L")}
              style={{ backgroundColor: size === "L" ? "#000" : "#f0f0f0" }}
              className="div-size-product"
            >
              <p
                style={{ color: size === "L" ? "#f0f0f0" : "#000" }}
                className="p-detail-product"
              >
                Large
              </p>
            </div>
            <div
              onClick={() => handleSizeClick("XL")}
              style={{ backgroundColor: size === "XL" ? "#000" : "#f0f0f0" }}
              className="div-size-product"
            >
              <p
                style={{ color: size === "XL" ? "#f0f0f0" : "#000" }}
                className="p-detail-product"
              >
                X-Large
              </p>
            </div>
          </div>
          <div className="div-divider"></div>
          <div className="div-detail-product">
            <div className="div-quantity-product">
              <div onClick={handleDecrement} className="div-detail-quantity">
                <img
                  src="/src/presentation/assets/icon/decrement.svg"
                  alt="decrement"
                />
              </div>
              <p className="p-detail-quantity">{count}</p>
              <div onClick={handleIncrement} className="div-detail-quantity">
                <img
                  src="/src/presentation/assets/icon/increment.svg"
                  alt="increment"
                />
              </div>
            </div>
            <div onClick={handleAddToCart} className="div-add-cart">
              <p className="p-add-cart">Add to Cart</p>
            </div>
          </div>
        </div>
      </div>
      <div className="div-reviews">
        {product &&
          product.reviews.map((review) => (
            <div className="div-review">
              <div className="div-stars">
                {Array.from({ length: 5 }).map((_, index) => {
                  const rating = review?.rating ?? 0;
                  const startValue = index + 1;

                  if (rating >= startValue) {
                    return (
                      <img
                        key={index}
                        src="/src/presentation/assets/img/star-one.svg"
                        alt="star"
                        className="img-star"
                      />
                    );
                  } else if (
                    rating >= startValue - 0.5 &&
                    rating < startValue
                  ) {
                    return (
                      <img
                        key={index}
                        src="/src/presentation/assets/img/star.svg"
                        alt="star"
                        className="img-star"
                      />
                    );
                  } else {
                    return <></>;
                  }
                })}
              </div>
              <p className="p-review-name">{review.reviewerName}</p>
              <p className="p-review-comment">{review.comment}</p>
              <p className="p-review-date">
                Posted on {formatDateSpanish(new Date(review.date))}
              </p>
            </div>
          ))}
      </div>
    </section>
  );
};

export default DetailPage;
