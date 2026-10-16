import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { haveIBeenPwned } from "better-auth/plugins";
import { AccountSchemaValidation } from "./validations";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { twoFactor } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
        input: false,
      },
    },
  },
  rateLimit: {
    enabled: true,
    storage: "database",
    customRules: {
      "/sign-up/email": {
        max: 5,
        window: 60 * 60,
      },
      "/sign-in/email": {
        max: 10,
        window: 60 * 60,
      },
    },
  },

  plugins: [
    haveIBeenPwned(),
    twoFactor({
      issuer: "Online-Shop",
    }),
  ],
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") return;

      const result = AccountSchemaValidation.safeParse(ctx.body);

      if (!result.success) {
        const field = result.error.issues[0]?.path[0];

        throw new APIError("BAD_REQUEST", {
          message: "Date invalide.",
          code: field === "name" ? "INVALID_NAME" : "INVALID_EMAIL",
        });
      }
    }),
  },
});

console.log("2FA activ pe server:", "enableTwoFactor" in auth.api);

export const getCurrentUser = async () => {
  "use server";
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user ?? null;
};

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "admin") {
    notFound();
  }

  return user;
}
