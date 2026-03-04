import { neonConfig, Pool } from "@neondatabase/serverless";
import { env } from "@streeio-core/env/server";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";

import {
  account,
  accountRelations,
  session,
  sessionRelations,
  user,
  userRelations,
  verification,
} from "./schema/auth";
import { clientCompany } from "./schema/clients";
import { todo } from "./schema/todo";

const schema = {
  account,
  accountRelations,
  clientCompany,
  session,
  sessionRelations,
  todo,
  user,
  userRelations,
  verification,
};

neonConfig.webSocketConstructor = ws;

// Singleton function to prevent multiple connections during development
const globalForDb = globalThis as unknown as {
  conn: Pool | undefined;
};

const conn =
  globalForDb.conn ??
  new Pool({
    connectionString: env.DATABASE_URL,
    max: 1, // Single persistent connection is enough for serverless/neon
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.conn = conn;
}

export const db = drizzle(conn, { schema });
