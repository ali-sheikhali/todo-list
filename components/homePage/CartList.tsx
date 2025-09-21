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
  
  const { getCartsByListId, removeCart, changeCartName } = useCartStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [text, setText] = useState("");

  const listCarts = getCartsByListId(listId);

  const handleSubmitText = (id: string) => {
    if (text.trim() === "") return;
    changeCartName(id, text);
    setEditingId(null);
    setText("");
  };

  return (
    <div className="flex flex-col gap-3">
      {listCarts.length > 0 &&
        listCarts.map((cart) => (
          <div
            key={cart.id}
            className="flex justify-between items-center py-2 px-3 cursor-pointer bg-secondary rounded-md hover:bg-gray-600"
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
