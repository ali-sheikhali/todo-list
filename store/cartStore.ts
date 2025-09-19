import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

interface Cart {
  id: string;
  cartName: string;
}

interface CartStore {
  carts: Cart[];
  addCart: (cartName: string) => void;
  loadStorage: ()=> void
}

export const useCartStore = create<CartStore>((set, get) => ({
  carts: [],
  addCart: (name) => {
    const currentCart = get().carts;
    const newCart = { id: uuidv4(), cartName: name };
    const updateCarts = [...currentCart, newCart];
    set({ carts: updateCarts });
    localStorage.setItem("carts", JSON.stringify(updateCarts));
  },
  loadStorage: () => {
    const stored = JSON.parse(localStorage.getItem("carts") || "[]");
    set({ carts: stored });
  },
}));
