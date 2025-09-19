"use client";
import BottomSheet from "@components/common/BottomSheet";
import Image from "next/image";
import addIcon from "public/icons/add-icon.svg";
import { useState } from "react";
import NewList from "./NewList";
export default function AddNewList() {
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  const handleClick = () => {
    setOpenBottomSheet(true);
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className="w-full flex gap-2 py-2 px-3 rounded-md bg-gray-300 border border-tertiary cursor-pointer"
      >
        <Image src={addIcon} width={16} height={16} alt="add-icon" />
        <p>Add new list</p>
      </button>
      <BottomSheet
        title="New list"
        isOpen={openBottomSheet}
        onClose={() => setOpenBottomSheet(false)}
        height="50%"
      >
       <NewList />
      </BottomSheet>
    </div>
  );
}
