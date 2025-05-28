import { ErrorResponse } from "../entities/response-error.entity";
import { ProductsResponseSuccess } from "../entities/products-response-success.entity";
import { ProductResponseSuccess } from "../entities/product-response-success.entity";

export interface ProductRepository {
  getAllProducts: () => Promise<ProductsResponseSuccess | ErrorResponse>;
  getProductById: (id: string) => Promise<ProductResponseSuccess | ErrorResponse>;
}
