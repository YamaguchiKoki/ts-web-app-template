import { describe, expect, it } from "vitest";
import {
	CreatePostInputSchema,
	GetPostsInputSchema,
} from "../../src/entities/post";
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

	describe("GetPostsInputSchema", () => {
		it("正規データを正しくパースすることができる", () => {
			const validInput = {
				limit: 10,
				offset: 0,
			};
			const result = GetPostsInputSchema.safeParse(validInput);
			expect(result.success).toBe(true);
		});

		it("デフォルト値が正しく設定される", () => {
			const result = GetPostsInputSchema.parse({});
			expect(result).toEqual({
				limit: 10,
				offset: 0,
			});
		});

		it("limitが1未満の場合エラーを返す", () => {
			const result = GetPostsInputSchema.safeParse({
				limit: 0,
				offset: 0,
			});
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].path).toContain("limit");
			}
		});

		it("limitが100より大きい場合エラーを返す", () => {
			const result = GetPostsInputSchema.safeParse({
				limit: 101,
				offset: 0,
			});
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].path).toContain("limit");
			}
		});

		it("offsetが負の数の場合エラーを返す", () => {
			const result = GetPostsInputSchema.safeParse({
				limit: 10,
				offset: -1,
			});
			expect(result.success).toBe(false);
			if (!result.success) {
				expect(result.error.issues[0].path).toContain("offset");
			}
		});
	});
});
