import { zValidator } from "@hono/zod-validator";
import {
	type DatabaseError,
	GetPostsInputSchema,
	type PostNotFoundError,
	PostSchema,
	type ValidationError,
} from "@template/domain";
import { Effect, Either } from "effect";
import { createFactory } from "hono/factory";
import { z } from "zod";
import type { AppType } from "../../../app.js";
import { makeResponseParser } from "../../response-parser.js";

const factory = createFactory<AppType>();
type UseCaseError = DatabaseError | ValidationError | PostNotFoundError;

export const getPostsHandler = factory.createHandlers(
	zValidator("query", GetPostsInputSchema, (result, c) => {
		if (!result.success) {
			return c.json(
				{
					message: "Invalid request",
					errors: result.error.flatten().fieldErrors,
				},
				400,
			);
		}
	}),
	async (c) => {
		const input = c.req.valid("query");
		const container = c.env.container;

		const usecase = container.get("getPostsUsecase");
		const parser = makeResponseParser(c);

		const executor = Effect.gen(function* () {
			const failureOrSuccess = yield* Effect.either(usecase(input));
			return Either.match(failureOrSuccess, {
				onLeft: (error) => parser.error<UseCaseError>(error),
				onRight: (result) => parser.success(z.array(PostSchema), result, 200),
			});
		});

		return Effect.runPromise(executor);
	},
);
