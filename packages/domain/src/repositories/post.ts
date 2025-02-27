import type { Effect } from "effect";
import type { CreatePostInput, Post } from "../entities/post";
import type { DatabaseError } from "../errors";
import type { PostError } from "../errors/post";

export interface IPostRepository {
	readonly create: (
		input: CreatePostInput,
	) => Effect.Effect<Post, PostError | DatabaseError>;
}
