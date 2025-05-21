import { Product } from "./product.entity";

export interface ProductResponseSuccess {
  response: {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  };
  status: number;
}
