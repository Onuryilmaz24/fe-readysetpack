"use client";
import { Header } from "@/components/shared/Header";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CitySearchInput } from "@/components/input-form/CitySearchInput";
import { DatePicker } from "@/components/input-form/DatePicker";
import { CountrySearchInput } from "@/components/input-form/CountrySearchInput";
import { BudgetInput } from "@/components/input-form/BudgetInput";
import { PeopleCount } from "@/components/input-form/PeopleCount";
import { getTripsByUserId, postTrip } from "@/api/api";
import { PostTripResponse, TripPostBody } from "@/types";

export default function NewTrip() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [searchTermPassport, setSearchTermPassport] = useState("");
  const [budget, setBudget] = useState(0);
  const [currency, setCurrency] = useState("");
  const [peopleCount, setPeopleCount] = useState("");
  const [inputBody, setInputBody] = useState({
    destination: {
      city: "",
      country: "",
      currency: "",
    },
    start_date: "",
    end_date: "",
    passport_issued_country: "",
    visa_type: "",
    budget: {
      current_amount: 0,
      current_currency: "",
      destination_currency: "",
      destination_amount: 0,
    },
    people_count: 0,
    daily_expected_cost: 100,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = (await postTrip(inputBody, user.id)) as PostTripResponse;
    setLoading(false);
    if (result.success) {
      const allTrips = await getTripsByUserId(user.id)
      const newTrip = allTrips[0]
      router.push(`/trips/view/${btoa(newTrip.trip_id || '')}`);
    } else {
      console.log("post failed:", result.error);
    }
  };

  return (
    <>
      <Header />
      {user ? (
        <div className=" flex justify-center mt-2">
          <div className="bg-white w-full lg:w-3/5 h-auto flex flex-col justify-center p-8 gap-4 rounded-xl shadow-lg border border-gray-200 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Plan Your Trip
            </h1>
            <form
              className="relative w-full"
              id="trip-form"
              name="trip-form"
              onSubmit={handleSubmit}
            >
              <CitySearchInput
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setInputBody={setInputBody}
                inputBody={inputBody}
              />
              <DatePicker
                departureDate={departureDate}
                setDepartureDate={setDepartureDate}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
                setInputBody={setInputBody}
              />
              <CountrySearchInput
                searchTermPassport={searchTermPassport}
                setSearchTermPassport={setSearchTermPassport}
                setInputBody={setInputBody}
              />
              <BudgetInput
                budget={budget}
                setBudget={setBudget}
                currency={currency}
                setCurrency={setCurrency}
                setInputBody={setInputBody}
                inputBody={inputBody}
              />
              <PeopleCount
                peopleCount={peopleCount}
                setPeopleCount={setPeopleCount}
                setInputBody={setInputBody}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300 text-base sm:text-lg font-medium mt-6"
              >
                {loading ? "Loading..." : "Create New Trip"}
              </button>
            </form>
          </div>
        </div>
      ) : ( 
        <div className="w-full flex justify-center mt-20 h-full items-center">
          <div className="bg-white w-full lg:w-3/5 h-auto lg:h-[600px] flex flex-col justify-center p-8 gap-4 rounded-xl shadow-lg border border-gray-200 text-center">
            <p className="font-bold text-2xl mb-20">
              You need to sign-up / login in order to create new trip!
            </p>
            <p className="font-bold text-2xl">Dont you have an account?</p>
            <button
              onClick={() => router.push("/sign-up")}
              className="bg-green-600 text-white py-3 px-8 rounded-md hover:bg-green-700 transition-all duration-300 text-lg"
            >
              Create Account
            </button>
            <p className="font-bold text-2xl">You have an account?</p>
            <button
              onClick={() => router.push("/login")}
              className="bg-orange-600 text-white py-3 px-8 rounded-md hover:bg-orange-700 transition-all duration-300 text-lg mt-3"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </>
  );
}
