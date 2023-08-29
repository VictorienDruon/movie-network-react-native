import { FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getFollowing } from "@/libs/supabase/api/follows";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Box, EmptyState, ErrorState, Separator } from "@/components/ui";
import { User } from "@/features/user";
import UserSkeletons from "@/features/user/components/UserSkeletons";

interface Page {
	users: User[];
	nextCursor: number;
}

const FollowingScreen = () => {
	const { id } = useLocalSearchParams() as { id: string };

	const query = useInfiniteQuery<Page, Error>({
		queryKey: ["following", id],
		queryFn: ({ pageParam = 0 }) => getFollowing(id, pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	if (query.isLoading) return <UserSkeletons count={2} />;

	if (query.isError) return <ErrorState retry={query.refetch} />;

	return (
		<FlatList
			data={query.data.pages.flatMap((page) => page.users)}
			keyExtractor={(user) => user.id}
			renderItem={({ item: user }) => <User user={user} />}
			ItemSeparatorComponent={() => <Separator />}
			ListEmptyComponent={
				<EmptyState>This user does not follow anyone yet.</EmptyState>
			}
			ListFooterComponent={
				<Box pb={64}>{query.hasNextPage && <UserSkeletons />}</Box>
			}
			onEndReached={() => query.fetchNextPage()}
			showsVerticalScrollIndicator={false}
		/>
	);
};

export default FollowingScreen;
