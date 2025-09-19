import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newListSchema } from "@schemas/newListSchema";
import { z } from "zod";

export default function NewList({onClose}:{onClose: ()=> void}) {
  type NewListSchema = z.infer<typeof newListSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewListSchema>({
    resolver: zodResolver(newListSchema),
    defaultValues: {
      newList: "",
    },
  });

  const onSubmit = (data: NewListSchema) => {

    const storedLists = JSON.parse(localStorage.getItem("lists") || "[]");

    const newItem = {
      id: storedLists.length,
      name: data.newList,
    };

    const updatedItems = [...storedLists, newItem];

    localStorage.setItem("lists", JSON.stringify(updatedItems));
    onClose()
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-6"
    >
      <div>
        <input
          type="text"
          placeholder="new list"
          className="w-full text-sm px-3 py-3 border border-stroke-primary rounded-md focus:outline-0"
          {...register("newList")}
        />
        {errors.newList && (
          <p className="text-red-500 text-xs mt-1">{errors.newList.message}</p>
        )}
      </div>
      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full bg-green text-white py-1 rounded-md"
      >
        {isSubmitting ? "sending" : "submit"}
      </button>
    </form>
  );
}
