import { zValidator } from "@hono/zod-validator";
import {
	type DatabaseError,
	type PostNotFoundError,
	type ValidationError,
	makeCreatePost,
} from "@template/domain";
import { Effect, Either } from "effect";
import { createFactory } from "hono/factory";
import type { AppType } from "../../../app.js";
import { createPostRequestSchema as requestSchema } from "../../schema/post/request.js";
import { createPostResponseSchema } from "../../schema/post/response.js";
import { makeResponseParser } from "../response-parser.js";

const factory = createFactory<AppType>();
type UseCaseError = DatabaseError | ValidationError | PostNotFoundError;

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
		const input = c.req.valid("json");
		const container = c.env.container;

		// 依存関係の注入
		const usecase = container.get("createPostUsecase");
		const parser = makeResponseParser(c);

		// ユースケースを実行し、結果に応じたレスポンスを生成するEffectを生成
		const executor = Effect.gen(function* () {
			const failureOrSuccess = yield* Effect.either(usecase(input));
			return Either.match(failureOrSuccess, {
				onLeft: (error) => parser.error<UseCaseError>(error),
				onRight: (result) =>
					parser.success(createPostResponseSchema, result, 201),
			});
		});

		// Effectを実行し、Promiseに変換した上で返却
		return Effect.runPromise(executor);
	},
);
