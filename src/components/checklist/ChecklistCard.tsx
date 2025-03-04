"use client"

export default function ChecklistCard({
    checklistItem,
  }: {
    checklistItem: any;
  }) {
    return (
      <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
        <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
          {/* Placeholder for Checkbox */}
        </div>
        <p
          className={`text-lg text-gray-800 ${checklistItem.completed ? 'line-through text-gray-400' : ''}`}
        >
          {checklistItem.item}
        </p>
      </div>
    );
  }