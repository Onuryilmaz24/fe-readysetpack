"use client";

import { addChecklistItem } from "@/api/api";
import { useState } from "react";

export default function ChecklistAddCard({
  user_id,
  trip_id,
  handleAddItem,
}: {
  user_id: string;
  trip_id: string;
  handleAddItem: () => void;
}) {


    const [item, setItem] = useState("")

    const handleSubmit = async (e:React.FormEvent) =>{
        
        e.preventDefault();
        if(item.trim().length === 0){
            alert("Item can not be empty");
            return;
        }
        
        const result = await addChecklistItem(user_id,trip_id,item)

        if(result.success){
            setItem("")
            handleAddItem();
        }else{
            console.log("post failed")
        }
    }

  return (
    <div className="my-6 w-full  bg-white shadow-md rounded-xl p-4 mx-auto flex flex-col">
      <form
        name="add-checklist"
        id="add-checklist"
        className="w-full flex flex-col flex-grow"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="input-box"
          className="font-semibold text-lg mb-2 text-gray-700"
        >
          Add Item to Checklist
        </label>
        <textarea
          name="input-box"
          id="input-box"
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition flex-grow"
          rows={2}
          placeholder="Enter checklist item..."
          onChange={(e)=>{
            setItem(e.target.value)
          }}
          value={item}
        ></textarea>
        <button
        type="submit"
        className="mt-4 bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition w-full"
      >
        Submit
      </button>
      </form>
      
    </div>
  );
}
