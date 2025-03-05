export interface SignUpResponse {
  success: boolean;
  error?: string;
};
export interface PostTripResponse {
  success: boolean;
  responese?:any;
  error?: string;
};
export interface PostChecklistResponse{
	success:boolean;
	response?:any;
	error?:string;
}
export interface UpdateChecklistItemResponse{
	success:boolean;
	response?:any;
	error?:string;
}
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

export interface Landmark {
	name: string;
	description: string;
	img_url: string;
};

export interface Events {
	name: string;
	venue: string;
	date: string;
	event_url: string;
	img_url:string
};


export interface Budget {
	current_amount: number;
	current_currency: string;
	destination_currency: string;
	destination_amount: number;
  }
  
  export interface Landmarks {
	best_places_to_visit: string[];
	img_url_of_landmarks: string[];
  }
  
  export interface Destination {
	city: string;
	country: string;
	currency: string;
  }

  export interface ChecklistItem {
	item: string;
	completed: boolean;
}

  
  export interface TripPostBody {
	destination?: Destination;
	start_date?: string;
	end_date?: string;
	passport_issued_country?: string;
	visa_type?: string;
	budget?: Budget;
	people_count?: number;
	daily_expected_cost?: number;
  }

  interface BudgetInputProps {
	budget: number;
	setBudget: (budget: number) => void;
	currency: string;
	setCurrency: (currency: string) => void;
	setInputBody: (inputBody: TripPostBody) => void;
	inputBody:TripPostBody;
  }

  export interface Country {
	name: string;
	iso2: string;
	currency: {
	  name: string;
	  code: string;
	};
  }


  export interface City {
	name: string;
	country:string;
  }


  