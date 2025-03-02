"use client";

import { CheckboxConform } from "@/components/conform/checkbox";
import { CheckboxGroupConform } from "@/components/conform/checkbox-group";
import { DatePickerConform } from "@/components/conform/date-picker";
import { Field, FieldError } from "@/components/conform/field";
import { InputConform } from "@/components/conform/input";
import { InputOTPConform } from "@/components/conform/input-otp";
import { RadioGroupConform } from "@/components/conform/radio-group";
import { SelectConform } from "@/components/conform/select";
import { SliderConform } from "@/components/conform/slider";
import { SwitchConform } from "@/components/conform/switch";
import { TextareaConform } from "@/components/conform/text-area";
import { ToggleGroupConform } from "@/components/conform/toggle-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UserSubscriptionSchema } from "@/modules/posts/schema/form";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";

export const FormSection = () => {
	const [form, fields] = useForm({
		id: "test",
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: UserSubscriptionSchema });
		},
		onSubmit(e) {
			e.preventDefault();
			const form = e.currentTarget;
			const formData = new FormData(form);
			const result = parseWithZod(formData, { schema: UserSubscriptionSchema });
			console.log({ result });
			alert(JSON.stringify(result, null, 2));
		},
		shouldRevalidate: "onBlur",
	});

	return (
		<div className="flex flex-col gap-6 p-10">
			<h1 className="text-2xl">Form</h1>
			<form
				id={form.id}
				method="POST"
				onSubmit={form.onSubmit}
				className="flex flex-col gap-4 items-start"
			>
				<Field>
					<Label htmlFor={fields.name.id}>Name</Label>
					<InputConform meta={fields.name} type="text" />
					{fields.name.errors && <FieldError>{fields.name.errors}</FieldError>}
				</Field>
				<Field>
					<Label htmlFor={fields.dateOfBirth.id}>Birth date</Label>
					<DatePickerConform meta={fields.dateOfBirth} />
					{fields.dateOfBirth.errors && (
						<FieldError>{fields.dateOfBirth.errors}</FieldError>
					)}
				</Field>
				<Field>
					<Label htmlFor={fields.gender.id}>Gender</Label>
					<RadioGroupConform
						meta={fields.gender}
						items={[
							{ value: "male", label: "male" },
							{ value: "female", label: "female" },
							{ value: "other", label: "other" },
						]}
					/>
					{fields.gender.errors && (
						<FieldError>{fields.gender.errors}</FieldError>
					)}
				</Field>
				<Field>
					<div className="flex gap-2 items-center">
						<CheckboxConform meta={fields.agreeToTerms} />
						<Label htmlFor={fields.agreeToTerms.id}>Agree to terms</Label>
					</div>
					{fields.agreeToTerms.errors && (
						<FieldError>{fields.agreeToTerms.errors}</FieldError>
					)}
				</Field>
				<Field>
					<Label htmlFor={fields.job.id}>Job</Label>
					<SelectConform
						placeholder="Select a job"
						meta={fields.job}
						items={[
							{ value: "developer", name: "Developer" },
							{ value: "designer", name: "Design" },
							{ value: "manager", name: "Manager" },
						]}
					/>
					{fields.job.errors && <FieldError>{fields.job.errors}</FieldError>}
				</Field>
				<Field>
					<Label htmlFor={fields.age.id}>Age</Label>
					<SliderConform meta={fields.age} step={1} />
					{fields.age.errors && <FieldError>{fields.age.errors}</FieldError>}
				</Field>
				<Field>
					<div className="flex items-center gap-2">
						<Label htmlFor={fields.isAdult.id}>Is adult</Label>
						<SwitchConform meta={fields.isAdult} />
					</div>
					{fields.isAdult.errors && (
						<FieldError>{fields.isAdult.errors}</FieldError>
					)}
				</Field>
				<Field>
					<Label htmlFor={fields.description.id}>Description</Label>
					<TextareaConform meta={fields.description} />
					{fields.description.errors && (
						<FieldError>{fields.description.errors}</FieldError>
					)}
				</Field>
				<Field>
					<Label htmlFor={fields.accountType.id}>Account type</Label>
					<ToggleGroupConform
						type="single"
						meta={fields.accountType}
						items={[
							{ value: "personal", label: "Personal" },
							{ value: "business", label: "Business" },
						]}
					/>
					{fields.accountType.errors && (
						<FieldError>{fields.accountType.errors}</FieldError>
					)}
				</Field>
				<Field>
					<Label htmlFor={fields.accountTypes.id}>Account types</Label>
					<ToggleGroupConform
						type="multiple"
						meta={fields.accountTypes}
						items={[
							{ value: "personal", label: "Personal" },
							{ value: "business", label: "Business" },
							{ value: "business2", label: "Business2" },
						]}
					/>
					{fields.accountTypes.allErrors && (
						<FieldError>
							{Object.values(fields.accountTypes.allErrors).flat()}
						</FieldError>
					)}
				</Field>
				<Field>
					<fieldset>Interests</fieldset>
					<CheckboxGroupConform
						meta={fields.interests}
						items={[
							{ value: "react", name: "React" },
							{ value: "vue", name: "Vue" },
							{ value: "svelte", name: "Svelte" },
							{ value: "angular", name: "Angular" },
							{ value: "ember", name: "Ember" },
							{ value: "next", name: "Next" },
							{ value: "nuxt", name: "Nuxt" },
							{ value: "sapper", name: "Sapper" },
							{ value: "glimmer", name: "Glimmer" },
						]}
					/>
					{fields.interests.errors && (
						<FieldError>{fields.interests.errors}</FieldError>
					)}
				</Field>
				<Field>
					<Label htmlFor={fields.code.id}>Code</Label>
					<InputOTPConform meta={fields.code} length={6} />
					{fields.code.errors && <FieldError>{fields.code.errors}</FieldError>}
				</Field>

				<div className="flex gap-2">
					<Button type="submit">Submit</Button>
					<Button type="reset" variant="outline">
						Reset
					</Button>
				</div>
			</form>
		</div>
	);
};
