import { defineConfig } from "orval";

const apiDir = "./apps/api";
const webDir = "./apps/web";
const baseUrl = "http://localhost:8787";
const docsPath = `${apiDir}/docs/openapi.yml`;
const appName = "template";

// axiosインスタンスのパス
const axiosPath = `${webDir}/src/lib/axios.ts`;
const axiosInstance = "customInstance";

export default defineConfig({
	client: {
		input: {
			target: docsPath,
		},
		output: {
			mode: "tags-split",
			client: "react-query",
			target: `${webDir}/src/generated/api`,
			schemas: `${webDir}/src/generated/schemas`,
			clean: true,
			baseUrl,
			override: {
				mutator: {
					path: axiosPath,
					name: axiosInstance,
				},
				query: {
					useSuspenseQuery: true,
					useSuspenseInfiniteQuery: true,
					useInfiniteQueryParam: "page",
					usePrefetch: true,
				},
			},
		},
	},
	zod: {
		input: { target: docsPath },
		output: {
			mode: "tags-split",
			client: "zod",
			target: `${webDir}/src/generated/api`,
			fileExtension: ".zod.ts",
		},
	},
	api: {
		input: {
			target: docsPath,
		},
		output: {
			biome: true,
			mode: "split",
			client: "hono",
			target: `${apiDir}/src/adapters/${appName}.ts`,
			override: {
				hono: {
					handlers: `${apiDir}/src/adapters/handler/`,
				},
			},
		},
		hooks: {
			afterAllFilesWrite: "pnpm format-and-lint:fix --unsafe",
		},
	},
});
