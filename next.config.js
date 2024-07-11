/** @type {import('next').NextConfig} */
require('dotenv').config();

const nextConfig = {
	env: {
	JWT_SECRET: process.env.JWT_SECRET,
	DATABASE_URL: process.env.DATABASE_URL
	},
}

module.exports = nextConfig
