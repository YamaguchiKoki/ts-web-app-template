import { Effect } from "effect";
import { AppError } from "./custom-error";

export class DatabaseConnectionError extends AppError {
	readonly _tag = "DatabaseError" as const;

	constructor(message = "データベース接続エラーが発生しました") {
		super(message);
		this.name = "DatabaseConnectionError";
	}

	static fail(message?: string) {
		return Effect.fail(new DatabaseConnectionError(message));
	}
}

export class DatabaseQueryError extends AppError {
	readonly _tag = "DatabaseError" as const;

	constructor(
		message = "データベースクエリの実行中にエラーが発生しました",
		originalError?: Error,
	) {
		super(message, originalError);
		this.name = "DatabaseQueryError";
	}

	static fail(message?: string, originalError?: Error) {
		return Effect.fail(new DatabaseQueryError(message, originalError));
	}
}

export class DatabaseTransactionError extends AppError {
	readonly _tag = "DatabaseError" as const;

	constructor(
		message = "データベーストランザクションの実行中にエラーが発生しました",
		originalError?: Error,
	) {
		super(message, originalError);
		this.name = "DatabaseTransactionError";
	}

	static fail(message?: string, originalError?: Error) {
		return Effect.fail(new DatabaseTransactionError(message, originalError));
	}
}

export type DatabaseError =
	| DatabaseConnectionError
	| DatabaseQueryError
	| DatabaseTransactionError;
