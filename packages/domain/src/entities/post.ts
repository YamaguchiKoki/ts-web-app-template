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
