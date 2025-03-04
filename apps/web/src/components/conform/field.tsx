import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
	type FieldMetadata,
	type FieldName,
	useField,
} from "@conform-to/react";
import { CircleAlert } from "lucide-react";
import type { ReactNode } from "react";

type FieldRenderProps = {
	meta: FieldMetadata<number>;
};

type FieldProps = {
	id: string;
	label?: string;
	name: FieldName<number>;
	disabled?: boolean;
	helpText?: string;
	htmlFor?: string;
	isRequired?: boolean;
	className?: string;
	children: (props: FieldRenderProps) => ReactNode;
};

export const FormField = ({
	id,
	name,
	label,
	disabled,
	helpText,
	htmlFor,
	isRequired,
	className,
	children,
}: FieldProps) => {
	const [meta] = useField(name);
	return (
		<div className={cn("space-y-2", className)}>
			{label && (
				<div className="flex items-center">
					<Label
						htmlFor={htmlFor}
						className={cn(
							"mr-2 h-5 font-medium text-sm",
							disabled ? "text-gray-400" : "text-gray-800",
						)}
					>
						{label}
					</Label>
					{isRequired && (
						<Badge className="px-2" color={disabled ? "gray" : "red"}>
							必須
						</Badge>
					)}
				</div>
			)}
			{helpText !== "" && (
				<p
					className={cn(
						"text-xs font-normal",
						disabled ? "text-gray-400" : "text-gray-600",
					)}
				>
					{helpText}
				</p>
			)}
			<div>{children({ meta })}</div>
			<div>
				{meta.errors !== undefined && !disabled && (
					<div className="relative mt-2 flex items-center">
						<CircleAlert className="mr-1 text-red-600" />
						<p className="text-sm text-red-600" data-testid={`${id}-error`}>
							{meta.errors.join(", ")}
						</p>
					</div>
				)}
			</div>
		</div>
	);
};
