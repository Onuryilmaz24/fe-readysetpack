"use client";

import { useEffect, useState } from "react";
import { Trip } from "@/types";
import { getTripsByUserId } from "@/api/api";
import { useAuth } from "@/context/AuthContext";
import { Header } from "@/components/shared/Header";
import TripsCard from "@/components/trips-history/trips-card";

export default function TripsHistory() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        if (user?.id) {
          const tripsData = await getTripsByUserId(user.id);
          setTrips(tripsData);
        }
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [user]);

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

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Trips</h1>
            <p className="text-lg text-gray-600">
              View and manage all your planned adventures
            </p>
          </div>

          {trips.length === 0 ? (
            // Empty state
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No trips planned yet
              </h3>
              <p className="text-gray-500">
                Start planning your next adventure today!
              </p>
            </div>
          ) : (
            // Grid of trip cards
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {trips.map((trip) => (
                <div key={trip.trip_id} className="flex justify-center">
                  <TripsCard trip={trip} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
