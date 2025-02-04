"use client";

import React from "react";
import { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { motion, AnimatePresence } from "framer-motion";

export const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex items-center ml-auto mr-3">
      <TiThMenu
        className="w-10 h-10 text-white cursor-pointer z-10"
        onClick={toggleDropdown}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{duration:0.3,ease:"easeInOut"}}
            className="absolute right-0 mt-64 w-48 bg-white border rounded-lg shadow-lg transition-all duration-300 ease-in-out"
          >
            <ul className="py-2">
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                User Profile
              </li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                Current Trips
              </li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                Trip History
              </li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                Log Out
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
