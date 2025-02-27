// TODO: Nextjs側でwebhookを受け取るようにする場合不要であるため一旦保留
// import { eq } from "@template/database";
// import { db } from "@template/database/client";
// import { users } from "@template/database/schema";
// import {
// 	type CreateUserInput,
// 	type IUserRepository,
// 	type User,
// 	UserAlreadyExistsError,
// 	type UserError,
// 	UserNotFoundError,
// } from "@template/domain";
// import { Effect } from "effect";

// export const makeUserRepository = (): IUserRepository => ({
// 	create: (input: CreateUserInput): Effect.Effect<User, UserError> =>
// 		Effect.tryPromise({
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

// 	findByEmail: (email: string): Effect.Effect<User | null, UserError> =>
// 		Effect.tryPromise({
// 			try: async () => {
// 				const [user] = await db
// 					.select()
// 					.from(users)
// 					.where(eq(users.email, email))
// 					.limit(1);
// 				return user || null;
// 			},
// 			catch: () => new UserNotFoundError(email),
// 		}),
// });
