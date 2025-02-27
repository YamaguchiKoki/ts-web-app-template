import type { Effect } from "effect";
import type { CreateUserInput, User } from "../entities/user";
import type { DatabaseError } from "../errors";
import type { UserError } from "../errors/user";

export interface IUserRepository {
	readonly create: (
		input: CreateUserInput,
	) => Effect.Effect<User, UserError | DatabaseError>;
	readonly findByEmail: (
		email: string,
	) => Effect.Effect<User | null, UserError | DatabaseError>;
}
