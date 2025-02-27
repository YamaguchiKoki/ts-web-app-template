import { sql } from "drizzle-orm";
import { timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const users = pgTable(
	"users",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		clerkId: text("clerk_id").notNull().unique(),
		name: text("name").notNull(),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at")
			.notNull()
			.defaultNow()
			.$onUpdateFn(() => sql`now()`),
	},
	(t) => [uniqueIndex("clerk_id_unique").on(t.clerkId)],
);

export const posts = pgTable("posts", (t) => ({
	id: t.uuid().notNull().primaryKey().defaultRandom(),
	title: t.varchar({ length: 256 }).notNull(),
	content: t.text().notNull(),
	createdAt: t.timestamp().defaultNow().notNull(),
	updatedAt: t
		.timestamp()
		.notNull()
		.defaultNow()
		.$onUpdateFn(() => sql`now()`),
}));
