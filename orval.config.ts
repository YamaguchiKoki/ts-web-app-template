import { defineConfig } from "orval";

const apiDir = "./apps/api";
const webDir = "./apps/web";
const baseUrl = "http://localhost:8787";
const docsPath = `${apiDir}/docs/openapi.yml`;

export default defineConfig({
	client: {
		input: {
			target: docsPath,
		},
		output: {
			mode: "tags-split",
			client: "axios",
			target: `${webDir}/src/gen/`,
			schemas: `${webDir}/src/gen/models/`,
			clean: true,
			baseUrl,
			mock: true,
		},
	},
	api: {
		input: {
			target: docsPath,
		},
		output: {
			mode: "tags-split",
			client: "hono",
			target: `${apiDir}/src/gen/`,
			override: {
				hono: {
					handlers: `${apiDir}/src/adapters/handler/`,
				},
			},
		},
	},
});
