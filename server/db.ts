// Database configuration file
// Currently using in-memory storage via server/storage.ts
// To enable real database support, uncomment the code below and set DATABASE_URL env variable

/*
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });
*/

// Placeholder for database - not used with in-memory storage
export const db = null;
