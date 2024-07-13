import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
    const { username, email, password } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ error: 'Email, password, and username are required' });
    }

    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      const token = jwt.sign({ username: user.username, email: user.email }, secret as string, { expiresIn: '1h' });
      const refreshToken = jwt.sign({ username: user.username, email: user.email }, refreshTokenSecret as string, { expiresIn: '7d' });

      return res.status(200).json({ token, refreshToken });
    } catch (error) {
      console.error('Error during registration:', error);
      if (error instanceof Error) {
        return res.status(500).json({ error: 'Internal server error', details: error.message });
      } else {
        console.log('Unexpected error:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
