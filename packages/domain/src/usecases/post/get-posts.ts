import { Effect } from "effect";
import { pipe } from "effect/Function";
import {
	type GetPostsInput,
	GetPostsInputSchema,
	type Post,
} from "../../entities/post";
import type { DatabaseError, ValidationError } from "../../errors";
import type { IPostRepository } from "../../repositories/post";
import { validateAndParse } from "../../util";

export const makeGetPosts =
	(repository: IPostRepository) =>
	(
		input: GetPostsInput,
	): Effect.Effect<Post[], DatabaseError | ValidationError> =>
		pipe(
			Effect.succeed(input),
			Effect.flatMap(validateAndParse(GetPostsInputSchema)),
			Effect.flatMap(repository.findMany),
		);
