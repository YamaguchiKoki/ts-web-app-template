"use client";

import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useEffect } from "react";

/**
 * 無限スクロールを実現するためのインターフェース
 * @property isManual - 手動読み込みモードを有効にするかどうか（デフォルト: false）
 * @property hasNextPage - 次のページが存在するかどうか
 * @property isFetchingNextPage - 次のページを読み込み中かどうか
 * @property fetchNextPage - 次のページを読み込むための関数
 */
interface InfiniteScrollProps {
	isManual?: boolean;
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
	fetchNextPage: () => void;
}

/**
 * 無限スクロールを実装するコンポーネント
 *
 * スクロール位置に応じて自動的にコンテンツを読み込むか、
 * ボタンクリックによる手動読み込みを提供します。
 *
 * @param props - {@link InfiniteScrollProps}
 *
 * @example
 * ```tsx
 * const MyList = () => {
 *   const { hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(...);
 *
 *   return (
 *     <div>
 *       <div>コンテンツ...</div>
 *       <InfiniteScroll
 *         hasNextPage={hasNextPage}
 *         isFetchingNextPage={isFetchingNextPage}
 *         fetchNextPage={fetchNextPage}
 *       />
 *     </div>
 *   );
 * };
 * ```
 */
export const InfiniteScroll = ({
	isManual = false,
	hasNextPage,
	isFetchingNextPage,
	fetchNextPage,
}: InfiniteScrollProps) => {
	const { targetRef, isIntersecting } = useIntersectionObserver({
		threshold: 0.5,
		rootMargin: "100px",
	});

	useEffect(() => {
		if (isIntersecting && hasNextPage && !isFetchingNextPage && !isManual) {
			fetchNextPage();
		}
	}, [
		isIntersecting,
		hasNextPage,
		isFetchingNextPage,
		isManual,
		fetchNextPage,
	]);

	return (
		<div className="flex flex-col items-center gap-4 p-4">
			<div ref={targetRef} className="h-1">
				{hasNextPage ? (
					<Button
						variant="secondary"
						onClick={() => fetchNextPage()}
						disabled={isFetchingNextPage || !hasNextPage}
					>
						{isFetchingNextPage ? "Loading..." : "Load more"}
					</Button>
				) : (
					<p className="text-xs text-muted-foreground">
						No more items to load.
					</p>
				)}
			</div>
		</div>
	);
};
