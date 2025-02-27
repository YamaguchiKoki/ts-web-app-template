import assert from "node:assert";
import { zValidator } from "@hono/zod-validator";
import { makeCreatePost, validateAndParse } from "@template/domain";
import { Effect, Either, pipe } from "effect";
import { createFactory } from "hono/factory";
import type { AppType } from "../../../type";
import { createPostRequestSchema as requestSchema } from "../../schema/post/request";
import {
	type CreatePostResponse,
	createPostResponseSchema,
} from "../../schema/post/response";

const factory = createFactory<AppType>();

//TODO handle Result抽象化

export const createPostHandler = factory.createHandlers(
	zValidator("json", requestSchema, (result, c) => {
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
		// 入力データの抽出とEffectを返すユースケース関数の依存性を解決する
		const input = c.req.valid("json");
		const container = c.env.container;
		const usecase = makeCreatePost(container.get("postRepository"));

		assert(input);

		const program = Effect.gen(function* () {
			const failureOrSuccess = yield* Effect.either(usecase(input));
			if (Either.isRight(failureOrSuccess)) {
				return yield* pipe(
					Effect.succeed(failureOrSuccess.right),
					Effect.andThen(
						validateAndParse<CreatePostResponse>(createPostResponseSchema),
					),
					Effect.andThen((input) => {
						return Effect.succeed(c.json(input));
					}),
				);
			}
			if (Either.isLeft(failureOrSuccess)) {
				return yield* pipe(
					Effect.fail(failureOrSuccess.left),
					Effect.catchTags({
						DatabaseError: () =>
							Effect.succeed(
								c.json({
									statusCode: 500,
									message: "Internal Server Error",
								}),
							),
					}),
					Effect.catchAll((err) => {
						console.error(err);
						return Effect.succeed(
							c.json({
								statusCode: 500,
								message: "Internal Server Error",
							}),
						);
					}),
				);
			}
		});
		return Effect.runPromise(program);
	},
);
