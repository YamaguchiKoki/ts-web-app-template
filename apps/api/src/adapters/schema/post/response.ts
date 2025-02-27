import { PostSchema } from "@template/domain";
import { z } from "zod";

export const createPostResponseSchema = z.object({
	statusCode: z.number(),
	message: z.string(),
	data: PostSchema,
});

export type CreatePostResponse = z.infer<typeof createPostResponseSchema>;
