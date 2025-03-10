"use server";

import { hrpc } from "@/lib/hono-rpc";
import { parseWithZod } from "@conform-to/zod";
import { createPostRequestSchema } from "@template/contract/api";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export const createPost = async (prevState: unknown, formData: FormData) => {
	console.log("createPost");
	console.log({
		koki: formData,
	});
	const submission = parseWithZod(formData, {
		schema: createPostRequestSchema,
	});
	console.log({ submission });

	if (submission.status !== "success") {
		return submission.reply();
	}

	const result = await hrpc.posts.$post({
		json: submission.value,
	});

	console.log({
		result,
	});
	// toast.success("投稿が作成されました");

	return redirect("/");
};
