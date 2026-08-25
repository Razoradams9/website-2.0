import type { NextAuthConfig } from "next-auth";
import type { Role } from "@prisma/client";
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
  session: { strategy: "jwt", maxAge: 365 * 24 * 60 * 60 }, // 1 year — stay logged in until explicit logout
  jwt: { maxAge: 365 * 24 * 60 * 60 }, // match session duration
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      // For Google sign-in, assign SUPER_ADMIN role to allowed email
      if (account?.provider === "google" && token.email === "razoradams@gmail.com") {
        token.role = "SUPER_ADMIN";
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
        session.user.role = token.role as Role;
      }
      return session;
    },
    async signIn({ user, account }) {
      // Restrict Google login to allowed email only
      if (account?.provider === "google") {
        const allowedEmail = "razoradams@gmail.com";
        if (user.email?.toLowerCase() !== allowedEmail) {
          return false;
        }
        return true;
      }
      // Credentials login
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
