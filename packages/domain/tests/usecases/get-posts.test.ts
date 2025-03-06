import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { GetPostsInputSchema } from "../../src/entities/post";
import { DatabaseQueryError } from "../../src/errors";
import type { IPostRepository } from "../../src/repositories/post";
import { makeGetPosts } from "../../src/usecases/post/get-posts";
import { mockPost } from "../__fixtures__/post";

describe("getPosts Usecase", () => {
	const mockPosts = [mockPost, { ...mockPost, id: "2" }];

	const mockRepository: IPostRepository = {
		create: () => Effect.succeed(mockPost),
		findMany: (input: { limit: number; offset: number }) =>
			Effect.succeed(mockPosts),
	};

	const errorRepository: IPostRepository = {
		create: () => Effect.succeed(mockPost),
		findMany: (input: { limit: number; offset: number }) =>
			Effect.fail(new DatabaseQueryError("Database error")),
	};

	describe("正常系", () => {
		it("投稿一覧を取得できる", async () => {
			const getPosts = makeGetPosts(mockRepository);
			const input = {
				limit: 10,
				offset: 0,
			};

			const result = await Effect.runPromise(getPosts(input));
			expect(result).toEqual(mockPosts);
		});

		it("デフォルト値で取得できる", async () => {
			const getPosts = makeGetPosts(mockRepository);
			const input = GetPostsInputSchema.parse({});

			const result = await Effect.runPromise(getPosts(input));
			expect(result).toEqual(mockPosts);
		});
	});

	describe("異常系", () => {
		it("バリデーションエラーの場合はValidationErrorを返す", async () => {
			const getPosts = makeGetPosts(mockRepository as IPostRepository);
			const input = {
				limit: 0,
				offset: 0,
			};

			const result = await Effect.runPromise(Effect.either(getPosts(input)));
			expect(result._tag).toBe("Left");
			if (result._tag === "Left") {
				expect(result.left._tag).toBe("ValidationError");
			}
		});

		it("リポジトリのエラーの場合はDatabaseErrorを返す", async () => {
			const getPosts = makeGetPosts(errorRepository as IPostRepository);
			const input = {
				limit: 10,
				offset: 0,
			};

			const result = await Effect.runPromise(Effect.either(getPosts(input)));
			expect(result._tag).toBe("Left");
			if (result._tag === "Left") {
				expect(result.left._tag).toBe("DatabaseError");
			}
		});
	});
});
