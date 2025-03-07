import { checkAndSaveUser } from "@/lib/checkAndSaveUser";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const saveUser = await checkAndSaveUser(user);

        if (!saveUser) {
          throw new Error("Failed to save user");
        }
        return true;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
