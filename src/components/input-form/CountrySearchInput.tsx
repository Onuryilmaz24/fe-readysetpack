import { useState } from "react";
import { getCountryInfo } from "@/api/api";
import { Country, CountrySearchProbs, TripPostBody } from "@/types";

export const CountrySearchInput = ({ searchTermPassport, setSearchTermPassport , setInputBody}: CountrySearchProbs) => {
  const [showDropdownPassport, setShowDropdownPassport] = useState<boolean>(false);
  const [passportCountries, setPassportCountries] = useState<Country[]>([]);
  const [isLoadingPassport, setIsLoadingPassport] = useState<boolean>(false);

  const searchPassportCountries = async (search: string) => {
    if (search.length < 3) return;
    setIsLoadingPassport(true);
    try {
      const response = await getCountryInfo(search);
      setPassportCountries(response);
      setShowDropdownPassport(true);
    } catch (error) {
      console.error("Error fetching countries", error);
    }
    setIsLoadingPassport(false);
  };

  const handleCountrySelect = (country: Country) => {
    setSearchTermPassport(`${country.name}, ${country.iso2}`);
    setInputBody((prevInput:TripPostBody)=>{
      return {...prevInput, passport_issued_country:country.iso2}
    })
    setShowDropdownPassport(false);
  };

  return (
    <label className="block text-gray-700 text-lg font-bold mt-6 text-left">
      Passport Issued Country
      <div className="relative">
        <input 
          type="text" 
          required
          className="w-full px-4 py-2 rounded-lg focus:outline-none border-2 focus:border-blue-500 border-black"
          placeholder="Type a country name.."
          value={searchTermPassport}
          onChange={(e) => {
            setSearchTermPassport(e.target.value);
            searchPassportCountries(e.target.value);
          }}
        />
        {isLoadingPassport && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        )}
      </div>
      {showDropdownPassport && passportCountries.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {passportCountries.map((country: Country) => (
            <div key={country.name} onClick={() => handleCountrySelect(country)} className="p-3 hover:bg-gray-100 cursor-pointer flex flex-col">
              <span className="font-medium">{country.name}</span>
              <span className="text-sm text-gray-500">{country.iso2}</span>
            </div>
          ))}
        </div>
      )}
    </label>
  );
};
