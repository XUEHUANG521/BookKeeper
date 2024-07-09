// pages/api/users/getusers.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle incoming requests
  res.status(200).json({ message: 'Get users endpoint' });
}
