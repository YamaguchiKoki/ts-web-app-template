import { pipe } from "@effect/data/Function";
import * as Effect from "@effect/io/Effect";
import type { ZodError } from "zod";
import type { CreateUserInput, User } from "../../entities/user";
import { CreateUserInputSchema } from "../../entities/user";
import { UserAlreadyExistsError } from "../../errors/user";
import type { UserError } from "../../errors/user";
import type { UserRepository } from "../../repositories/user";

export const makeCreateUser =
	(repository: UserRepository) =>
	(input: CreateUserInput): Effect.Effect<never, UserError | ZodError, User> =>
		pipe(
			// 入力値のバリデーション
			Effect.try({
				try: () => CreateUserInputSchema.parse(input),
				catch: (e) => e as ZodError,
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
