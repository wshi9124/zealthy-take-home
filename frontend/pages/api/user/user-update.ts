import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PATCH") {
    try {
      const { currentUserId, about_me, street_address, city, state, zip, birthdate } = req.body;

      const updatedUserData = {
        about_me,
        street_address,
        city,
        state,
        zip,
        birthdate,
      };

      const response = await fetch(`http://localhost:3002/users/${currentUserId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user.");
      }

      const updatedUser = await response.json();
      res.status(200).json(updatedUser);
    } catch (error: any) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: error.message || "Failed to update user" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}