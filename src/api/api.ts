import axios from "axios";  
import { supabase } from "@/lib/supabase";

export const signUpUser = async (email: string, password: string, username: string, name: string) => {
  // Step 1: Sign up the user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Error signing up:", error.message);
    return { success: false, error: error.message };
  }

  const userId = data.user?.id;
  if (!userId) {
    console.error("User ID not found after signup.");
    return { success: false, error: "User ID not found." };
  }

  // Step 2: Send user info to your backend (Render API)
  try {
    const response = await axios.post("https://be-readysetpack.onrender.com/api/users", {
      user_id: userId,
      username: username,
      name: name,
    });

    console.log("User successfully inserted into database via backend!", response.data);
    return { success: true, userId };
  } catch (backendError) {
   
  }
};