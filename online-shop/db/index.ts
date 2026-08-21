import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schemas";
import * as authSchema from "./auth-schema"
import { config } from "dotenv";
config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, {schema : {...schema, ...authSchema}});