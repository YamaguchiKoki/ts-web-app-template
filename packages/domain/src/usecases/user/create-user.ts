import { Effect, pipe } from "effect";
import type { ZodError } from "zod";
import type { CreateUserInput, User } from "../../entities/user.js";
import { CreateUserInputSchema } from "../../entities/user.js";
import type { DatabaseError } from "../../errors/database.js";
import { UserAlreadyExistsError } from "../../errors/user.js";
import type { UserError } from "../../errors/user.js";
import type { IUserRepository } from "../../repositories/user.js";

export const makeCreateUser =
	(repository: IUserRepository) =>
	(
		input: CreateUserInput,
	): Effect.Effect<User, UserError | ZodError | DatabaseError> =>
		pipe(
			// 入力値のバリデーション
			Effect.try({
				try: () => CreateUserInputSchema.parse(input),
				catch: (e) => {
					Effect.logError(e);
					return e as ZodError;
				},
			}),
			// メールアドレスの重複チェック
			Effect.flatMap((validatedInput: CreateUserInput) =>
				pipe(
					repository.findByEmail(validatedInput.email),
					Effect.flatMap((existingUser) =>
						existingUser
							? Effect.fail(new UserAlreadyExistsError(validatedInput.email))
							: Effect.succeed(validatedInput),
					),
				),
			),
			// ユーザーの作成
			Effect.flatMap((validatedInput: CreateUserInput) =>
				repository.create(validatedInput),
			),
		);
