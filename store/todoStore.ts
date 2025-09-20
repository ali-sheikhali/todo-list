import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

interface Todo {
  id: string;
  text: string;
  cartId: string;
  done: boolean;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string, cartId: string) => void;
  loadTodoStorage: () => void;
  getTodoByCartId: (cartId: string) => Todo[];
  doneTodo: (todoId: string) => void;
}

export const useTOdoSotre = create<TodoStore>((set, get) => ({
  todos: [],
  addTodo: (text, cartId) => {
    const currentTodos = get().todos;
    const newTodo = {
      id: uuidv4(),
      text: text,
      cartId: cartId,
      done: false,
    };
    const updated = [...currentTodos, newTodo];
    set({ todos: updated });
    localStorage.setItem("todos", JSON.stringify(updated));
  },
  loadTodoStorage: () => {
    const stored = JSON.parse(localStorage.getItem("todos") || "[]");
    set({ todos: stored });
  },
  getTodoByCartId: (cartId) => {
    return get().todos.filter((todo) => todo.cartId === cartId);
  },
  doneTodo: (todoId) => {
    const updated = get().todos.map((todo) =>
      todo.id === todoId ? { ...todo, done: !todo.done } : todo
    );
    set({ todos: updated });
    localStorage.setItem("todos", JSON.stringify(updated));
  },
}));
