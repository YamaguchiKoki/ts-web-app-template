import { z } from "zod";

export const userSchema = z.object({
	// スキーマの定義
});

export type User = z.infer<typeof userSchema>;
