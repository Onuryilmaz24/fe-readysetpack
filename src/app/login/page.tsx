"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Header } from "@/components/shared/Header";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      setUser(data.user);
      router.push("/home");
    }
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
          <div>
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-base sm:text-lg"
            />
          </div>
          <div>
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-base sm:text-lg"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300 text-base sm:text-lg font-medium"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-2 text-sm sm:text-base">Dont have an account?</p>
          <Link 
            href="/sign-up" 
            className="text-blue-500 hover:text-blue-600 font-medium text-sm sm:text-base"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>  
    </>
  );
}