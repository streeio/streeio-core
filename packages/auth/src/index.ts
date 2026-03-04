import { db } from "@streeio-core/db";
import { account, session, user } from "@streeio-core/db/schema/auth";
import { env } from "@streeio-core/env/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { and, eq, ne } from "drizzle-orm";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { user, account, session },
  }),

  trustedOrigins: [env.CORS_ORIGIN],

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
      },
    },
  },

  databaseHooks: {
    session: {
      create: {
        after: async (newSession) => {
          await db
            .delete(session)
            .where(
              and(
                eq(session.userId, newSession.userId),
                ne(session.id, newSession.id)
              )
            );
        },
      },
    },
  },

  plugins: [nextCookies(), admin()],
});
