import { Textarea } from "@/components/ui/textarea";
import { type FieldMetadata, getTextareaProps } from "@conform-to/react";
import type { ComponentProps } from "react";

/**
 * Conform-to と統合されたテキストエリアコンポーネント
 *
 * フォームバリデーションライブラリ Conform-to と連携し、
 * 複数行のテキスト入力フィールドを提供します。
 *
 * @param props - コンポーネントのプロパティ
 * @param props.meta - Conform-to のフィールドメタデータ
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
 *   <form.Field name="description">
 *     {(field) => (
 *       <TextareaConform
 *         meta={field.meta}
 *         placeholder="説明を入力..."
 *       />
 *     )}
 *   </form.Field>
 * );
 * ```
 */
export const TextareaConform = ({
	meta,
	...props
}: {
	meta: FieldMetadata<string>;
} & ComponentProps<typeof Textarea>) => {
	const { key, ...textareaProps } = getTextareaProps(meta);
	return <Textarea {...textareaProps} {...props} />;
};
