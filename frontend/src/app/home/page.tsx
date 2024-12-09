"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../UserContext";
import OnboardForm from "../components/form/onboard-form";

export default function HomePage() {
  const { currentUser, setCurrentUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  // Check if any user fields are null or empty
  const isUserIncomplete = () => {
    if (!currentUser) return true; // No user means incomplete
    const requiredFields = [
      "about_me",
      "street_address",
      "city",
      "state",
      "zip",
      "birthdate",
    ];
    return requiredFields.some(
      (field) => !currentUser[field] || currentUser[field].trim() === ""
    );
  };

  if (isUserIncomplete()) {
    return <OnboardForm />;
  }

  const handleLogout = () => {
    setCurrentUser(null);
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800">
        Thank you for signing up
      </h1>
      {/* Table to display the current user's info */}
      <table className="w-full max-w-7xl table-auto mt-5">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">About Me</th>
            <th className="py-2 px-4 border-b text-left">Street Address</th>
            <th className="py-2 px-4 border-b text-left">City</th>
            <th className="py-2 px-4 border-b text-left">State</th>
            <th className="py-2 px-4 border-b text-left">Zip</th>
            <th className="py-2 px-4 border-b text-left">Birthdate</th>
          </tr>
        </thead>
        <tbody>
          <tr key={currentUser?.id}>
            <td className="py-2 px-4 border-b">
              {currentUser?.email || "N/A"}
            </td>
            <td className="py-2 px-4 border-b">
              {currentUser?.about_me || "N/A"}
            </td>
            <td className="py-2 px-4 border-b">
              {currentUser?.street_address || "N/A"}
            </td>
            <td className="py-2 px-4 border-b">{currentUser?.city || "N/A"}</td>
            <td className="py-2 px-4 border-b">
              {currentUser?.state || "N/A"}
            </td>
            <td className="py-2 px-4 border-b">{currentUser?.zip || "N/A"}</td>
            <td className="py-2 px-4 border-b">
              {currentUser?.birthdate || "N/A"}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Buttons */}
      <div className="flex flex-col mt-5 gap-4">
        <button
          className="w-full py-2 px-4 bg-gray-400 text-white font-medium rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onClick={handleLogout}
        >
          Back to login
        </button>
      </div>
    </div>
  );
}
