import { PostSchema } from "@template/domain";
import type { z } from "zod";

export const createPostResponseSchema = PostSchema;

export type CreatePostResponse = z.infer<typeof createPostResponseSchema>;
