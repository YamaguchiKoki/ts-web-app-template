import { getBaseURL } from "@/lib/base-url";
import type { routes } from "@template/api";
import { hc } from "hono/client";

export const hrpc = hc<typeof routes>(`${getBaseURL()}/api`);
