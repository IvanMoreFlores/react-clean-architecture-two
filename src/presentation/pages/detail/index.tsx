import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ProductUseCases } from "../../../application/use-cases/product.use-cases";
import { ProductApi } from "../../../insfrastructure/Product-api";
import { DSDivSign, DSNavBar } from "../../components";
import "./styles.scss";
import { Product } from "../../../domain/entities/products.entity";

const DetailPage = () => {
  const { id } = useParams();
  const [open, setOpen] = useState<boolean>(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [imageSelected, setImageSelected] = useState<string | null>(null);
  const user = localStorage.getItem("user");

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      const useCase = new ProductUseCases(new ProductApi());
      const response = await useCase.getProductById(id?.toString() ?? "");
      if (response.status === 200) {
        console.log("Product details:", response);
        if ("response" in response) {
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
              product.images.map((image, index) => (
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
        <div>
          <p className="p-detail-name">{product?.title}</p>
          <p className="p-detail-price">{product?.price}</p>
          <p className="p-detail-description">{product?.description}</p>
        </div>
      </div>

      {/* <h1>Detail Page</h1>
      <p>This is the detail page {id}.</p> */}
      {/* <p>{product?.category}</p> */}
    </section>
  );
};

export default DetailPage;
