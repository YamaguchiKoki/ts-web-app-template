export type ErrorTag =
	| "NotFoundError"
	| "AlreadyExistsError"
	| "DatabaseError"
	| "ValidationError";

export abstract class AppError extends Error {
	abstract readonly _tag: ErrorTag;

	constructor(
		message: string,
		public readonly originalError?: Error,
	) {
		super(message);
		this.name = this.constructor.name;
	}
}

export class ValidationError extends AppError {
	readonly _tag = "ValidationError" as const;
	constructor(
		message: string,
		public readonly originalError?: Error,
	) {
		super(message, originalError);
	}
}
