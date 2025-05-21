import { useEffect } from "react";
import { useParams } from "react-router";
import { ProductUseCases } from "../../../application/use-cases/product.use-cases";
import { ProductApi } from "../../../insfrastructure/Product-api";

const DetailPage = () => {
  const { id } = useParams();

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
    <div>
      <h1>Detail Page</h1>
      <p>This is the detail page {id}.</p>
    </div>
  );
};

export default DetailPage;
