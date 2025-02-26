import { Effect, Either, pipe } from "effect";
import { describe, expect, it } from "vitest";
import type { User } from "../../src/entities/user";
import { UserAlreadyExistsError } from "../../src/errors/user";
import type { UserRepository } from "../../src/repositories/user";
import { makeCreateUser } from "../../src/usecases/user/createUser";
import { validCreateUserInput } from "../__fixtures__/users";

describe("makeCreateUser", () => {
	const mockUser: User = {
		...validCreateUserInput,
		id: "test-id",
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	describe("正常系", () => {
		const mockRepository: UserRepository = {
			create: (input) => Effect.succeed({ ...mockUser, ...input }),
			findByEmail: () => Effect.succeed(null),
		};

		it("新規ユーザーを作成できる", async () => {
			const createUser = makeCreateUser(mockRepository);
			const result = await Effect.runPromise(createUser(validCreateUserInput));

			expect(result).toEqual(
				expect.objectContaining({
					email: validCreateUserInput.email,
					name: validCreateUserInput.name,
				}),
			);
		});
	});

	describe("準異常系：すでに登録済みユーザーが存在する", () => {
		const mockRepository: UserRepository = {
			create: () => Effect.succeed(mockUser),
			findByEmail: () => Effect.succeed(mockUser),
		};

		it("UserAlreadyExistsErrorを返す", async () => {
			const createUser = makeCreateUser(mockRepository);
			const result = await pipe(
				createUser(validCreateUserInput),
				Effect.either,
				Effect.runPromise,
			);

			expect(Either.isLeft(result)).toBe(true);
			if (Either.isLeft(result)) {
				const error = result.left;
				expect(error).toBeInstanceOf(UserAlreadyExistsError);
				expect(error.message).toBe(
					`User with email ${validCreateUserInput.email} already exists`,
				);
			}
		});
	});

	describe("準異常系：不正な入力データ", () => {
		const mockRepository: UserRepository = {
			create: () => Effect.succeed(mockUser),
			findByEmail: () => Effect.succeed(null),
		};

		it("ZodErrorを返す", async () => {
			const createUser = makeCreateUser(mockRepository);
			const result = await pipe(
				createUser({ ...validCreateUserInput, email: "invalid-email" }),
				Effect.either,
				Effect.runPromise,
			);

			expect(Either.isLeft(result)).toBe(true);
			if (Either.isLeft(result)) {
				const error = result.left;
				expect(error.name).toBe("ZodError");
			}
		});
	});
});
