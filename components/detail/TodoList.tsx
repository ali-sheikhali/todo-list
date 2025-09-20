import { useEffect } from "react";
import { useTOdoSotre } from "store/todoStore";

export default function TodoList({ cartId }: { cartId: string }) {
  const { getTodoByCartId, loadTodoStorage , doneTodo } = useTOdoSotre();

  useEffect(() => {
    loadTodoStorage();
  }, [loadTodoStorage]);

  const todoItems = getTodoByCartId(cartId);

  return (
    <div className="mt-4 flex flex-col gap-3">
      {todoItems.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center gap-2 py-1 cursor-pointer accent-primary"
            onClick={() => doneTodo(todo.id)}
        >
          <input type="checkbox" checked={todo.done} readOnly />
          <span className={todo.done ? "line-through" : ""}>{todo.text}</span>
        </div>
      ))}
    </div>
  );
}
