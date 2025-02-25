import { timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const users = pgTable(
	"users",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		clerkId: text("clerk_id").notNull().unique(),
		name: text("name").notNull(),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},
	(t) => [uniqueIndex("clerk_id_unique").on(t.clerkId)],
);

// drizzle-zodのスキーマもここ
