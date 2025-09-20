"use client";
import AddNewToDo from "@components/detail/AddNewToDo";
import TodoList from "@components/detail/TodoList";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useCartStore } from "store/cartStore";
import { useTOdoSotre } from "store/todoStore";

export default function TodoDetailPage() {
  const { carts, loadStorage } = useCartStore();
  const { loadTodoStorage, getTodoByCartId } = useTOdoSotre();
  const { id } = useParams();

  useEffect(() => {
    loadStorage();
    loadTodoStorage();
  }, [loadStorage, loadTodoStorage]);

  const currentCart = carts.find((cart) => cart.id === id);
  if (currentCart)  getTodoByCartId(currentCart.id);


  return (
    <div className="w-10/12 mx-auto flex flex-col gap-8 mt-5">
      <h3 className="text-primary font-semibold"><strong>Title: </strong> {currentCart?.cartName}</h3>
      <div>
        <AddNewToDo cartId={currentCart?.id as string} />
      </div>
      <div className="flex flex-col gap-3">
        <strong>todos:</strong>
        <TodoList cartId={currentCart?.id as string} />
      </div>
    </div>
  );
}
