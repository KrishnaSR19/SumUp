import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import { config } from 'dotenv';

// Load environment variables
config();

if (!process.env.NEXT_PUBLIC_DATABASE_URL) {
  throw new Error("🚨 DATABASE_URL is missing! Make sure it's set in the .env file.");
}

// console.log("✅ Loaded DATABASE_URL:", process.env.NEXT_PUBLIC_DATABASE_URL);



const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
export const db = drizzle(sql, { schema });
