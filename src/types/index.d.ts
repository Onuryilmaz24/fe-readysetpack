export interface SignUpResponse {
  success: boolean;
  error?: string;
}
export interface PostTripResponse {
  success: boolean;
  responese?: string;
  error?: string;
}
export interface PostChecklistResponse {
  success: boolean;
  response?: string;
  error?: string;
}
export interface UpdateChecklistItemResponse {
  success: boolean;
  response?: string;
  error?: string;
}
export interface Trip {
  trip_id?: string;
  user_id?: string;
  username: string;
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
}

export interface Events {
  name: string;
  venue: string;
  date: string;
  event_url: string;
  img_url: string;
}

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

export interface BudgetInputProps {
  budget: Budget;
  setBudget: React.Dispatch<React.SetStateAction<Budget>>;
  currency: string;
  setCurrency: (currency: string) => void;
  setInputBody: React.Dispatch<React.SetStateAction<TripPostBody>>;
  inputBody: TripPostBody;
}

export interface CitySearchProbs {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setInputBody: React.Dispatch<React.SetStateAction<TripPostBody>>;
  budget: Budget;
}

export interface CountrySearchProbs {
  searchTermPassport: string;
  setSearchTermPassport: React.Dispatch<React.SetStateAction<string>>;
  setInputBody: React.Dispatch<React.SetStateAction<TripPostBody>>;
}

export interface DatePickerProbs {
  departureDate: string;
  setDepartureDate: React.Dispatch<React.SetStateAction<string>>;
  returnDate: string;
  setReturnDate: React.Dispatch<React.SetStateAction<string>>;
  setInputBody: React.Dispatch<React.SetStateAction<TripPostBody>>;
}

export interface PeopleCountProbs {
  peopleCount: number;
  setPeopleCount: React.Dispatch<React.SetStateAction<number>>;
  setInputBody: React.Dispatch<React.SetStateAction<TripPostBody>>;
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
  country: string;
}
