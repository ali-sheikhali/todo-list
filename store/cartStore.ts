import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

interface Cart {
  id: string;
  cartName: string;
  listId: number;
}

interface CartStore {
  carts: Cart[];
  addCart: (cartName: string, listId: number) => void;
  loadStorage: () => void;
  getCartsByListId: (listId: number) => Cart[];
  removeCart: (cartId: string) => void;
  changeCartName: (id: string, newName: string) => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  carts: [],

  addCart: (name, listId) => {
    const currentCart = get().carts;
    const newCart = {
      id: uuidv4(),
      cartName: name,
      listId: listId,
    };
    const updateCarts = [...currentCart, newCart];
    set({ carts: updateCarts });
    localStorage.setItem("carts", JSON.stringify(updateCarts));
  },

  loadStorage: () => {
    const stored = JSON.parse(localStorage.getItem("carts") || "[]");
    set({ carts: stored });
  },
  getCartsByListId: (listId) => {
    return get().carts.filter((cart) => cart.listId === listId);
  },
  removeCart: (cartId) => {
    const updated = get().carts.filter((cart) => cart.id != cartId);
    set({ carts: updated });
    localStorage.setItem("carts", JSON.stringify(updated));
  },
  changeCartName: (id, newName) => {
    const updated = get().carts.map((cart) =>
      cart.id === id ? { ...cart, cartName: newName } : cart
    );
    set({ carts: updated });
    localStorage.setItem("carts", JSON.stringify(updated));
  },
}));
