import { useEffect, useRef, useState } from "react";

/**
 * 要素の可視性を監視するカスタムフック
 *
 * Intersection Observerを使用して、要素が画面内に表示されているかどうかを監視します。
 * 主にInfinite Scrollや遅延読み込みの実装に使用します。
 *
 * @param options - Intersection Observerの設定オプション
 * @returns
 * - targetRef: 監視対象の要素に付与するref
 * - isIntersecting: 要素が可視領域に入っているかどうか
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const { targetRef, isIntersecting } = useIntersectionObserver({
 *     threshold: 0.5,
 *     rootMargin: '100px',
 *   });
 *
 *   useEffect(() => {
 *     if (isIntersecting) {
 *       // 要素が可視領域に入った時の処理
 *     }
 *   }, [isIntersecting]);
 *
 *   return <div ref={targetRef}>監視対象の要素</div>;
 * };
 * ```
 */
export const useIntersectionObserver = (options?: IntersectionObserverInit) => {
	const [isIntersecting, setIsIntersecting] = useState(false);
	const targetRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry = null]) => {
			setIsIntersecting(entry?.isIntersecting ?? false);
		}, options);

		if (targetRef.current) {
			observer.observe(targetRef.current);
		}

		return () => observer.disconnect();
	}, [options]);

	return {
		targetRef,
		isIntersecting,
	};
};
