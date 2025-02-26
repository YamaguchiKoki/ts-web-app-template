import { type Effect, pipe } from "effect";
import type { CreateUserInput, User } from "../entities/user";
import type { UserError } from "../errors/user";

export interface UserRepository {
	readonly create: (input: CreateUserInput) => Effect.Effect<User, UserError>;
	readonly findByEmail: (
		email: string,
	) => Effect.Effect<User | null, UserError>;
}
