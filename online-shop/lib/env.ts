import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.url(),
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.url(),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  throw new Error(
    result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("\n"),
  );
}

export const env = result.data;
