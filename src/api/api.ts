import axios from "axios";
import { supabase } from "@/lib/supabase";
import {
  PostChecklistResponse,
  PostTripResponse,
  SignUpResponse,
  UpdateChecklistItemResponse,
} from "@/types";

const backendApi = axios.create({
  baseURL: "https://readysetpack.onrender.com/api",
});

const cityApiNinjas = axios.create({
  baseURL: "https://api.api-ninjas.com/v1",
  headers: {
    "X-Api-Key": process.env.NEXT_PUBLIC_NINJA_API_KEY,
  },
});

export const signUpUser = async (
  email: string,
  password: string,
  username: string,
  name: string
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    const response: SignUpResponse = {
      success: false,
      error: error.message,
    };
    return response;
  }
  const userId = data.user?.id;
  if (!userId) {
    const response: SignUpResponse = {
      success: false,
      error: "User ID not found.",
    };
    return response;
  }
  try {
    const response = await backendApi.post("/users", {
      user_id: userId,
      username: username,
      name: name,
    });

    return { success: true, userId };
  } catch (backendError) {}
};

export const getCityInfo = async (city: string) => {
  try {
    const response = await cityApiNinjas.get("/city", {
      params: {
        name: city,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};
export const getCountryInfo = async (country: string) => {
  try {
    const response = await cityApiNinjas.get("/country", {
      params: {
        name: country,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};

export const postTrip = async (postBody: any, user_id: string) => {
  try {
    const response: PostTripResponse = await backendApi.post(
      `/trips/${user_id}`,
      postBody
    );

    return { success: true, response };
  } catch (error) {
    console.log("Error:", error);
    const response: PostTripResponse = {
      success: false,
    };
    return response;
  }
};

export const fetchCurrencyByCountry = async (countryCode: string) => {
  try {
    const response = await fetch("/data/currencies.json");
    const currencyData = await response.json();
    return currencyData[countryCode] || null;
  } catch (error) {
    console.error("Error fetching local currency data:", error);
    return null;
  }
};

export const getTripsByUserId = async (user_id: string) => {
  try {
    const response = await backendApi.get(`/trips/${user_id}`);
    return response.data.trips;
  } catch (error) {
    console.error("Error fetching trips by user ID:", error);
    return [];
  }
};

export const getSingleTripByTripId = async (
  user_id: string,
  trip_id: string
) => {
  try {
    const response = await backendApi.get(`/trips/${user_id}/${trip_id}`);
    return response.data.trip;
  } catch (error) {
    console.error("Error fetching trips by user ID:", error);
  }
};
export const getChecklistById = async (user_id: string, trip_id: string) => {
  try {
    const response = await backendApi.get(`/checklists/${user_id}/${trip_id}`);
    return response.data.checklist;
  } catch (error) {
    console.error("Error fetching checklist by user ID:", error);
  }
};
export const createChecklistForTrip = async (
  user_id: string,
  trip_id: string
) => {
  try {
    const response: PostChecklistResponse = await backendApi.post(
      `/checklists/${user_id}/${trip_id}`
    );
    return { success: true, response };
  } catch (error) {
    console.log("Error:", error);
    const response: PostTripResponse = {
      success: false,
    };
    return response;
  }
};

export const changeChecklistItemStatus = async (
  user_id: string,
  trip_id: string,
  item: string
) => {
  try {
    const response: UpdateChecklistItemResponse = await backendApi.patch(
      `/checklists/${user_id}/${trip_id}/change-status`,
      {newItem : item}
    );
    return { success: true, response };
  } catch (error) {
    console.log("Error:", error);
    const response: PostTripResponse = {
      success: false,
    };
    return response;
  }
};
export const addChecklistItem = async (
  user_id: string,
  trip_id: string,
  item: string
) => {
  try {
    const response: UpdateChecklistItemResponse = await backendApi.patch(
      `/checklists/${user_id}/${trip_id}`,
      {newItem : item}
    );
    console.log("func called")
    return { success: true, response };
  } catch (error) {
    console.log("Error:", error);
    const response: PostTripResponse = {
      success: false,
      error:"failed to post"
    };
    return response;
  }
};


