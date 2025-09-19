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
}

export const useCartStore = create<CartStore>((set, get) => ({
  carts: [],
  
  addCart: (name, listId) => {
    const currentCart = get().carts;
    const newCart = { 
      id: uuidv4(), 
      cartName: name,
      listId: listId 
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
    return get().carts.filter(cart => cart.listId === listId);
  },
}));