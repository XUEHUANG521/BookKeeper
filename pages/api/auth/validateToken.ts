import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error('JWT_SECRET is not defined in the environment variables');
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { token } = req.body;

    try {
      jwt.verify(token, secret as string);
      res.status(200).json({ valid: true });
    } catch (error) {
      res.status(401).json({ valid: false });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
