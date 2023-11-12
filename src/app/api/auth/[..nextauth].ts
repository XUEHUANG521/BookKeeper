import { prisma } from 'prisma';
import { PrismaAdapter } from "@auth/prisma-adapter"
import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(req, res, {
    providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		})
	],
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60
	},
	debug:true,
	callbacks: {
		signIn({ user, account, profile, email, credentials }) {
			console.log(user, account, profile, email, credentials)
			return true
		},
		session({ session, user, token }) {
			console.log(session, user, token)
			return session
		},
	},
	adapter: PrismaAdapter(prisma),
  })
}