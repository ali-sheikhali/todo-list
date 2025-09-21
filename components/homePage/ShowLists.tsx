"use client";
import { useEffect } from "react";
import { useListsStore } from "store/listStore";
import trashIcon from "public/icons/trash.svg";
import Image from "next/image";
import AddNewCard from "./AddNewCard";
import { useCartStore } from "store/cartStore";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ShowLists() {
  const { lists, loadFromStorage, removeList } = useListsStore();
  const { loadStorage, getCartsByListId, removeCart } = useCartStore();

  useEffect(() => {
    loadFromStorage();
    loadStorage();
  }, [loadFromStorage, loadStorage]);

  const handleRemoveList = (id: number) => {
    const listHasCart = getCartsByListId(id);
    if (listHasCart.length > 0) {
      toast.error("list has item.");
    } else {
      removeList(id);
    }
  };

  return (
    <div className="flex items-start gap-5">
      {lists.length > 0 ? (
        lists.map((list) => {
          const listCarts = getCartsByListId(list.id);
          return (
            <div
              key={list.id}
              className="w-[250px] flex flex-col gap-3 justify-between px-3 pt-2 pb-4 border rounded-md mb-2 bg-primary text-stroke-primary"
            >
              {/* ------------------------------ title of list ----------------------------- */}
              <div className="flex justify-between w-full pl-3 py-1">
                <span className="font-semibold">{list.name}</span>
                <button
                  onClick={() => handleRemoveList(list.id)}
                  className="text-red-500 hover:underline"
                >
                  <Image
                    src={trashIcon}
                    width={24}
                    height={24}
                    alt="trash-icon"
                    className=""
                  />
                </button>
              </div>

              {/* ------------------------------ show cards for this specific list ----------------------------- */}
              <div className="flex flex-col gap-3">
                {listCarts.length > 0 &&
                  listCarts.map((cart) => (
                    <div
                      className="flex justify-between items-center py-2 px-3 cursor-pointer bg-secondary rounded-md hover:bg-gray-600"
                      key={cart.id}
                    >
                      <Link className="w-8/12 bg-red" href={`/detail/${cart.id}`}>
                        <p className="flex ">{cart.cartName}</p>
                      </Link>
                      <div onClick={() => removeCart(cart.id)}>
                        <Image
                          src={trashIcon}
                          width={20}
                          height={20}
                          alt="trashIcon"
                        />
                      </div>
                    </div>
                  ))}
              </div>

              {/* ------------------------------ add new card ----------------------------- */}
              <AddNewCard listId={list.id} />
            </div>
          );
        })
      ) : (
        <p className="text-gray-500 mt-2">please enter new Item</p>
      )}
    </div>
  );
}
