import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

if (!secret) {
  throw new Error('JWT_SECRET is not defined in the environment variables');
} else if (!refreshTokenSecret) {
  throw new Error('REFRESH_TOKEN_SECRET is not defined in the environment variables');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token is required' });
    }

    try {
      const decoded = jwt.verify(refreshToken, refreshTokenSecret as string);
      const user = await prisma.user.findUnique({ where: { email: (decoded as any).email } });

      if (!user) {
        return res.status(401).json({ error: 'Invalid refresh token' });
      }

      const newToken = jwt.sign({ username: user.username, email: user.email }, secret as string, { expiresIn: '1h' });

      return res.status(200).json({ success: true, token: newToken });
    } catch (error) {
      console.error('Error during token refresh:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
