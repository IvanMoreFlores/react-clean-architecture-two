import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Product } from "../../../domain/entities/products.entity";

interface Cart extends Product {
  quantity: number;
  color: string;
  size: string;
}
type CartState = {
  cart: Cart[];
  countCart: number;
  setCart: (cart: Cart) => void;
};

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        cart: [],
        setCart: (cart: Cart) => {
          const currentCart = get().cart;
          const index = currentCart.findIndex((item) => item.id === cart.id);
          if (index === -1) {
            set({ cart: [...get().cart, cart] });
            set({ countCart: get().countCart + 1 });
          } else {
            const updatedCart = [...currentCart];
            updatedCart[index].quantity = cart.quantity;
            set({ cart: updatedCart });
          }
          //   set({ cart: [...get().cart, cart] });
          //   set({ countCart: get().countCart + 1 });
        },
        countCart: 0,
      }),
      {
        name: "cart",
      }
    )
  )
);
