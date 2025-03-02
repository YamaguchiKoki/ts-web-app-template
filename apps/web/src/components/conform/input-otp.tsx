import {
	type FieldMetadata,
	unstable_useControl as useControl,
} from "@conform-to/react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { type ElementRef, useRef } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

const OTP_SLOTS = Array.from({ length: 6 }, (_, i) => `otp-slot-${i}`);

interface InputOTPConformProps {
	/** Conform-to のフィールドメタデータ */
	meta: FieldMetadata<string>;
	/** OTPの桁数（デフォルト: 6） */
	length?: number;
	/** 入力を制限する正規表現パターン */
	pattern?: string;
}

/**
 * Conform-to と統合されたOTP入力コンポーネント
 *
 * フォームバリデーションライブラリ Conform-to と連携し、
 * ワンタイムパスワード入力用のUIを提供します。
 *
 * @param props - {@link InputOTPConformProps}
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
 *   <form.Field name="otp">
 *     {(field) => (
 *       <InputOTPConform
 *         meta={field.meta}
 *         length={6}
 *       />
 *     )}
 *   </form.Field>
 * );
 * ```
 */
export function InputOTPConform({
	meta,
	length = 6,
	pattern = REGEXP_ONLY_DIGITS_AND_CHARS,
}: InputOTPConformProps) {
	const inputOTPRef = useRef<ElementRef<typeof InputOTP>>(null);
	const control = useControl(meta);

	return (
		<>
			<input
				ref={control.register}
				name={meta.name}
				defaultValue={meta.initialValue}
				tabIndex={-1}
				className="sr-only"
				onFocus={() => {
					inputOTPRef.current?.focus();
				}}
			/>
			<InputOTP
				ref={inputOTPRef}
				value={control.value ?? ""}
				onChange={control.change}
				onBlur={control.blur}
				maxLength={6}
				pattern={pattern}
			>
				<InputOTPGroup>
					{OTP_SLOTS.slice(0, length).map((key, index) => (
						<InputOTPSlot key={key} index={index} />
					))}
				</InputOTPGroup>
			</InputOTP>
		</>
	);
}
