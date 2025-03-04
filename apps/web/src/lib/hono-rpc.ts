import { getBaseURL } from "@/lib/base-url";
import type { routes } from "@template/api";
import { hc } from "hono/client";

const url = getBaseURL();
console.log({
	url,
});
export const hrpc = hc<typeof routes>(`${url}`);
