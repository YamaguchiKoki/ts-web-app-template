import { type AppError, validateAndParse } from "@template/domain";
import { Effect, pipe } from "effect";
import type { Context } from "hono";
import type { z } from "zod";
import type { AppType } from "../../app.js";

/**
 * APIレスポンスのパースと整形を行うパーサーを生成する
 * @param c - Honoのコンテキスト
 * @returns レスポンスパーサーオブジェクト
 *
 * @example
 * ```ts
 * const parser = makeResponseParser(c);
 *
 * // エラーハンドリング
 * parser.error<UseCaseError>(error);
 *
 * // 成功レスポンスのパース
 * parser.success(responseSchema, result, 201);
 * ```
 */
export const makeResponseParser = (c: Context<AppType>) => {
	return {
		/**
		 * エラーレスポンスを生成する
		 * @template E - AppErrorを継承したエラー型
		 * @param error - エラーオブジェクト
		 * @returns エラー種別に応じたHTTPレスポンス
		 * - NotFoundError: 404 Not Found
		 * - ValidationError: 400 Bad Request
		 * - AlreadyExistsError: 409 Conflict
		 * - DatabaseError: 500 Internal Server Error
		 */
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
		/**
		 * 成功レスポンスを生成する
		 * @template T - Zodスキーマの型
		 * @param schema - レスポンスのバリデーションスキーマ
		 * @param value - バリデーション対象の値
		 * @param statusCode - HTTPステータスコード（デフォルト: 200）
		 * @returns バリデーション済みのHTTPレスポンス
		 */
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
