import { type FieldMetadata, getInputProps } from "@conform-to/react";
import type { ComponentProps } from "react";
import { Input } from "../ui/input";

/**
 * Conform-to と統合された入力フィールドコンポーネント
 *
 * フォームバリデーションライブラリ Conform-to と連携し、
 * 標準的な入力フィールドを提供します。
 *
 * @param props - コンポーネントのプロパティ
 * @param props.meta - Conform-to のフィールドメタデータ
 * @param props.type - 入力フィールドのタイプ
 *
 * @example
 * ```tsx
 * const form = useForm({
 *   onSubmit(data) {
 *     // フォームの送信処理
 *   }
 * });
 *
 * return (
 *   <form.Field name="username">
 *     {(field) => (
 *       <InputConform
 *         meta={field.meta}
 *         type="text"
 *       />
 *     )}
 *   </form.Field>
 * );
 * ```
 */
export const InputConform = ({
	meta,
	type,
	...props
}: {
	meta: FieldMetadata<string>;
	type: Parameters<typeof getInputProps>[1]["type"];
} & ComponentProps<typeof Input>) => {
	const { key, ...inputProps } = getInputProps(meta, {
		type,
		ariaAttributes: true,
	});
	return <Input {...inputProps} {...props} />;
};
