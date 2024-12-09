import type { NextApiRequest, NextApiResponse } from 'next';

const API_URL =  'http://localhost:3002';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(`${API_URL}/users`);

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}