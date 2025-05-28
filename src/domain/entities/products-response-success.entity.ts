import { Product } from "./products.entity";

export interface ProductsResponseSuccess {
  response: {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  };
  status: number;
}
