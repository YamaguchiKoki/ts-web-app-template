import { AppError } from "./custom-error";

export class PostNotFoundError extends AppError {
	readonly _tag = "NotFoundError" as const;
	constructor(id: string) {
		super(`Post with id ${id} not found`);
	}
}

export type PostError = PostNotFoundError;
