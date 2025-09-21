"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import trashIcon from "public/icons/trash.svg";
import editIcon from "public/icons/edit.svg";
import tickIcon from "public/icons/tick.svg";
import { useCartStore } from "store/cartStore";

interface CartListProps {
  listId: number;
}

export default function CartList({ listId }: CartListProps) {
  const { getCartsByListId, removeCart, changeCartName, moveCart } =
    useCartStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  const listCarts = getCartsByListId(listId);

  const handleSubmitText = (id: string) => {
    if (text.trim() === "") return;
    changeCartName(id, text);
    setEditingId(null);
    setText("");
  };

  // Drag start - store cart data
  const handleDragStart = (e: React.DragEvent, cart: any) => {
    e.dataTransfer.setData("cartId", cart.id);
    e.dataTransfer.setData("sourceListId", cart.listId.toString());
  };

  // Allow drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const cartId = e.dataTransfer.getData("cartId");
    const sourceListId = parseInt(e.dataTransfer.getData("sourceListId"));

    // Only move if dropping on different list
    if (sourceListId !== listId) {
      moveCart(cartId, listId);
    }
  };

  return (
    <div
      className={`flex flex-col gap-3 min-h-[50px] rounded-md border-2 border-dashed transition-colors ${
        isDragOver
          ? "border-blue-400 bg-blue-50"
          : "border-transparent hover:border-gray-400"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {listCarts.length > 0 &&
        listCarts.map((cart) => (
          <div
            key={cart.id}
            draggable={editingId !== cart.id}
            onDragStart={(e) => handleDragStart(e, cart)}
            className="flex justify-between items-center py-2 px-3 cursor-move bg-secondary rounded-md hover:bg-gray-600 transition-colors"
          >
            {editingId === cart.id ? (
              <input
                type="text"
                value={text}
                className="w-8/12 text-sm px-2 py-1 border-b border-stroke-primary focus:outline-0"
                onChange={(e) => setText(e.target.value)}
              />
            ) : (
              <Link className="w-8/12" href={`/detail/${cart.id}`}>
                <p className="flex">{cart.cartName}</p>
              </Link>
            )}

            <div className="flex gap-2">
              {editingId === cart.id ? (
                <Image
                  onClick={() => handleSubmitText(cart.id)}
                  src={tickIcon}
                  width={20}
                  height={20}
                  alt="tick-icon"
                  className="cursor-pointer"
                />
              ) : (
                <Image
                  onClick={() => {
                    setEditingId(cart.id);
                    setText(cart.cartName);
                  }}
                  src={editIcon}
                  width={20}
                  height={20}
                  alt="edit-icon"
                  className="cursor-pointer"
                />
              )}

              <Image
                onClick={() => removeCart(cart.id)}
                src={trashIcon}
                width={20}
                height={20}
                alt="trashIcon"
                className="cursor-pointer"
              />
            </div>
          </div>
        ))}
    </div>
  );
}
