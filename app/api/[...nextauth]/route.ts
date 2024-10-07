import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,  // Type assertion to ensure it's a string
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);

