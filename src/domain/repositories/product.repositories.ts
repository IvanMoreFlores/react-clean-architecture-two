import { ErrorResponse } from "../entities/product-response-error.entity";
import { ProductResponseSuccess } from "../entities/product-response-success.entity";

export interface ProductRepository {
  getAllProducts: () => Promise<ProductResponseSuccess | ErrorResponse>;
}
