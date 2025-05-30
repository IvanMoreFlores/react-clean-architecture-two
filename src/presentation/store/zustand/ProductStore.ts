import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Product } from "../../../domain/entities/products.entity";

interface ProductState {
  product: Product;
  setProduct: (product: Product) => void;
}

const useProductStore = create<ProductState>()(
  devtools(
    persist(
      (set) => ({
        product: {} as Product,
        setProduct: (product: Product) => set({ product }),
      }),
      {
        name: "product",
      }
    )
  )
);

export default useProductStore;
