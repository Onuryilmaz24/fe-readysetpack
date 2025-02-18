export interface SignUpResponse {
  success: boolean;
  error?: string;
};
export interface PostTripResponse {
  success: boolean;
  responese?:any;
  error?: string;
};

export interface Trip {
	trip_id?: string;
	user_id?: string;
	username:string;
	destination: Destination;
	start_date: string;
	end_date: string;
	passport_issued_country: string;
	weather: Weather;
	visa_type: string;
	budget: Budget;
	is_booked_hotel: boolean;
	people_count: number;
	city_information: string;
	landmarks: Landmark[];
	events: Events[];
	daily_expected_cost: number;
}
