import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";




export const auth = betterAuth({
    database: drizzleAdapter(db, { 
        provider: "pg",
    }),
    emailAndPassword: { enabled : true},
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
        },
});


export const getCurrentUser = async () => {
    "use server";
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    return session?.user ?? null;
};

export async function requireUser() {
    const user = await getCurrentUser();
    console.log("RequireUser: user = ", user);
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