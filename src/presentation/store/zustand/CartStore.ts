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
  deleteCartId: (id: number) => void;
  total: number;
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
            set({ total: get().total + cart.price * cart.quantity });
          } else {
            const updatedCart = [...currentCart];
            updatedCart[index].quantity = cart.quantity;
            set({ cart: updatedCart });
            set({ total: get().total + cart.price * cart.quantity });
          }
        },
        countCart: 0,
        total: 0,
        deleteCartId: (id: number) => {
          const itemToRemove = get().cart.find((item) => item.id === id);
          const itemTotal =
            (itemToRemove?.price ?? 0) * (itemToRemove?.quantity ?? 0);
          set({
            total: get().total - itemTotal,
          });
          set({ cart: get().cart.filter((item) => item.id !== id) });
          set({ countCart: get().countCart - 1 });
        },
      }),
      {
        name: "cart",
      }
    )
  )
);
