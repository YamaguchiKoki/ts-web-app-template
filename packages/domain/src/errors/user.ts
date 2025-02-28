import { AppError } from "./custom-error.js";

export class UserAlreadyExistsError extends AppError {
	readonly _tag = "AlreadyExistsError" as const;
	constructor(email: string) {
		super(`User with email ${email} already exists`);
	}
}

export class UserNotFoundError extends AppError {
	readonly _tag = "NotFoundError" as const;
	constructor(email: string) {
		super(`User with email ${email} not found`);
	}
}

// Union型として定義
export type UserError = UserAlreadyExistsError | UserNotFoundError;

