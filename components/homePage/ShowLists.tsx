"use client";
import { useEffect } from "react";
import { useListsStore } from "store/listStore";

export default function ShowLists() {
  const { lists, loadFromStorage ,removeList } = useListsStore();

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  return (
    <div className="flex gap-5">
      {lists.length > 0 ? (
        lists.map((list) => (
          <div
            key={list.id}
            className="w-[250px] flex justify-between items-center p-2 border rounded mb-2 bg-gray-50"
          >
            <span>{list.name}</span>
            <button
              onClick={() => removeList(list.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">no items</p>
      )}
    </div>
  );
}
