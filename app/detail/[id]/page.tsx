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
    <div className="w-11/12 lg:w-8/12 xl:w-6/12 mx-auto flex flex-col gap-8 py-5">
      <h3 className="text-primary font-semibold"><strong>Title: </strong> {currentCart?.cartName}</h3>
      <div>
        <AddNewToDo cartId={currentCart?.id as string} />
      </div>
      <div className="flex flex-col">
        <strong className="text-primary">Todos:</strong>
        <TodoList cartId={currentCart?.id as string} />
      </div>
    </div>
  );
}
