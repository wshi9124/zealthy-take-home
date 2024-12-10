"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [components, setComponents] = useState([
    { name: "About Me", page: 1 },
    { name: "Address", page: 1 },
    { name: "Birthdate", page: 2 },
  ]);

  const handlePageChange = (index: number, newPage: number) => {
    // Ensure at least one component remains for each page
    const pageCount = components.reduce((count, component) => {
      count[component.page] = (count[component.page] || 0) + 1;
      return count;
    }, {} as Record<number, number>);

    if (
      pageCount[components[index].page] === 1 &&
      components[index].page !== newPage
    ) {
      setError(
        `At least one component must remain on Page ${components[index].page}`
      );
      return;
    }
    setError(null);
    const updatedComponents = [...components];
    updatedComponents[index].page = newPage;
    setComponents(updatedComponents);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const pageConfigData = components.reduce((acc, component) => {
      if (!acc[component.page]) acc[component.page] = [];
      acc[component.page].push(component.name.toLowerCase().replace(" ", "_"));
      return acc;
    }, {} as Record<number, string[]>);

    try {
      const response = await fetch("/api/page_config/page-config-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page_config: pageConfigData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to update Page Configurations"
        );
      }

      setSuccess("Page configurations updated successfully!");
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mt-20">Admin Page</h1>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mt-5">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Page Configurations
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <table className="w-full table-auto mb-4">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Component</th>
                <th className="py-2 px-4 border-b text-left">Page Number</th>
              </tr>
            </thead>
            <tbody>
              {components.map((component, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{component.name}</td>
                  <td className="py-2 px-4 border-b">
                    <select
                      value={component.page}
                      onChange={(e) =>
                        handlePageChange(index, parseInt(e.target.value))
                      }
                      className="py-1 px-2 border rounded-lg"
                    >
                      <option value={1}>Page 1</option>
                      <option value={2}>Page 2</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="submit"
            className="w-1/2 py-2 px-4 bg-blue-400 text-white font-medium rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Change order
          </button>
        </form>
      </div>

      <div className="flex mt-5 gap-4 w-full max-w-2xl">
        <button
          className="w-full py-2 px-4 bg-gray-400 text-white font-medium rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onClick={() => router.push("/")}
        >
          Back to login
        </button>
        <button
          className="w-full py-2 px-4 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onClick={() => router.push("/data")}
        >
          See all submission data
        </button>
      </div>
    </div>
  );
}
