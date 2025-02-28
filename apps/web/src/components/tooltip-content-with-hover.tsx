import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type { ReactNode } from "react";

/**
 * ツールチップコンテンツのサイズバリアント定義
 * @property default - デフォルトサイズ（テキスト: sm, アイコン: 16px）
 * @property lg - 大サイズ（テキスト: base, アイコン: 20px, 太字）
 * @property sm - 小サイズ（テキスト: xs, アイコン: 14px）
 */
const tooltipContentVariants = cva("flex items-center gap-1", {
	variants: {
		size: {
			default: "[&_p]:text-sm [&_svg]:size-4",
			lg: "[&_p]:text-base [&_svg]:size-5 [&_p]:font-medium [&_p]:text-black",
			sm: "[&_p]:text-xs [&_svg]:size-3.5",
		},
	},
	defaultVariants: {
		size: "default",
	},
});

/**
 * ホバー時にツールチップを表示するコンテンツのプロパティ
 * @property content - 表示するコンテンツ
 * @property tooltipContent - ツールチップに表示するコンテンツ（省略時はcontentを使用）
 * @property size - コンテンツのサイズバリアント
 * @property className - 追加のCSSクラス
 */
interface TooltipContentWithHoverProps
	extends VariantProps<typeof tooltipContentVariants> {
	content: ReactNode;
	tooltipContent?: ReactNode;
	className?: string;
}

/**
 * ホバー時にツールチップを表示するコンテンツコンポーネント
 *
 * コンテンツをホバーすると、ツールチップが表示されます。
 * コンテンツが長い場合は省略され、ツールチップで全文を確認できます。
 *
 * @param props - {@link TooltipContentWithHoverProps}
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   return (
 *     <TooltipContentWithHover
 *       content="短い表示テキスト"
 *       tooltipContent="ツールチップに表示される詳細なテキスト"
 *       size="lg"
 *     />
 *   );
 * };
 * ```
 */
export const TooltipContentWithHover = ({
	content,
	tooltipContent,
	className,
	size,
}: TooltipContentWithHoverProps) => {
	return (
		<div className={cn(tooltipContentVariants({ size }), className)}>
			<Tooltip>
				<TooltipTrigger asChild>
					<p className="text-gray-500 hover:text-gray-800 line-clamp-1">
						{content}
					</p>
				</TooltipTrigger>
				<TooltipContent align="center" className="bg-black/70">
					<p>{tooltipContent ?? content}</p>
				</TooltipContent>
			</Tooltip>
		</div>
	);
};
