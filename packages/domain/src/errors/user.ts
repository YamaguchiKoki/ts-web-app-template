export class UserAlreadyExistsError extends Error {
	readonly _tag = "UserAlreadyExistsError" as const;
	constructor(email: string) {
		super(`User with email ${email} already exists`);
	}
}

export class UserNotFoundError extends Error {
	readonly _tag = "UserNotFoundError" as const;
	constructor(email: string) {
		super(`User with email ${email} not found`);
	}
}

// Union型として定義
export type UserError = UserAlreadyExistsError | UserNotFoundError;
