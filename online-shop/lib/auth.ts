import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { headers } from "next/headers";
import { session } from "@/db/auth-schema";


export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
    }),
    emailAndPassword: {
        enabled : true,
    },
});

export const getCurrentUser = async () => {
    "use server";
            const session = await auth.api.getSession({
        headers: await headers(),
  });
  return session?.user ?? null;
};