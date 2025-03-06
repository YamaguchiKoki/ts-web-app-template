import {
	type IPostRepository,
	makeCreatePost,
	makeGetPosts,
} from "@template/domain";
import { createMiddleware } from "hono/factory";
import { DIContainer } from "../config/di-container.js";
import { makePostRepository } from "../infrastructure/repositories/post.js";

export type DependencyTypes = {
		postRepository: IPostRepository;
		createPostUsecase: ReturnType<typeof makeCreatePost>;
		getPostsUsecase: ReturnType<typeof makeGetPosts>;
	};

// コンテナをグローバルに1つだけ作成
const container = new DIContainer<DependencyTypes>();

// 依存関係の初期設定
container.register("postRepository", makePostRepository());
container.register(
	"createPostUsecase",
	makeCreatePost(container.get("postRepository")),
);
container.register(
	"getPostsUsecase",
	makeGetPosts(container.get("postRepository")),
);

export const resolveDependencies = createMiddleware(async (c, next) => {
	c.env.container = container;
	await next();
});
