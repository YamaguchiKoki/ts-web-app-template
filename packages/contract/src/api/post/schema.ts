import { PostSchema } from "@template/domain";
import { z } from "zod";

export const createPostRequestSchema = z.object({
	title: z.string().min(1),
	content: z.string().min(1),
});

export type CreatePostRequest = z.infer<typeof createPostRequestSchema>;

export const createPostResponseSchema = PostSchema;

export type CreatePostResponse = z.infer<typeof createPostResponseSchema>;
