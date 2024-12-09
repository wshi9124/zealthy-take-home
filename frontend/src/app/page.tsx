"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./UserContext";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { setCurrentUser } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/user/user-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Check for errors in the response
      if (!response.ok) {
        const data = await response.json();
        if (!data.error) {
          throw new Error("Failed to create account");
        }
        setError(data.error);
        setPassword("");
        return;
      }
      const data = await response.json();
      setCurrentUser(data);
      router.push("/home");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Login/ Sign up
        </h2>
        {error && <p className="text-red-500 pb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Login/ Sign Up
          </button>
        </form>
      </div>
      {/* button to navigate to admin page, in real-world scenario app would be secure via login*/}
      <div className="mt-5">
        <button
          className="w-full py-2 px-4 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onClick={() => router.push("/admin")}
        >
          Admin
        </button>
      </div>
    </div>
  );
}
