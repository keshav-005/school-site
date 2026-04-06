/**
 * Seed script: Creates the initial admin user in MongoDB.
 *
 * Usage:
 *   1. Ensure MONGODB_URI is set in .env.local
 *   2. Run: npx tsx scripts/seed-admin.ts
 *
 * This will create an admin user with the credentials from
 * ADMIN_EMAIL and ADMIN_PASSWORD env vars.
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import path from "path";

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@triplemschool.in";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "changeme123";

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log("✅ Connected to MongoDB");

    const AdminSchema = new mongoose.Schema({
      email: { type: String, required: true, unique: true, lowercase: true },
      hashedPassword: { type: String, required: true },
      name: { type: String, required: true },
      role: { type: String, enum: ["admin", "superadmin"], default: "admin" },
    }, { timestamps: true });

    const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

    // Check if admin exists
    const existing = await Admin.findOne({ email: ADMIN_EMAIL.toLowerCase() });
    if (existing) {
      console.log(`⚠️  Admin user already exists: ${ADMIN_EMAIL}`);
      await mongoose.disconnect();
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

    // Create admin
    await Admin.create({
      email: ADMIN_EMAIL.toLowerCase(),
      hashedPassword,
      name: "Administrator",
      role: "superadmin",
    });

    console.log(`✅ Admin user created: ${ADMIN_EMAIL}`);
    console.log("   Password: (from ADMIN_PASSWORD env var)");
    console.log("   ⚠️  Change the password after first login!");

    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
}

seed();
