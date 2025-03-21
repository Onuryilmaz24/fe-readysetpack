"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/shared/Header";
import { signUpUser } from "@/api/api";
import { SignUpResponse } from "@/types";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const router = useRouter();

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!password) return "Password is required.";
    if (!passwordRegex.test(password)) {
      setIsPasswordValid(false);
      return "Password must be at least 8 characters long, include a number, and a special character.";
    }
    setIsPasswordValid(true);
    return null;
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const error = validatePassword(password);
    setPasswordError(error);
    if (error) return;

    setLoading(true);

    const result = (await signUpUser(
      email,
      password,
      username,
      name
    )) as SignUpResponse;

    setLoading(false);

    if (result.success) {
      router.push("/login");
    } else {
      console.error("Signup failed:", result.error);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
            Sign Up
          </h2>
          <form onSubmit={handleSignUp} className="space-y-4 sm:space-y-6">
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-base sm:text-lg"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-base sm:text-lg"
              />
            </div>
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
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
                required
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg focus:outline-none text-base sm:text-lg ${
                  isPasswordValid === null
                    ? "border-gray-300"
                    : isPasswordValid
                    ? "border-green-500"
                    : "border-red-500"
                }`}
              />
              {isPasswordFocused && !passwordError && !isPasswordValid && (
                <div className="absolute text-sm bg-gray-100 border p-2 rounded-lg shadow-md left-0 mt-2 w-full">
                  <p className="text-gray-600">Password must:</p>
                  <ul className="text-gray-500">
                    <li>Be at least 8 characters long</li>
                    <li>Include at least one number</li>
                    <li>Include at least one special character (!@#$%^&*)</li>
                  </ul>
                </div>
              )}
              {passwordError && isPasswordValid === false && (
                <p className="text-red-500 text-sm mt-2">{passwordError}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300 text-base sm:text-lg font-medium"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-2 text-sm sm:text-base">
              Already have an account?
            </p>
            <Link
              href="/login"
              className="text-blue-500 hover:text-blue-600 font-medium text-sm sm:text-base"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
