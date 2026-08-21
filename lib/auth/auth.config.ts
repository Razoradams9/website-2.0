import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/lib/validations/auth";
import { prisma } from "@/lib/db/prisma";

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validated = loginSchema.safeParse(credentials);
        if (!validated.success) return null;

        const { email, password } = validated.data;

        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
            role: true,
            status: true,
            image: true,
          },
        });

        if (!user || !user.password) return null;
        if (user.status === "SUSPENDED" || user.status === "INACTIVE") {
          throw new Error("Account is suspended or inactive.");
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) return null;

        // Update last login
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      // Allow client-side session update
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as any;
      }
      return session;
    },
    async signIn({ user, account }) {
      // Allow OAuth without email verification check
      if (account?.provider !== "credentials") return true;
      const dbUser = await prisma.user.findUnique({
        where: { email: user.email! },
        select: { status: true },
      });
      if (!dbUser) return false;
      if (
        dbUser.status === "SUSPENDED" ||
        dbUser.status === "INACTIVE" ||
        dbUser.status === "PENDING_VERIFICATION"
      ) {
        return false;
      }
      return true;
    },
  },
};
