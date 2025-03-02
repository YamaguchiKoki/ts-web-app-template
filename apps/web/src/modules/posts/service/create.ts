"use server";

import { hrpc } from "@/lib/hono-rpc";
import {
	type CreatePostRequest,
	createPostRequestSchema,
} from "@template/contract/api";

export const createPost = async (prevState: unknown, formData: FormData) => {
	const parsed = createPostRequestSchema.safeParse(formData);

	if (!parsed.success) {
		console.log({
			errors: parsed.error.flatten().fieldErrors,
		});
		throw new Error("Invalid request");
	}

	const result = await hrpc.posts.$post({
		json: parsed.data,
	});

	return result.json();
};
