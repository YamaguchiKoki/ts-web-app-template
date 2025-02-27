import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { createPostHandler } from "./adapters/handler/post/create";
import { resolveDependencies } from "./middlewares/dependency-resolver";
import type { AppType } from "./type";

const app = new Hono<AppType>();

app.use("*", resolveDependencies);

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.post("/posts", ...createPostHandler);

export const handler = handle(app);
