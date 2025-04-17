require('dotenv').config({ path: '.env' });

import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config();

if (!process.env.NEXT_PUBLIC_DATABASE_URL) {
  throw new Error('DATABASE_URL is missing from .env');
}

console.log("✅ Loaded DATABASE_URL:", process.env.NEXT_PUBLIC_DATABASE_URL);

export default defineConfig({
  schema: './utils/schema.jsx', // Update path if using .jsx
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url:"postgresql://Expense-Tracker_owner:npg_tHd5mQiBjVa9@ep-muddy-rain-a1rcql7r-pooler.ap-southeast-1.aws.neon.tech/Expense-Tracker?sslmode=require",
  },
});