"use client";
import { useClickOutSide } from "hooks/useClickOutSide";
import Image from "next/image";
import close from "public/icons/close.svg"
import { useEffect, useRef } from "react";

interface ModalWrapperProps {
  title: string;
  onCloseAction: () => void;
  children: React.ReactNode;
  isOpen: boolean;
}

export default function ModalWrapper({
  title,
  onCloseAction,
  children,
  isOpen,
}: ModalWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutSide(ref, onCloseAction);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  return (
    <>
      {/* Overlay */}

      {isOpen && (
        <>
          <div className="fixed inset-0 z-[10000] bg-black/30 backdrop-blur-md transition-opacity"></div>

          {/* Modal */}
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 mt-10">
            <div
              ref={ref}
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg bg-white p-6 shadow-lg"
            >
              <div className="flex items-center justify-between pb-4">
                <h3 className="text-xl font-bold">{title}</h3>
                <button
                  onClick={onCloseAction}
                  className="rounded-full p-2 hover:bg-gray-100 focus:outline-none cursor-pointer"
                >
                  <Image src={close} width={24} height={24} alt="close" />
                </button>
              </div>
              <div>{children}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
