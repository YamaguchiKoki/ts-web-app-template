"use client";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { type ReactNode, useState } from "react";

/**
 * 展開可能なカードのプロパティ
 * @property header - カードのヘッダー情報
 * @property header.compact - 折りたたみ時に表示するヘッダー
 * @property header.expanded - 展開時に表示するヘッダー
 * @property content - カードのメインコンテンツ
 * @property maxLines - 折りたたみ時の最大表示行数（デフォルト: 2）
 * @property showMoreText - 展開ボタンのテキスト（デフォルト: "Show more"）
 * @property showLessText - 折りたたみボタンのテキスト（デフォルト: "Show less"）
 * @property className - 追加のCSSクラス
 */
interface ExpandableCardProps {
	header: {
		compact: ReactNode;
		expanded: ReactNode;
	};
	content: ReactNode;
	className?: string;
	maxLines?: number;
	showMoreText?: string;
	showLessText?: string;
}

/**
 * 展開可能なカード形式の情報表示コンポーネント
 *
 * コンテンツを折りたたみ可能な形式で表示し、ユーザーの操作に応じて
 * 全文を表示/非表示を切り替えることができます。
 * キーボード操作（Enterキー、スペースキー）にも対応しています。
 *
 * @param props - {@link ExpandableInfoCardProps}
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   return (
 *     <ExpandableInfoCard
 *       header={{
 *         compact: "概要",
 *         expanded: "詳細な説明"
 *       }}
 *       content="長文のコンテンツ..."
 *       maxLines={3}
 *     />
 *   );
 * };
 * ```
 */
export const ExpandableCard = ({
	header,
	content,
	className,
	maxLines = 2,
	showMoreText = "続きを読む",
	showLessText = "閉じる",
}: ExpandableCardProps) => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div
			className={cn(
				"bg-secondary/50 rounded-xl p-3 cursor-pointer hover:bg-secondary/70 transition",
				className,
			)}
			onClick={() => setIsExpanded((current) => !current)}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					setIsExpanded((current) => !current);
				}
			}}
			aria-expanded={isExpanded}
		>
			<div className="flex gap-2 text-base font-bold mb-2">
				{isExpanded ? header.expanded : header.compact}
			</div>
			<div className="relative">
				<div
					className={cn(
						"text-sm whitespace-pre-wrap",
						!isExpanded && {
							"line-clamp-1": maxLines === 1,
							"line-clamp-2": maxLines === 2,
							"line-clamp-3": maxLines === 3,
							"line-clamp-4": maxLines === 4,
							"line-clamp-5": maxLines === 5,
							"line-clamp-6": maxLines === 6,
						},
					)}
				>
					{content}
				</div>
				<div className="flex items-center gap-1 mt-4 text-sm font-medium">
					{isExpanded ? (
						<>
							{showLessText} <ChevronUpIcon className="size-4" />
						</>
					) : (
						<>
							{showMoreText} <ChevronDownIcon className="size-4" />
						</>
					)}
				</div>
			</div>
		</div>
	);
};
