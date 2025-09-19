import { create } from "zustand";

interface List {
  id: number;
  name: string;
}

interface ListsState {
  lists: List[];
  addList: (name: string) => void;
  loadFromStorage: () => void;
  removeList: (id: number) => void;
}

export const useListsStore = create<ListsState>((set, get) => ({
  lists: [],
  addList: (name) => {
    const currentLists = get().lists;
    const newItem = { id: currentLists.length + 1, name };
    const updatedList = [...currentLists, newItem];
    set({ lists: updatedList });
    localStorage.setItem("lists", JSON.stringify(updatedList));
  },
  loadFromStorage: () => {
    const stored = JSON.parse(localStorage.getItem("lists") || "[]");
    set({ lists: stored });
  },
  removeList: (id) => {
    const remove = get().lists.filter((list) => list.id != id);
    set({ lists: remove });
    localStorage.setItem("lists", JSON.stringify(remove));
  },
}));
