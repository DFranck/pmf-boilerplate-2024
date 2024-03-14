import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import { signinSchema } from "./schema";
const authOption = {
  adatpers: [PrismaAdapter(prisma)],
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
            username: user.username,
            email: user.email,
          };
          return logUser;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user }: any) {
      session.user.username = user.username;
      return session;
    },
  },
};

export default authOption;
