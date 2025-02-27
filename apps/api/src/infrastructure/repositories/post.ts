import { db } from "@template/database/client";
import { posts } from "@template/database/schema";
import {
	type CreatePostInput,
	type DatabaseError,
	DatabaseQueryError,
	type IPostRepository,
	type Post,
	type PostError,
} from "@template/domain";
import { Effect } from "effect";

export const makePostRepository = (): IPostRepository => ({
	create: (
		input: CreatePostInput,
	): Effect.Effect<Post, PostError | DatabaseError> =>
		Effect.tryPromise({
			try: async () => {
				const [post] = await db
					.insert(posts)
					.values({
						title: input.title,
						content: input.content,
					})
					.returning();

				// TODO: 本来不要なはずだが型推論がうまくいっていないので暫定対応
				// dockerを使う前は正しく推論されていたのでその辺りを調べる
				if (!post) {
					throw new Error("投稿の作成に失敗しました");
				}

				return post;
			},
			catch: (e) =>
				new DatabaseQueryError(
					"投稿作成クエリの実行に失敗しました",
					e as Error,
				),
		}),
});
