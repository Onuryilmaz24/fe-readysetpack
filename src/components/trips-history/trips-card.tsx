"use client";

import { Trip } from "@/types";
import { useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";

export default function TripsCard({ trip }: { trip: Trip }) {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM dd, yyyy');
    } catch (error) {
      console.log(error)
      return dateString;
    }
  };

  const handleClick = () => {
    router.push(`/trips/view/${btoa(trip.trip_id || '')}`);
  };

  // Get the first landmark image if available
  const cardImage = trip.landmarks && trip.landmarks.length > 0 
    ? trip.landmarks[0].img_url 
    : null;

  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer w-[320px]"
      onClick={handleClick}
    >
      {/* Image Section */}
      <div className="h-48 w-full overflow-hidden">
        {cardImage ? (
          <img 
            src={cardImage}
            alt={trip.destination.city}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600" />
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="mb-3">
          <h2 className="text-2xl font-bold text-gray-800">
            {trip.destination.city}
          </h2>
          <p className="text-blue-600 font-medium">
            {trip.destination.country}
          </p>
        </div>

        {/* Date Range */}
        <div className="bg-gray-50 rounded-lg px-3 py-2 mb-3">
          <p className="text-sm text-gray-600">
            {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
          </p>
        </div>

        {/* Quick Info */}
        <div className="flex justify-between text-sm text-gray-500">
          <span>{trip.landmarks?.length || 0} landmarks</span>
          <span>{trip.events?.length || 0} events</span>
        </div>
      </div>
    </div>
  );
}
