import type { CreatePostInput, Post } from "../../src/entities/post";

export const validCreatePostInput: CreatePostInput = {
	title: "test",
	content: "test",
};

export const mockPost: Post = {
	id: "mock-post-id",
	title: "test",
	content: "test",
	createdAt: new Date(),
	updatedAt: new Date(),
};

export const invalidCreatePostInputs = {
	emptyTitle: {
		...validCreatePostInput,
		title: "",
	},
};
