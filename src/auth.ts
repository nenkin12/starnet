import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;
        if (credentials.username !== "admin") return null;

        const rawHash = process.env.ADMIN_PASSWORD_HASH;
        if (!rawHash) {
          console.error("ADMIN_PASSWORD_HASH env var is not set");
          return null;
        }
        // Decode from base64 if the hash doesn't start with $2 (Netlify mangles $ signs)
        const hash = rawHash.startsWith("$2")
          ? rawHash
          : Buffer.from(rawHash, "base64").toString("utf-8");
        const valid = await bcrypt.compare(
          credentials.password as string,
          hash
        );
        if (!valid) return null;

        return {
          id: "admin",
          name: "Admin",
          email: process.env.ADMIN_EMAIL ?? "admin@starnetpros.com",
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
});
