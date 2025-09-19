import { useClickOutSide } from "hooks/useClickOutSide";
import Image from "next/image";
import closeIcon from "public/icons/close.svg";
import { useEffect, useRef } from "react";

interface BottomSheetProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
  height: string;
}

export default function BottomSheet({
  title,
  children,
  onClose,
  isOpen,
  height,
}: BottomSheetProps) {

  const ref = useRef(null);
  useClickOutSide(ref , onClose );

  /* --------------------------- no scroll backdrop --------------------------- */
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
      {/* --------------------------------- overlay --------------------------------  */}
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 bg-black/30 transition-opacity z-40
          ${
            isOpen
              ? "opacity-100 backdrop-blur-sm"
              : "opacity-0 pointer-events-none"
          }`}
      ></div>
      {/* --------------------------------- bottom sheet --------------------------------  */}
      <div
        className={`
        ${isOpen ? "translate-y-0" : "translate-y-full"}
        fixed bottom-0 left-0 right-0 pt-10 bg-white transition-transform duration-300 ease-in z-50
        `}
        style={{ height }}
      >
        <div ref={ref} className="w-10/12 mx-auto">
          <div className="flex justify-between items-center">
            <h5 className="text-primary text-lg">{title}</h5>
            <div
              onClick={onClose}
              className="cursor-pointer bg-stroke-primary rounded-md p-1 "
            >
              <Image src={closeIcon} width={16} height={16} alt="close-icon" />
            </div>
          </div>
          <div className="overflow-y-auto mt-10">{children}</div>
        </div>
      </div>
    </>
  );
}
