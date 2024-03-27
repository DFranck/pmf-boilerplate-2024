import prisma from "@/lib/prisma";
import { signinSchema } from "@/lib/schema";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
import Credentials from "@auth/core/providers/credentials";
interface loggedUser {
  id: string;
  email: string;
  username: string;
}

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: { signIn: "/auth/signin" },
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    Credentials({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "jsmith@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          console.log("Credentials not found");
          return null;
        }
        const email = credentials.email as string;
        const password = credentials.password as string;

        const zodVerif = signinSchema.safeParse({ email, password });
        if (!zodVerif.success) {
          console.log("Error: ", zodVerif.error);
          return null;
        }
        const user = await prisma.user.findUnique({
          where: { email: email },
        });
        if (!user) {
          console.log("User not found");
          return null;
        }
        console.log(user);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          console.log("Invalid password");
          return null;
        }
        const loggedUser = {
          id: user.id.toString(),
          username: user.username,
          email: user.email,
        };
        console.log(loggedUser);
        return loggedUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const authUser = user as loggedUser;
        token.id = authUser.id;
        token.username = authUser.username;
        token.email = authUser.email;
      }
      console.log(token);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
      }
      console.log(session);
      return session;
    },
  },
});
