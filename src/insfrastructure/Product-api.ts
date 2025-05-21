import { AxiosError } from "axios";
import api from "../application/services/api";
import { ErrorResponse } from "../domain/entities/product-response-error.entity";
import { ProductResponseSuccess } from "../domain/entities/product-response-success.entity";
import { ProductRepository } from "../domain/repositories/product.repositories";

export class ProductApi implements ProductRepository {
  async getAllProducts(): Promise<ProductResponseSuccess | ErrorResponse> {
    const url = "/products";
    try {
      const response = await api.get(url);
      return { response: response.data, status: response.status };
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status ?? 500;
        const errorData: { message: string } =
          typeof error.response?.data === "object" &&
          error.response?.data &&
          "message" in error.response.data
            ? error.response.data
            : { message: "Unknown error" };

        return { error: errorData, status };
      }
      return {
        error: { message: "An unexpected error occurred" },
        status: 500,
      };
    }
  }
  //   async getAllProducts(): Promise<ProductResponseSuccess | ErrorResponse> {
  //     try {
  //       const response = await fetch(this.baseUrl);
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data: ProductResponseSuccess = await response.json();
  //       return data;
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //       return { error: "Failed to fetch products" };
  //     }
  //   }
}
