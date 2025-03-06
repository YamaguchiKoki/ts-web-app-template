import { Effect } from "effect";
import type { TypeOf, ZodSchema } from "zod";
import { ValidationError } from "../errors/custom-error.js";

export const validateAndParse =
	<T extends ZodSchema>(schema: T) =>
	(value: unknown): Effect.Effect<TypeOf<T>, ValidationError> => {
		const parsed = schema.safeParse(value);
		if (!parsed.success) {
			console.log({
				issues: parsed.error.issues,
				description: schema.description,
				value: value,
			});
			return Effect.fail(new ValidationError("validation error"));
		}
		return Effect.succeed(parsed.data);
	};
