import { ExpandableCard } from "@/components/expandable-card";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CategoriesSection } from "@/modules/home/ui/sections/categories-section";
import { FormSection } from "@/modules/posts/ui/sections/form-section";

interface HomeViewProps {
	categoryId?: string;
}

export const HomeView = ({ categoryId }: HomeViewProps) => {
	return (
		<div className="max-w-[2400px] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
			<CategoriesSection categoryId={categoryId} />
			{/* <FormSection /> */}
			<ExpandableCard
				maxLines={1}
				header={{
					compact: "概要",
					expanded: "概要",
				}}
				content="寿限無じゅげむ、寿限無じゅげむ、
					五劫ごこうのすりきれ、
					海砂利かいじゃり水魚すいぎょの、
					水行末すいぎょうまつ・雲来末うんらいまつ・風来末ふうらいまつ、
					食う寝るところに住むところ、
					やぶらこうじのぶらこうじ、
					パイポ・パイポ・パイポのシューリンガン、
					シューリンガンのグーリンダイ、
					グーリンダイのポンポコピーのポンポコナの、
					長久命ちょうきゅうめいの長助"
			/>
			<Card className="bg-secondary/50">
				<CardHeader>
					<CardTitle>タイトル</CardTitle>
					<CardDescription>詳細な説明</CardDescription>
				</CardHeader>
				<CardContent>
					<div>
						<p>
							寿限無じゅげむ、寿限無じゅげむ、 五劫ごこうのすりきれ、
							海砂利かいじゃり水魚すいぎょの、
							水行末すいぎょうまつ・雲来末うんらいまつ・風来末ふうらいまつ、
							食う寝るところに住むところ、 やぶらこうじのぶらこうじ、
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
