import { type AppError, validateAndParse } from "@template/domain";
import { Effect, pipe } from "effect";
import type { Context } from "hono";
import type { z } from "zod";
import type { AppType } from "../../app.js";

export const makeResponseParser = (c: Context<AppType>) => {
	return {
		error<E extends AppError>(error: E) {
			const executor = pipe(
				Effect.fail<E>(error),
				Effect.catchTags({
					NotFoundError: () =>
						Effect.succeed(
							c.json({
								statusCode: 404,
								message: "Resource Not Found",
							}),
						),
					ValidationError: () =>
						Effect.succeed(
							c.json({
								statusCode: 400,
								message: "Validation Error",
							}),
						),
					AlreadyExistsError: () =>
						Effect.succeed(
							c.json({
								statusCode: 409,
								message: "Resource Already Exists",
							}),
						),
					DatabaseError: () =>
						Effect.succeed(
							c.json({
								statusCode: 500,
								message: "Internal Server Error",
							}),
						),
				}),
			);
			return Effect.runSync(executor);
		},
		success<T extends z.ZodType>(schema: T, value: unknown, statusCode = 200) {
			const executor = pipe(
				Effect.succeed(value),
				Effect.andThen((data) => validateAndParse(schema)(data)),
				Effect.map((validatedResult: z.infer<T>) =>
					c.json({
						statusCode: statusCode,
						data: validatedResult,
					}),
				),
				Effect.catchTag("ValidationError", (error) =>
					Effect.succeed(
						c.json({
							statusCode: 400,
							message: "Validation Error",
						}),
					),
				),
			);
			return Effect.runSync(executor);
		},
	};
};
