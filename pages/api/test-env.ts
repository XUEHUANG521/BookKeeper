import { NextApiRequest, NextApiResponse } from 'next';
export default function handler(req:NextApiRequest, res:NextApiResponse) {
	res.status(200).json({ databaseUrl: process.env.DATABASE_URL,
		environment: process.env.environment,
		secret: process.env.JWT_SECRET});
  }
  