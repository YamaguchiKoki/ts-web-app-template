import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { z } from "zod";
import { validateAndParse } from "../../src/util/zod-parser";

describe("parseToEntity", () => {
	// テスト用のZodスキーマ（例として数値を期待するスキーマ）
	const schema = z.number().describe("Number schema");

	it("ZodSchemaに適合するデータを渡した場合、正しくパースされる", async () => {
		const validInput = 42;
		const effect = validateAndParse(schema)(validInput);
		const result = await Effect.runPromise(effect);
		expect(result).toBe(validInput);
	});

	//TODO: テストを追加する
});
