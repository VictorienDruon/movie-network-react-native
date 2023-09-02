import { FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getFollowing } from "@/libs/supabase/api/follows";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ErrorState, EmptyState } from "@/components/common";
import { Box, Separator } from "@/components/ui";
import { User } from "@/features/user";
import UserSkeletons from "@/features/user/components/UserSkeletons";

interface UsersPage {
	users: User[];
	nextCursor: number;
}

const FollowingModal = () => {
	const { id } = useLocalSearchParams<{ id: string }>();

	const query = useInfiniteQuery<UsersPage, Error>({
		queryKey: ["following", id],
		queryFn: ({ pageParam = 0 }) => getFollowing(id, pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	if (query.isLoading) return <UserSkeletons count={2} p={16} />;

	if (query.isError) return <ErrorState retry={query.refetch} />;

	return (
		<FlatList
			data={query.data.pages.flatMap((page) => page.users)}
			keyExtractor={(user) => user.id}
			renderItem={({ item: user }) => <User user={user} p={16} />}
			ItemSeparatorComponent={() => <Separator />}
			ListEmptyComponent={
				<EmptyState>This user does not follow anyone yet.</EmptyState>
			}
			ListFooterComponent={
				<Box pb={64}>{query.hasNextPage && <UserSkeletons p={16} />}</Box>
			}
			onEndReached={() => query.fetchNextPage()}
			showsVerticalScrollIndicator={false}
		/>
	);
};

export default FollowingModal;
