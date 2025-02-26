import { z } from "zod";

export const UserSchema = z.object({
	id: z.string(),
	email: z.string().email(),
	name: z.string().min(1),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;

export const CreateUserInputSchema = z.object({
	email: z.string().email(),
	name: z.string().min(1),
});

export type CreateUserInput = z.infer<typeof CreateUserInputSchema>;
