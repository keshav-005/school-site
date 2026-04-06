import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import { Admin } from "@/lib/models";
import bcrypt from "bcryptjs";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const email = (credentials.email as string).toLowerCase().trim();
        const password = credentials.password as string;

        // ── Dev mode: works without MongoDB ──────────────
        if (!process.env.MONGODB_URI) {
          const devEmail = process.env.ADMIN_EMAIL || "admin@triplemschool.in";
          const devPassword = process.env.ADMIN_PASSWORD || "admin123";

          if (email === devEmail.toLowerCase() && password === devPassword) {
            return {
              id: "dev-admin-001",
              email: devEmail,
              name: "Administrator",
              role: "superadmin",
            };
          }
          throw new Error("Invalid credentials");
        }

        // ── Production mode: full MongoDB + bcrypt ───────
        await connectDB();

        const admin = await Admin.findOne({ email }).select("+hashedPassword");

        if (!admin) {
          throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, admin.hashedPassword);

        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: admin._id.toString(),
          email: admin.email,
          name: admin.name,
          role: admin.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
});
