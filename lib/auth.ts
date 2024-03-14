import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import { signinSchema } from "./schema";
const authOption = {
  adatper: PrismaAdapter(prisma),
  pages: {
    signIn: "/signin",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "jsmith@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const zodVerif = signinSchema.safeParse(credentials);
        if (!zodVerif.success || !credentials) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!user) {
          return null;
        }
        const isMatch = await bcrypt.compare(
          credentials?.password,
          user.password
        );
        if (!isMatch) {
          return null;
        } else {
          const logUser = {
            id: user.id.toString(),
            isVerified: user.isVerified,
            username: user.username,
            email: user.email,
          };
          return logUser;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.isVerified = user.isVerified;
        token.username = user.username;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.id;
      session.user.isVerified = token.isVerified;
      session.user.email = token.email;
      session.user.username = token.username;
      return session;
    },
  },
};

export default authOption;
