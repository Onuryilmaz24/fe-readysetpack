import axios from "axios";
import { supabase } from "@/lib/supabase";
import SignUpResponse from "@/types/index.d";

const backendApi = axios.create({
  baseURL: "https://readysetpack.onrender.com/api",
});

const cityApiNinjas = axios.create({
  baseURL: "https://api.api-ninjas.com/v1",
  headers: { 
    'X-Api-Key': process.env.NEXT_PUBLIC_NINJA_API_KEY
  }
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
    const response = await backendApi.post(
      "/users",
      {
        user_id: userId,
        username: username,
        name: name,
      }
    );

    return { success: true, userId };
  } catch (backendError) {}
};

export const getCityInfo = async (city: string) => {
  try {
    const response = await cityApiNinjas.get('/city', {
      params: {
        name: city,
      }
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
};
export const getCountryInfo = async (country: string) => {
  try {
    const response = await cityApiNinjas.get('/country', {
      params: {
        name: country,
      }
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
};

