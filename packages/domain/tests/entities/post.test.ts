import { describe, expect, it } from "vitest";
import { CreatePostInputSchema } from "../../src/entities/post";
import { validCreatePostInput } from "../__fixtures__/post";

describe("Post Entity", () => {
	describe("CreatePostInputSchema", () => {
		it("正規データを正しくパースすることができる", () => {
			const result = CreatePostInputSchema.safeParse(validCreatePostInput);
			expect(result.success).toBe(true);
		});

		it("空のタイトルに対してエラーを返す", () => {
			const result = CreatePostInputSchema.safeParse({
				...validCreatePostInput,
				title: "",
			});
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].path).toContain("title");
			}
		});
	});
});
