import { Effect, pipe } from "effect";
import {
	type CreatePostInput,
	CreatePostInputSchema,
	type Post,
} from "../../entities/post.js";
import type { ValidationError } from "../../errors/custom-error.js";
import type { DatabaseError } from "../../errors/database.js";
import type { PostError } from "../../errors/post.js";
import type { IPostRepository } from "../../repositories/post.js";
import { validateAndParse } from "../../util/zod-parser.js";

export const makeCreatePost =
	(repository: IPostRepository) =>
	(
		input: CreatePostInput,
	): Effect.Effect<Post, PostError | DatabaseError | ValidationError> =>
		pipe(
			Effect.succeed(input),
			Effect.flatMap(validateAndParse<CreatePostInput>(CreatePostInputSchema)),
			Effect.flatMap(repository.create),
		);
