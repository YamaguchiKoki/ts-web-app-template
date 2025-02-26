import type { CreateUserInput, User } from "../../src/entities/user";

export const validCreateUserInput: CreateUserInput = {
	email: "test@example.com",
	name: "Test User",
};

export const invalidCreateUserInputs = {
	invalidEmail: {
		email: "invalid-email",
		name: "Test User",
	},
	emptyName: {
		email: "test@example.com",
		name: "",
	},
} as const;

export const existingUser: User = {
	id: "existing-user-id",
	email: "existing@example.com",
	name: "Existing User",
	createdAt: new Date("2024-01-01"),
	updatedAt: new Date("2024-01-01"),
};
