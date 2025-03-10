import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema.js";

import { Pool, neon, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

let connectionString = process.env.DATABASE_URL;

if (process.env.NODE_ENV === "development") {
	// Configuring Neon for local development
	connectionString = "postgres://postgres:postgres@db.localtest.me:5432/main";
	neonConfig.fetchEndpoint = (host) => {
		const [protocol, port] =
			host === "db.localtest.me" ? ["http", 4444] : ["https", 443];
		return `${protocol}://${host}:${port}/sql`;
	};
	const connectionStringUrl = new URL(connectionString);
	neonConfig.useSecureWebSocket =
		connectionStringUrl.hostname !== "db.localtest.me";
	neonConfig.wsProxy = (host) =>
		host === "db.localtest.me" ? `${host}:4444/v2` : `${host}/v2`;
}
neonConfig.webSocketConstructor = ws;

if (!connectionString) {
	throw new Error("DATABASE_URL is not set");
}

// Neon supports both HTTP and WebSocket clients. Choose the one that fits your needs:

// HTTP Client (sql)
// - Best for serverless functions and Lambda environments
// - Ideal for stateless operations and quick queries
// - Lower overhead for single queries
// - Better for applications with sporadic database access
export const sql = neon(connectionString);

// WebSocket Client (pool)
// - Best for long-running applications (like servers)
// - Maintains a persistent connection
// - More efficient for multiple sequential queries
// - Better for high-frequency database operations
export const pool = new Pool({ connectionString });

export const db = drizzle(sql, {
	schema,
});
