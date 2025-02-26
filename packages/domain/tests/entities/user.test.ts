import { describe, expect, it } from "vitest";
import { CreateUserInputSchema } from "../../src/entities/user";
import {
	invalidCreateUserInputs,
	validCreateUserInput,
} from "../__fixtures__/users";

describe("User Entity", () => {
	describe("CreateUserInputSchema", () => {
		it("正規データを正しくパースすることができる", () => {
			const result = CreateUserInputSchema.safeParse(validCreateUserInput);
			expect(result.success).toBe(true);
		});

		it("不正なメールアドレスに対してエラーを返す", () => {
			const result = CreateUserInputSchema.safeParse(
				invalidCreateUserInputs.invalidEmail,
			);
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].path).toContain("email");
			}
		});

		it("空の名前に対してエラーを返す", () => {
			const result = CreateUserInputSchema.safeParse(
				invalidCreateUserInputs.emptyName,
			);
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].path).toContain("name");
			}
		});
	});
});
