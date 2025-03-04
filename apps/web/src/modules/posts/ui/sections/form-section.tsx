"use client";

import { FormField } from "@/components/conform/field";
import { InputConform } from "@/components/conform/input";
import { Button } from "@/components/ui/button";
import { createPost } from "@/modules/posts/service/create";
import { FormProvider, FormStateInput, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { createPostRequestSchema } from "@template/contract/api";
import { useActionState } from "react";

export const FormSection = () => {
	const [lastResult, action, isPending] = useActionState(createPost, null);

	const [form, fields] = useForm({
		constraint: getZodConstraint(createPostRequestSchema),
		onValidate({ formData }) {
			console.log({
				onValidate: formData,
			});
			return parseWithZod(formData, { schema: createPostRequestSchema });
		},
		defaultValue: {
			title: "",
			content: "",
		},
		shouldRevalidate: "onBlur",
	});

	return (
		<div className="flex flex-col gap-6 p-10">
			<h1 className="text-2xl">Form</h1>
			<FormProvider context={form.context}>
				<FormStateInput />
				<form
					id={form.id}
					onSubmit={form.onSubmit}
					className="flex flex-col gap-4 items-start"
					action={action}
				>
					<FormField id="title" name="title" label="タイトル" isRequired>
						{({ meta }) => <InputConform meta={meta} type="text" />}
					</FormField>
					<FormField id="content" name="content" label="内容" isRequired>
						{({ meta }) => <InputConform meta={meta} type="text" />}
					</FormField>
					<Button type="submit" disabled={isPending}>
						送信
					</Button>
				</form>
			</FormProvider>
		</div>
	);
};
