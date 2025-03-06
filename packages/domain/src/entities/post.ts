import { z } from "zod";

export const PostSchema = z.object({
	id: z.string().uuid(),
	title: z.string().min(1),
	content: z.string().min(1),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type Post = z.infer<typeof PostSchema>;

export const CreatePostInputSchema = z.object({
	title: z.string().min(1),
	content: z.string().min(1),
});

export type CreatePostInput = z.infer<typeof CreatePostInputSchema>;

export const GetPostsInputSchema = z.object({
	limit: z.number().min(1).max(100).default(10),
	offset: z.number().min(0).default(0),
});

export type GetPostsInput = z.infer<typeof GetPostsInputSchema>;
