"use client"
import React from "react";
import { FaPlaneDeparture } from "react-icons/fa";
import { DropdownMenu } from "./DropdownMenu";
import { useRouter } from "next/navigation";

export const Header = () => {

  const router = useRouter();

  
  
  return (
    <>
      <div className="border-2 w-full h-auto flex bg-orange-500 sticky top-0 z-50">
        <div className="flex gap-4 items-center">
          <div className="flex flex-col p-2 hover:cursor-pointer" onClick={()=>{router.push("/home")}}>
            <FaPlaneDeparture className="w-10 h-10 text-white ml-2 mr-2 "  />
              <p className="font-bold text-[14px] text-white ml-2 mb-2 mr-2 ">Home</p>
          </div>
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
