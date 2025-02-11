import { useState } from "react";
import { getCountryInfo } from "@/api/api";

export const BudgetInput = ({
  budget,
  setBudget,
  currency,
  setCurrency,
  setInputBody,
}: any) => {
  const [showDropdownPassport, setShowDropdownPassport] = useState(false);
  const [passportCountries, setPassportCountries] = useState([]);
  const [isLoadingPassport, setIsLoadingPassport] = useState(false);

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

  const handleCurrencySelect = (country: any) => {
    setCurrency(`${country.currency.name}, ${country.currency.code}`);
    setInputBody((prevInput: any) => {
      return {
        ...prevInput,
        budget: {
          ...prevInput.budget,
          current_currency: country.currency.code,
        },
      };
    });
    setShowDropdownPassport(false);
  };

  return (
    <>
      <div className="flex gap-16">
        <div className="flex">
          <label className="text-gray-700 text-lg font-bold mt-6 text-left">
            Budget Amount
            <div className="relative">
              <input
                type="number"
                className="w-full px-4 py-2 rounded-lg focus:outline-none border-2 focus:border-blue-500 border-black"
                placeholder="Amount"
                value={budget}
                onChange={(e) => {
                  const newBudget = e.target.value
                  setBudget(newBudget);
                  setInputBody((prevInput: any) => {
                    return {
                      ...prevInput,
                      budget: {
                        ...prevInput.budget,
                        current_amount: newBudget,
                      },
                    };
                  });
                }}
              />
            </div>
          </label>
        </div>
        <div className="flex">
          <label className="block text-gray-700 text-lg font-bold mt-6 text-left">
            Currency Country
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg focus:outline-none border-2 focus:border-blue-500 border-black"
                placeholder="Type a country name.."
                value={currency}
                onChange={(e) => {
                  setCurrency(e.target.value);
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
              <div className="absolute z-50 w-auto mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                {passportCountries.map((country: any) => (
                  <div
                    key={country.name}
                    onClick={() => handleCurrencySelect(country)}
                    className="p-3 hover:bg-gray-100 cursor-pointer flex flex-col"
                  >
                    <span className="font-medium">{country.name}</span>
                    <span className="text-sm text-gray-500">
                      {country.iso2}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </label>
        </div>
      </div>
    </>
  );
};
