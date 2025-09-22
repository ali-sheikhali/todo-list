"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import searchIcon from "public/icons/search.svg";
import { useClickOutSide } from "hooks/useClickOutSide";
import { useCartStore } from "store/cartStore";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const { carts } = useCartStore();
  const ref = useRef(null);

  const filteredCarts = carts.filter((cart) =>
    cart.cartName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleClick = () => {
    setSearchText("");
  };

  useClickOutSide(ref, () => {
    setSearchText("");
  });

  return (
    <div
      ref={ref}
      className="relative py-1 pl-8 cursor-pointer bg-secondary rounded-md hover:bg-gray-600"
    >
      {/* ----------------------------- search bar -----------------------------  */}
      <input
        placeholder="search..."
        type="text"
        className="w-[150px] sm:w-[250px] md:w-[350px] xl:w-[450px] focus:outline-0"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="absolute top-2 left-2">
        <Image src={searchIcon} width={16} height={16} alt="searchIcon" />
      </div>
      {/* ----------------------------- search results -----------------------------  */}
      {searchText && (
        <div className="absolute top-10 left-0 w-full bg-stroke-primary text-primary shadow-lg rounded-md z-10 max-h-60 overflow-y-auto">
          {filteredCarts.length > 0 ? (
            filteredCarts.map((cart: { id: string; cartName: string }) => (
              <div className="w-11/12 mx-auto py-2 border-b last:border-0 border-primary" key={cart.id}>
                <Link href={`/detail/${cart.id}`}>
                  <div
                    onClick={handleClick}
                    className="w-11/12 mx-auto py-2 cursor-pointer border-b border-secondary last:border-0"
                  >
                    {cart.cartName}
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}
