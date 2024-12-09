import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      // Forward the request to the backend API
      const response = await fetch("http://localhost:3002/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        return res.status(response.status).json({ error: data.error || "Failed to create account" });
      }

      const data = await response.json();
      return res.status(201).json(data);
    } catch (error) {
        console.log(error)
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}