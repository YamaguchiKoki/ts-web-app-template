import type { Effect } from "effect";
import type { CreatePostInput, Post } from "../entities/post.js";
import type { DatabaseError } from "../errors/database.js";
import type { PostError } from "../errors/post.js";

export interface IPostRepository {
	readonly create: (
		input: CreatePostInput,
	) => Effect.Effect<Post, PostError | DatabaseError>;
}
