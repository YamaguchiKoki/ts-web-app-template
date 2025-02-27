import { Effect } from "effect";
import type { ZodSchema } from "zod";
import { ValidationError } from "../errors";

export const validateAndParse =
	<T>(schema: ZodSchema<T>) =>
	(value: unknown): Effect.Effect<T, ValidationError> => {
		const parsed = schema.safeParse(value);
		if (!parsed.success) {
			Effect.logError({
				issues: parsed.error.issues,
				description: schema.description,
				value: value,
			});
			return Effect.fail(new ValidationError("validation error"));
		}
		return Effect.succeed(parsed.data);
	};
