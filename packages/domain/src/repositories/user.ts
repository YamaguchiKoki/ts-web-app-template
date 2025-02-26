import type { Effect } from "@effect/io/Effect";
import type { CreateUserInput, User } from "../entities/user";
import type { UserError } from "../errors/user";

export interface UserRepository {
	readonly create: (input: CreateUserInput) => Effect<never, UserError, User>;
	readonly findByEmail: (
		email: string,
	) => Effect<never, UserError, User | null>;
}
