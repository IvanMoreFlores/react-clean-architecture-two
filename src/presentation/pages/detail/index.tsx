import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ProductUseCases } from "../../../application/use-cases/product.use-cases";
import { ProductApi } from "../../../insfrastructure/Product-api";
import { DSDivSign, DSNavBar } from "../../components";
import "./styles.scss";
import { Product } from "../../../domain/entities/products.entity";
import useProductStore from "../../store/zustand/ProductStore";
import { calculateDiscount } from "../../utils";

const DetailPage = () => {
  const { id } = useParams();
  const [open, setOpen] = useState<boolean>(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [imageSelected, setImageSelected] = useState<string | null>(null);
  const user = localStorage.getItem("user");
  const { product: productStore, setProduct: setProductStore } =
    useProductStore();

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
  }, [id]);

  const handleImageClick = (imageUrl: string) => {
    setImageSelected(imageUrl);
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
        </div>
      </div>

      {/* <h1>Detail Page</h1>
      <p>This is the detail page {id}.</p> */}
      {/* <p>{product?.category}</p> */}
    </section>
  );
};

export default DetailPage;
