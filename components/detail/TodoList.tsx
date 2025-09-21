import Image from "next/image";
import { useEffect, useState } from "react";
import { useTOdoSotre } from "store/todoStore";
import trashIcon from "public/icons/trash.svg";
import editIcon from "public/icons/edit.svg";
import tickIcon from "public/icons/tick.svg";

export default function TodoList({ cartId }: { cartId: string }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const {
    getTodoByCartId,
    loadTodoStorage,
    doneTodo,
    removeTodo,
    changeNameTodo,
  } = useTOdoSotre();

  useEffect(() => {
    loadTodoStorage();
  }, [loadTodoStorage]);

  const todoItems = getTodoByCartId(cartId);

  const handleSubmitText = (id: string) => {
    if (text.trim() === "") return;
    changeNameTodo(text, id);
    setEditingId(null);
    setText("");
  };

  return (
    <div className="mt-4 flex flex-col gap-3">
      {todoItems.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between border-b border-tertiary gap-2 py-1"
        >
          <div
            className="flex items-center gap-2 accent-primary cursor-pointer"
            onClick={() => (editingId ? null : doneTodo(todo.id))}
          >
            {editingId === todo.id ? (
              <input
                type="text"
                value={text}
                className="w-full text-sm px-3 py-1 border-b border-stroke-primary focus:outline-0"
                onChange={(e) => setText(e.target.value)}
              />
            ) : (
              <>
                <input type="checkbox" checked={todo.done} readOnly />
                <span className={todo.done ? "line-through text-blue-900" : "text-primary"}>
                  {todo.text}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {editingId === todo.id ? (
              <Image
                onClick={() => handleSubmitText(todo.id)}
                src={tickIcon}
                width={20}
                height={20}
                alt="tick-icon"
                className="cursor-pointer"
              />
            ) : (
              <Image
                onClick={() => {
                  setEditingId(todo.id);
                  setText(todo.text);
                }}
                src={editIcon}
                width={20}
                height={20}
                alt="edit-icon"
                className="cursor-pointer"
              />
            )}

            <Image
              onClick={() => removeTodo(todo.id)}
              src={trashIcon}
              width={20}
              height={20}
              alt="trash-icon"
              className="cursor-pointer"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
