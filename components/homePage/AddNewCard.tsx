import { useClickOutSide } from "hooks/useClickOutSide";
import Image from "next/image";
import addIcon from "public/icons/add-icon.svg";
import { useRef, useState } from "react";
import { useCartStore } from "store/cartStore";

export default function AddNewCard({ listId }: { listId: number }) {
  const [openAddNewCard, setOpenAddNewCard] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const { addCart } = useCartStore();

  const handleAddNewCard = () => {
    setOpenAddNewCard(true);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCloseNewCart = () => {
    setOpenAddNewCard(false);
    setInputValue(""); // Clear input when closing
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addCart(inputValue.trim(), listId); // Pass the listId to associate cart with this list
      setInputValue("");
      setOpenAddNewCard(false);
    }
  };

  useClickOutSide(ref, handleCloseNewCart);

  return (
    <div ref={ref}>
      {!openAddNewCard ? (
        <div
          onClick={handleAddNewCard}
          className="flex gap-1 mt-4 py-2 px-3 cursor-pointer bg-gray-800 rounded-md hover:bg-gray-600"
        >
          <Image
            src={addIcon}
            width={16}
            height={16}
            alt="add-icon"
            className="invert brightness-0"
          />
          <p>add new card</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
          <input
            type="text"
            placeholder="Enter title"
            value={inputValue}
            className="w-full h-10 px-3 placeholder:text-sm bg-gray-800 rounded-md focus:outline-0"
            onChange={handleChangeInput}
            autoFocus
          />
          <button
            className="px-3 py-2 w-fit rounded-md bg-gray-700 text-sm"
            type="submit"
          >
            add cart
          </button>
        </form>
      )}
    </div>
  );
}