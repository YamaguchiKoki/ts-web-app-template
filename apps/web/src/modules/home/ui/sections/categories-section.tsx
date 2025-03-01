"use client";

import { FilterCarousel } from "@/components/filter-carousel";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface CategoriesSectionProps {
	categoryId?: string;
}

const sampleCategories = [
	{ id: "tech", name: "テクノロジー" },
	{ id: "lifestyle", name: "ライフスタイル" },
	{ id: "food", name: "グルメ・料理" },
	{ id: "travel", name: "旅行・観光" },
	{ id: "health", name: "健康・フィットネス" },
	{ id: "culture", name: "カルチャー・芸能" },
	{ id: "business", name: "ビジネス・経済" },
	{ id: "education", name: "教育・学習" },
	{ id: "hobby", name: "趣味・創作" },
	{ id: "sports", name: "スポーツ" },
];

export const CategoriesSection = ({ categoryId }: CategoriesSectionProps) => {
	return (
		<Suspense fallback={<CategoriesSkelton />}>
			<ErrorBoundary fallback={<div>Error</div>}>
				<CategoriesSectionSuspense categoryId={categoryId} />
			</ErrorBoundary>
		</Suspense>
	);
};

const CategoriesSkelton = () => {
	return <FilterCarousel isLoading data={[]} onSelect={() => {}} />;
};

const CategoriesSectionSuspense = ({ categoryId }: CategoriesSectionProps) => {
	const router = useRouter();

	const data = sampleCategories.map(({ id, name }) => ({
		value: id,
		label: name,
	}));

	const onSelect = (value: string | null) => {
		const url = new URL(window.location.href);

		if (value) {
			url.searchParams.set("categoryId", value);
		} else {
			url.searchParams.delete("categoryId");
		}

		router.push(url.toString());
	};

	return <FilterCarousel onSelect={onSelect} data={data} value={categoryId} />;
};
