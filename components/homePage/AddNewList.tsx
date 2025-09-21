"use client";
import BottomSheet from "@components/common/BottomSheet";
import Image from "next/image";
import addIcon from "public/icons/add-icon.svg";
import { useState } from "react";
import NewList from "./NewList";
import ModalWrapper from "@components/common/ModalWrapper";
import { useResponsive } from "hooks/useResponsive";
export default function AddNewList() {
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const responsive = useResponsive();

  const handleClick = () => {
    if (responsive) {
      setOpenModal(true);
    } else {
      setOpenBottomSheet(true);
    }
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className="w-[200px] flex gap-2 py-2 px-3 rounded-md bg-stroke-primary border border-tertiary cursor-pointer"
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
        <NewList onClose={() => setOpenBottomSheet(false)} />
      </BottomSheet>
      <ModalWrapper
        title="New list"
        onCloseAction={() => setOpenModal(false)}
        isOpen={openModal}
      >
        <NewList onClose={() => setOpenModal(false)} />
      </ModalWrapper>
    </div>
  );
}
