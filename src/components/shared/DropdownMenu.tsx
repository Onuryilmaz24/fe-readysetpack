"use client";

import React from "react";
import { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getTripsByUserId } from "@/api/api";

export const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user, setUser } = useAuth();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
    } else {
      setUser(null); // Clear the user state
      router.push("/home");
    }
  };

  const handleLatestTrip = async () => {
    if (!user) return; // Early return if user is null
    const allTrips = await getTripsByUserId(user.id)
    const latestTrip = allTrips[0]
    if(latestTrip.trip_id){
      router.push(`/trips/view/${btoa(latestTrip.trip_id || '')}`)
    }else{
      router.push("/trips-history")
    }
  }
 

  return (
    <div className="relative flex items-center ml-auto mr-3">
      <TiThMenu
        className="w-10 h-10 text-white cursor-pointer z-10"
        onClick={toggleDropdown}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`absolute right-0 w-48 bg-white border rounded-lg shadow-lg ${
              user ? "mt-[300px]" : "mt-40"
            } transition-all duration-300 ease-in-out`}
          >
            {user ? (
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  User Profile
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    router.push("/new-trip");
                  }}
                >
                  Create New Trip
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={handleLatestTrip}
                >
                  Latest Trip
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                 onClick={() => {
                  router.push("/recent-trips");
                }}>
                  Current Trips History
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                 onClick={() => {
                  router.push("/past-trips");
                }}>
                  Past Trip History
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={handleLogout}
                >
                  Log Out
                </li>
              </ul>
            ) : (
              <ul className="py-2">
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => router.push("/login")}
                >
                  Login
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => router.push("/sign-up")}
                >
                  Sign Up
                </li>
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
