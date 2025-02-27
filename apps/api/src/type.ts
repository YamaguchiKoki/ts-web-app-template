import type { JwtVariables } from "hono/jwt";
import type { DIContainer } from "./config/di-container";
import type { DependencyTypes } from "./middlewares/dependency-resolver";

export type AppType = {
	Variables: JwtVariables;
	Bindings: {
		container: DIContainer<DependencyTypes>;
	};
};
