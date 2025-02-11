import { useState } from "react";
import { getCityInfo } from "@/api/api";

export const CitySearchInput = ({ searchTerm, setSearchTerm, setInputBody }: any) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchCities = async (search: string) => {
    if (search.length < 3) return;
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
    setInputBody((prevInput:any)=>{
      return {...prevInput, destination:{
        ...prevInput.destination,
        city:city.name,
        country:city.country
      }}
    })
    setShowDropdown(false);
  };

  return (
    <label className="block text-gray-700 text-lg font-bold mb-2 text-left">Your Destination
      <div className="relative">
        <input 
          type="text" 
          className="w-full px-4 py-2 rounded-lg focus:outline-none border-2 focus:border-blue-500 border-black"
          placeholder="Type a city name.."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            searchCities(e.target.value);
          }}
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
            <div key={city.name} onClick={() => handleCitySelect(city)} className="p-3 hover:bg-gray-100 cursor-pointer flex flex-col">
              <span className="font-medium">{city.name}</span>
              <span className="text-sm text-gray-500">{city.country}</span>
            </div>
          ))}
        </div>
      )}
    </label>
  );
};
