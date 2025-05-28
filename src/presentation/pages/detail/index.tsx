import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ProductUseCases } from "../../../application/use-cases/product.use-cases";
import { ProductApi } from "../../../insfrastructure/Product-api";
import { DSDivSign, DSNavBar } from "../../components";
import "./styles.scss";

const DetailPage = () => {
  const { id } = useParams();
  const [open, setOpen] = useState<boolean>(true);
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
      }
    };
    fetchProductDetails();
  }, [id]);

  return (
    <section>
      {!user ? open && <DSDivSign onClose={handleOpen} /> : null}
      <DSNavBar />
      <div className="div-menu">
        <div>
          <p>Home</p>
        </div>
        <div>
          <p>Shop</p>
        </div>
        <div>
          <p>Men</p>
        </div>
        <div>
          <p>T-shirts</p>
        </div>
      </div>
      <h1>Detail Page</h1>
      <p>This is the detail page {id}.</p>
    </section>
  );
};

export default DetailPage;
