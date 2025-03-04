"use client";

import { changeChecklistItemStatus } from '@/api/api';
import { useState, useEffect } from 'react';

export default function ChecklistCard({
  checklistItem,
  user_id,
  trip_id,
}: {
  checklistItem: any;
  user_id: string;
  trip_id: string;
}) {
  const [isCompleted, setIsCompleted] = useState(checklistItem.completed);

  const handleToggle = async () => {
    try {
      const result = await changeChecklistItemStatus(user_id, trip_id, checklistItem.item);
      if (result.success) {
        setIsCompleted((prev:any) => !prev);
      } else {
        console.error("Failed to update item status");
      }
    } catch (error) {
      console.error("Error while toggling item status:", error);
    }
  };

  useEffect(() => {
    setIsCompleted(checklistItem.completed);
  }, [checklistItem.completed]);

  return (
    <div
      onClick={handleToggle}
      className={`rounded-lg shadow-lg text-xl p-4 cursor-pointer hover:bg-gradient-to-r from-blue-500 to-blue-600 hover:text-white font-semibold ${
        isCompleted ? 'bg-gray-200 text-gray-400 line-through' : 'bg-white text-gray-800'
      }`}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleToggle} // This will call handleToggle on checkbox change
          className="rounded-3xl h-6 w-6"
          id={checklistItem.item}
        />
        <label className="ml-4" htmlFor={checklistItem.item}>
          {checklistItem.item}
        </label>
      </div>
    </div>
  );
}
