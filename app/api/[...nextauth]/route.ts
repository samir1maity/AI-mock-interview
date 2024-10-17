// import NextAuth, { AuthOptions, Session } from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// import GitHubProvider from 'next-auth/providers/github';
// import { PrismaAdapter } from '@auth/prisma-adapter';
// import prisma from '@/lib/prisma'; // Custom Prisma client

// export const authOptions: AuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//     }),
//     GitHubProvider({
//       clientId: process.env.GITHUB_CLIENT_ID || "",
//       clientSecret: process.env.GITHUB_CLIENT_SECRET ||"",
//     }),
//   ],
//   adapter: PrismaAdapter(prisma),
//   session: {
//     strategy: 'database', // Store session data in the database
//   },
//   callbacks: {
//     async session({ session, user }): Promise<Session> {
//       if (session.user) {
//         session.user = user; // Add user ID to the session
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: '/auth/signin', // Custom sign-in page
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
