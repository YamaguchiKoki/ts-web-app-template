import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import type { CreatePostInput } from "../../src/entities";
import { makeCreatePost } from "../../src/usecases/post/create-post";
import { mockPost, validCreatePostInput } from "../__fixtures__/post";

describe("makeCreatePost", () => {
	const mockPosts = [mockPost, { ...mockPost, id: "2" }];
	it("正常系：新規投稿を作成できる", async () => {
		const mockRepository = {
			create: (input: CreatePostInput) => Effect.succeed(mockPost),
			findMany: (input: { limit: number; offset: number }) =>
				Effect.succeed(mockPosts),
		};

		const createPost = makeCreatePost(mockRepository);
		const result = await Effect.runPromise(createPost(validCreatePostInput));

		expect(result).toEqual(
			expect.objectContaining({
				title: validCreatePostInput.title,
				content: validCreatePostInput.content,
			}),
		);
	});
});
