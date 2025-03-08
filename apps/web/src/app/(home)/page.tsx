import { prefetchListPets } from "@/generated/api/pets/pets";
import { getQueryClient } from "@/lib/get-query-client";
import { HomeView } from "@/modules/home/ui/views/home-view";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export const dynamic = "force-dynamic";

interface PageProps {
	searchParams: Promise<{
		categoryId?: string;
	}>;
}

const Page = async ({ searchParams }: PageProps) => {
	const { categoryId } = await searchParams;
	// TODO:awaitしなくても行ける方法考える
	const queryClient = await prefetchListPets(getQueryClient());
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<HomeView categoryId={categoryId} />
		</HydrationBoundary>
	);
};

export default Page;
