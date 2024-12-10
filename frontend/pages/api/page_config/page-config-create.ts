import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { page_config } = req.body;

      // Make a POST request to the external service (localhost:3002/page_configs)
      const response = await fetch('http://localhost:3002/page_configs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ page_config }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update Page Configurations on external server');
      }

      const responseData = await response.json();
      res.status(200).json({ message: responseData.message || 'Page configurations updated successfully!' });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: error.message || 'Failed to update page configurations' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}