"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface User {
  id: number;
  email: string;
  about_me: string | null;
  street_address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  birthdate: string | null;
  created_at: string;
  updated_at: string;
}

export default function DataPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mt-20">Data Page</h1>
      {loading && <p className="text-gray-500 pt-5">Loading...</p>}
      {error && <p className="text-red-500 pt-5">{error}</p>}
      {!loading && !error && (
        <div className="mt-5 w-full max-w-7xl bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 px-3">
            All Users
          </h2>
          <table className="w-full table-auto">
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
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b">{user?.email || "N/A"}</td>
                  <td className="py-2 px-4 border-b">
                    {user?.about_me || "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {user?.street_address || "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b">{user?.city || "N/A"}</td>
                  <td className="py-2 px-4 border-b">{user?.state || "N/A"}</td>
                  <td className="py-2 px-4 border-b">{user?.zip || "N/A"}</td>
                  <td className="py-2 px-4 border-b">
                    {user?.birthdate || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-5">
        <button
          className="w-full py-2 px-4 bg-gray-400 text-white font-medium rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onClick={() => router.push("/admin")}
        >
          Back to admin page
        </button>
      </div>
    </div>
  );
}
