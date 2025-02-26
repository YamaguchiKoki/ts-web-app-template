// import * as Effect from "@effect/io/Effect";
// import { db } from "@my-app/database";
// import { users } from "@my-app/database/schema";
// import type { CreateUserInput, User } from "@my-app/domain/src/entities/user";
// import type { UserError } from "@my-app/domain/src/errors/user";
// import { UserAlreadyExistsError } from "@my-app/domain/src/errors/user";
// import type { UserRepository } from "@my-app/domain/src/repositories/user";
// import { eq } from "drizzle-orm";

// export const createUserRepository = (): UserRepository => ({
// 	create: (input: CreateUserInput): Effect.Effect<never, UserError, User> =>
// 		Effect.try({
// 			try: async () => {
// 				const now = new Date();
// 				const [user] = await db
// 					.insert(users)
// 					.values({
// 						email: input.email,
// 						name: input.name,
// 						createdAt: now,
// 						updatedAt: now,
// 					})
// 					.returning();
// 				return user;
// 			},
// 			catch: () => new UserAlreadyExistsError(input.email),
// 		}),

// 	findByEmail: (email: string): Effect.Effect<never, UserError, User | null> =>
// 		Effect.try({
// 			try: async () => {
// 				const [user] = await db
// 					.select()
// 					.from(users)
// 					.where(eq(users.email, email))
// 					.limit(1);
// 				return user || null;
// 			},
// 			catch: () => null,
// 		}),
// });
