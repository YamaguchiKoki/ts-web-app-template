import { HomeView } from "@/modules/home/ui/views/home-view";

export const dynamic = "force-dynamic";

interface PageProps {
	searchParams: Promise<{
		categoryId?: string;
	}>;
}

const Page = async ({ searchParams }: PageProps) => {
	const { categoryId } = await searchParams;

	// サーバーコンポーネントでprefetchを行う→クライアントコンポーネントでuseSuspenseQueryを使う

	// page.tsxではviewのみ呼び出す そのView内では単一のsectionのみ呼び出す。データフェッチはsectionで行う。そうすることで、独立したエラーバウンダリを作成可能
	return <HomeView categoryId={categoryId} />;
};

export default Page;
