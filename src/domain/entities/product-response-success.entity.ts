import { Product } from "./products.entity";

export interface ProductResponseSuccess {
  response: Product;
  status: number;
}
