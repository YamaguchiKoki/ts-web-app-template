import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
	type FieldMetadata,
	unstable_useControl as useControl,
} from "@conform-to/react";
import { type ComponentProps, type ElementRef, useRef } from "react";

interface ToggleGroupItemData {
	/** トグルの値 */
	value: string;
	/** 表示ラベル */
	label: string;
}

type SingleToggleGroupProps = Omit<
	ComponentProps<typeof ToggleGroup>,
	"defaultValue" | "value" | "onValueChange" | "type"
> & {
	type: "single";
	meta: FieldMetadata<string>;
};

type MultipleToggleGroupProps = Omit<
	ComponentProps<typeof ToggleGroup>,
	"defaultValue" | "value" | "onValueChange" | "type"
> & {
	type: "multiple";
	meta: FieldMetadata<string[]>;
};

interface BaseToggleGroupProps {
	/** トグルアイテムの配列 */
	items: ToggleGroupItemData[];
	/** その他のToggleGroupプロパティ */
	toggleGroupProps?: Omit<
		ComponentProps<typeof ToggleGroup>,
		"defaultValue" | "value" | "onValueChange" | "type"
	>;
}

type ToggleGroupConformProps = BaseToggleGroupProps &
	(SingleToggleGroupProps | MultipleToggleGroupProps);

/**
 * Conform-to と統合されたトグルグループコンポーネント
 *
 * フォームバリデーションライブラリ Conform-to と連携し、
 * 単一選択または複数選択が可能なトグルグループを提供します。
 *
 * @param props - {@link ToggleGroupConformProps}
 *
 * @example
 * ```tsx
 * const form = useForm({
 *   onSubmit(data) {
 *     // handle form submission
 *   }
 * });
 *
 * return (
 *   <form.Field name="category">
 *     {(field) => (
 *       <ToggleGroupConform
 *         type="single"
 *         meta={field.meta}
 *         items={[
 *           { value: "a", label: "Option A" },
 *           { value: "b", label: "Option B" },
 *         ]}
 *       />
 *     )}
 *   </form.Field>
 * );
 * ```
 */
export const ToggleGroupConform = ({
	type,
	meta,
	items,
	toggleGroupProps = {},
}: ToggleGroupConformProps) => {
	const toggleGroupRef = useRef<ElementRef<typeof ToggleGroup>>(null);
	const control = useControl(meta);

	if (type === "single") {
		return (
			<>
				<input
					name={meta.name}
					ref={control.register}
					className="sr-only"
					tabIndex={-1}
					defaultValue={meta.initialValue as string}
					onFocus={() => {
						toggleGroupRef.current?.focus();
					}}
				/>
				<ToggleGroup
					{...toggleGroupProps}
					type={type}
					ref={toggleGroupRef}
					value={control.value as string}
					onValueChange={(value: string) => control.change(value)}
				>
					{items.map((item) => (
						<ToggleGroupItem key={item.value} value={item.value}>
							{item.label}
						</ToggleGroupItem>
					))}
				</ToggleGroup>
			</>
		);
	}

	const defaultValue = Array.isArray(meta.initialValue)
		? meta.initialValue.filter((v): v is string => typeof v === "string")
		: [];

	const currentValue = Array.isArray(control.value)
		? control.value.filter((v): v is string => typeof v === "string")
		: [];

	return (
		<>
			<select
				multiple
				name={meta.name}
				className="sr-only"
				ref={control.register}
				onFocus={() => {
					toggleGroupRef.current?.focus();
				}}
				defaultValue={defaultValue}
				tabIndex={-1}
			>
				{items.map((item) => (
					<option value={item.value} key={item.value}>
						{item.label}
					</option>
				))}
			</select>

			<ToggleGroup
				{...toggleGroupProps}
				type={type}
				ref={toggleGroupRef}
				value={currentValue}
				onValueChange={(value: string[]) => {
					control.change(value);
				}}
			>
				{items.map((item) => (
					<ToggleGroupItem key={item.value} value={item.value}>
						{item.label}
					</ToggleGroupItem>
				))}
			</ToggleGroup>
		</>
	);
};
