import React from "react";
import { FaPlaneDeparture } from "react-icons/fa";
import { DropdownMenu } from "./DropdownMenu";

export const Header = () => {
  return (
    <>
      <div className="border-2 w-full h-auto flex bg-orange-500 sticky top-0">
        <div className="flex gap-4 items-center">
          <FaPlaneDeparture className="w-10 h-10 text-white mb-2 ml-2" />
          <div>
              <p className="font-bold text-[14px] text-white">Ready</p>
              <p className="font-bold text-[14px] text-white">Set</p>
              <p className="font-bold text-[14px] text-white">Pack</p>
          </div>
        </div>
        <DropdownMenu/>
      </div>
    </>
  );
};
