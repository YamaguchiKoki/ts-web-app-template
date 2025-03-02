import { serve } from "@hono/node-server";
import { Hono } from "hono";
import type { JwtVariables } from "hono/jwt";
import { createPostHandler } from "./adapters/handler/post/create.js";
import type { DIContainer } from "./config/di-container.js";
import {
	type DependencyTypes,
	resolveDependencies,
} from "./middlewares/dependency-resolver.js";

export type AppType = {
	Variables: JwtVariables;
	Bindings: {
		container: DIContainer<DependencyTypes>;
	};
};

const app = new Hono<AppType>();

app.use("*", resolveDependencies);

const routes = app
	.get("/", (c) => {
		return c.text("Hello Hono!");
	})
	.post("/posts", ...createPostHandler);

serve({
	fetch: routes.fetch,
	port: 8787,
});

console.log("Server is running on port 8787");

export { routes };
export { app };
