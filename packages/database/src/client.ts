import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import ws from "ws";
import * as schema from "./schema";

let connectionString = process.env.DATABASE_URL;

// Configuring Neon for local development
if (process.env.NODE_ENV === "local") {
	connectionString = "postgres://postgres:postgres@localhost:5432/main";
	neonConfig.fetchEndpoint = () => "http://localhost:4444/sql";
	neonConfig.wsProxy = () => "ws://localhost:4444/v2";
	neonConfig.useSecureWebSocket = false;
}
neonConfig.webSocketConstructor = ws;

if (!connectionString) {
	throw new Error("DATABASE_URL is not set");
}

const sql = neon(connectionString);

export const db = drizzle(sql, {
	schema,
});
