import { z } from "zod";

export const createPostRequestSchema = z.object({
	title: z.string().min(1),
	content: z.string().min(1),
});

export type CreatePostRequest = z.infer<typeof createPostRequestSchema>;
