import { useState } from "react";
import { useTOdoSotre } from "store/todoStore";

export default function AddNewToDo({cartId}:{cartId:string}) {

      const [text, setText] = useState("");

    const {addTodo} = useTOdoSotre()

    const handleFormSubmit = (e: React.FormEvent)=>{
        e.preventDefault()
        if(text.trim()=== "") return
        addTodo(text, cartId)
        setText("")
    }
  return (
    <form action="" onSubmit={handleFormSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="add todo"
        className="w-full text-sm px-3 py-2 border border-stroke-primary rounded-md focus:outline-0"
        onChange={(e)=>setText(e.target.value)}
      />
      <button type="submit" className="bg-blue-800 text-sm rounded-md text-white px-3 py-2">submit</button>
    </form>
  );
}
