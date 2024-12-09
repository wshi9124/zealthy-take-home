import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('http://localhost:3002/page_configs');
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch data' });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching page config:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}