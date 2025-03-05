"use client";

import { changeChecklistItemStatus, deleteItemFromChecklist } from "@/api/api";
import { useState, useEffect } from "react";

export default function ChecklistCard({
  checklistItem,
  user_id,
  trip_id,
  handleDeleteItem,
}: {
  checklistItem: any;
  user_id: string;
  trip_id: string;
  handleDeleteItem:any
}) {
  const [isCompleted, setIsCompleted] = useState(checklistItem.completed);

  const handleToggle = async () => {
    try {
      const result = await changeChecklistItemStatus(
        user_id,
        trip_id,
        checklistItem.item
      );
      if (result.success) {
        setIsCompleted((prev: any) => !prev);
      } else {
        console.error("Failed to update item status");
      }
    } catch (error) {
      console.error("Error while toggling item status:", error);
    }
  };

  const handleDelete = async () =>{
    try {
      const result = await deleteItemFromChecklist(user_id,trip_id,checklistItem.item) 

      if(result.success){
        handleDeleteItem();
      }
      
    } catch (error) {
      console.error("Error while delete item", error);
    }
  }

  useEffect(() => {
    setIsCompleted(checklistItem.completed);
  }, [checklistItem.completed]);

  return (
    <div
      className="flex rounded-lg shadow-lg text-xl p-4 cursor-pointer hover:bg-gradient-to-r from-blue-500 to-blue-600 hover:text-white font-semibold"
      onClick={handleToggle}
    >
      <div className="flex items-center max-w-[650px]">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleToggle}
          className="rounded-3xl h-6 w-6"
          id={checklistItem.item}
        />
        <label
          className={`ml-4 p-1 rounded-md ${
            isCompleted ? "bg-gray-200 text-gray-400 line-through" : "text-gray-800"
          }`}
          htmlFor={checklistItem.item}
        >
          {checklistItem.item}
        </label>
      </div>
  
      <button className="border-2 w-10 h-10 min-h-10 min-w-10 rounded-lg ml-auto hover:bg-red-600"
      onClick={handleDelete}>
        X
      </button>
    </div>
  );
  
}
