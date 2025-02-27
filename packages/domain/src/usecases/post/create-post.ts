import { Effect, pipe } from "effect";
import {
	type CreatePostInput,
	CreatePostInputSchema,
	type Post,
} from "../../entities";
import type { DatabaseError, PostError, ValidationError } from "../../errors";
import type { IPostRepository } from "../../repositories/post";
import { validateAndParse } from "../../util/zod-parser";

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
