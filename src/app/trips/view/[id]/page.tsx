"use client";

import { useEffect, useState } from "react";
import { Trip } from "@/types";
import { useParams } from "next/navigation";
import {
  createChecklistForTrip,
  getChecklistById,
  getSingleTripByTripId,
} from "@/api/api";
import { useAuth } from "@/context/AuthContext";
import { Header } from "@/components/shared/Header";
import { format, parseISO } from "date-fns";
import ChecklistCard from "@/components/checklist/ChecklistCard";

export default function ViewTrip() {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { user } = useAuth();
  const [checklist, setChecklist] = useState<null | {
    checklist_id: string;
    trip_id: string;
    user_id: string;
    items: { item: string; completed: boolean }[];
  }>(null);
  const trip_id = atob(params.id as string);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        if (user?.id) {
          const tripData = await getSingleTripByTripId(user.id, trip_id);
          setTrip(tripData);
          const checklistData = await getChecklistById(user.id, trip_id);
          setChecklist(checklistData || null);
        }
      } catch (error) {
        console.error("Error fetching trip:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [params.id, user]);

  const handleChecklistButton = async () => {
    const response = await createChecklistForTrip(user.id, trip_id);

    if (response.success) {
      const checklistData = await getChecklistById(user.id, trip_id);
      setChecklist(checklistData);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </>
    );
  }

  if (!trip) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-xl text-gray-600">Trip not found</div>
        </div>
      </>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "MMM dd, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 lg:flex lg:flex-row sm:flex-col">
        <div className="max-w-4xl mx-auto flex">
          {/* Hero Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="flex bg-gradient-to-r from-blue-500 to-blue-600">
              <div className="w-full p-8">
                <h1 className="text-4xl font-bold text-white mb-2">
                  {trip.destination.city}
                </h1>
                <p className="text-blue-100 text-xl">
                  {trip.destination.country}
                </p>
              </div>
              {/* Create Checklist Button */}
              {!checklist && (
                <button
                  className="border-2 w-48 h-16 mt-10 mr-6 text-blue-500 font-bold rounded-xl shadow-lg bg-white"
                  onClick={handleChecklistButton}
                >
                  Create Checklist
                </button>
              )}
            </div>
            {/* Trip Details */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Dates */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Trip Dates
                  </h3>
                  <p className="text-gray-600">
                    {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
                  </p>
                </div>

                {/* Passport & Visa */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Travel Documents
                  </h3>
                  <p className="text-gray-600">
                    Passport: {trip.passport_issued_country}
                    <br />
                    Visa Type: {trip.visa_type}
                  </p>
                </div>

                {/* Budget */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Budget
                  </h3>
                  <p className="text-gray-600">
                    Daily Cost: ${trip.daily_expected_cost}
                    <br />
                    Total Budget: ${trip.budget.amount} {trip.budget.currency}
                  </p>
                </div>

                {/* Weather */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Weather
                  </h3>
                  <p className="text-gray-600">
                    Temperature: {trip.weather.temp}°C
                    <br />
                    Condition: {trip.weather.weather_type}
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  City Information
                </h3>
                <p className="text-gray-600 whitespace-pre-line">
                  {trip.city_information}
                </p>
              </div>

              {/* Landmarks */}
              {trip.landmarks && trip.landmarks.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Landmarks to Visit
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {trip.landmarks.map((landmark, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-4 rounded-lg overflow-hidden"
                      >
                        {landmark.img_url && (
                          <div className="mb-3 h-48 w-full overflow-hidden rounded-lg">
                            <img
                              src={landmark.img_url}
                              alt={landmark.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <h4 className="font-medium text-gray-800 text-lg mb-1">
                          {landmark.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {landmark.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Events */}
              {trip.events && trip.events.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Events During Your Trip
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {trip.events.map((event, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-4 rounded-lg overflow-hidden"
                      >
                        {event.img_url && (
                          <div className="mb-3 h-48 w-full overflow-hidden rounded-lg">
                            <img
                              src={event.img_url}
                              alt={event.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <h4 className="font-medium text-gray-800 text-lg mb-1">
                          {event.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-1">
                          Venue: {event.venue}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          Date: {formatDate(event.date)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {checklist && (
          <div className="mt-6 mr-14 border-2 h-min rounded-lg bg-white shadow-md sticky top-24">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Your Checklist
              </h3>
              <div className="flex flex-col gap-4">
                {checklist.items.map((item: any) => (
                  <ChecklistCard checklistItem={item} key={item.item} user_id={user.id} trip_id={trip_id} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
