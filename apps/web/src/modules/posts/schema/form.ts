import { z } from "zod";

export const UserSubscriptionSchema = z.object({
	name: z
		.string({ required_error: "Name is required" })
		.min(3, { message: "Name must be at least 3 characters long" }),
	dateOfBirth: z
		.date({
			required_error: "Date of birth is required",
			invalid_type_error: "Invalid date",
		})
		.max(new Date(), { message: "Date of birth cannot be in the future" }),
	gender: z.enum(["male", "female", "other"], {
		required_error: "Gender is required",
	}),
	agreeToTerms: z.boolean({ required_error: "You must agree to the terms" }),
	job: z.enum(["developer", "designer", "manager"], {
		required_error: "You must select a job",
	}),
	age: z.number().min(18, "You must have be more than 18"),
	isAdult: z
		.boolean()
		.optional()
		.refine((val) => val === true, "You must be an adult"),
	description: z.string().min(10, "Description must be at least 10 characters"),
	accountType: z.enum(["personal", "business"], {
		required_error: "You must select an account type",
	}),
	accountTypes: z
		.array(z.enum(["personal", "business"]))
		.min(1, "You must select at least one account type"),
	interests: z
		.array(z.string())
		.min(3, "You must select at least three interest"),
	code: z.string().length(6, "Code must be 6 characters long"),
});

export const PostSchema = z.object({
	title: z.string().min(1, "Title is required"),
	content: z.string().min(1, "Content is required"),
	category: z.string().min(1, "Category is required"),
});
