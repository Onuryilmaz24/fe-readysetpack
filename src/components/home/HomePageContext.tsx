"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { getCityInfo } from "@/api/api";
export const Context = () => {
  const router = useRouter();

  const { user, setUser } = useAuth();

  const [showDropdown, setShowDropdown] = useState(false);
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const searchCities = async (search:string) =>{
    if (search.length < 2) return;
    setIsLoading(true);
    try {
      const response = await getCityInfo(search);
      setCities(response);
      setShowDropdown(true);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
    setIsLoading(false);
  };

  const handleCitySelect = (city: any) => {
    setSearchTerm(`${city.name}, ${city.country}`);
    setShowDropdown(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full h-auto mt-16 bg-gray-100 py-12"
      >
        <div className="flex flex-col lg:flex-row items-center gap-10 justify-center w-11/12 mx-auto">
          <div className="bg-white w-full lg:w-3/5 h-auto lg:h-[600px] flex flex-col justify-center p-8 rounded-xl shadow-lg border border-gray-200">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Ready Set Pack...
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Your ultimate travel companion for international trips. With
              ReadySetPack, you can easily plan and manage your travel
              experience. Get important information about your destination, such
              as weather updates, local customs, safety tips, and more. Start
              your journey with confidence by creating your personalized trip
              checklist!
            </p>
          </div>
          {user ? (
            <div className="bg-white w-full lg:w-3/5 h-auto lg:h-[600px] flex flex-col justify-center p-8 gap-4 rounded-xl shadow-lg border border-gray-200">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Let's get started!
              </h1>
              <form className="relative w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Your Destination 
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={searchTerm} 
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      searchCities(e.target.value);
                    }}
                    className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Type a city name..."
                  />
                  {isLoading && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
                    </div>
                  )}
                </div>
                
                {showDropdown && cities.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {cities.map((city: any) => (
                      <div
                        key={city.name}
                        onClick={() => handleCitySelect(city)}
                        className="p-3 hover:bg-gray-100 cursor-pointer flex flex-col"
                      >
                        <span className="font-medium">{city.name}</span>
                        <span className="text-sm text-gray-500">{city.country}</span>
                      </div>
                    ))}
                  </div>
                )}
              </form>
            </div>
          ) : (
            <div className="bg-white w-full lg:w-3/5 h-auto lg:h-[600px] flex flex-col justify-center p-8 gap-4 rounded-xl shadow-lg border border-gray-200">
              <button className="bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 transition-all duration-300 text-lg">
                Learn More
              </button>
              <button
                onClick={() => router.push("/sign-up")}
                className="bg-green-600 text-white py-3 px-8 rounded-md hover:bg-green-700 transition-all duration-300 text-lg"
              >
                Create Account
              </button>
              <button
                onClick={() => router.push("/login")}
                className="bg-orange-600 text-white py-3 px-8 rounded-md hover:bg-orange-700 transition-all duration-300 text-lg"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};
