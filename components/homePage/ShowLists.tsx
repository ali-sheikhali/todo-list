"use client";
import { useEffect } from "react";
import { useListsStore } from "store/listStore";
import trashIcon from "public/icons/trash.svg";
import Image from "next/image";
import AddNewCard from "./AddNewCard";
export default function ShowLists() {
  const { lists, loadFromStorage, removeList } = useListsStore();

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  return (
    <div className="flex items-center gap-5">
      {lists.length > 0 ? (
        lists.map((list) => (
          <div
            key={list.id}
            className="w-[250px] flex flex-col gap-3 justify-between  px-3 pt-2 pb-4 border rounded mb-2 bg-[#101204] text-[#BFC1C4] "
          >
            {/* ------------------------------ title of list -----------------------------  */}
            <div className="flex justify-between w-full pl-3 py-1">
              <span className="font-semibold">{list.name}</span>
              <button
                onClick={() => removeList(list.id)}
                className="text-red-500 hover:underline"
              >
                <Image
                  src={trashIcon}
                  width={24}
                  height={24}
                  alt="trash-icon"
                  className="filter brightness-0 invert"
                />
              </button>
            </div>
            {/* ------------------------------ add new card -----------------------------  */}
            <AddNewCard />
          </div>
        ))
      ) : (
        <p className="text-gray-500 mt-2">please enter new Item</p>
      )}
    </div>
  );
}
