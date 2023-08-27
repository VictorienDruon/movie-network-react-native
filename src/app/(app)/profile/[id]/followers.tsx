import { FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getFollowers } from "@/libs/supabase/api/follows";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Box, Empty, Error, Separator } from "@/components/ui";
import { User } from "@/features/user";
import UserSkeletons from "@/features/user/components/UserSkeletons";

interface Page {
	users: User[];
	nextCursor: number;
}

const FollowersScreen = () => {
	const { id } = useLocalSearchParams() as { id: string };

	const query = useInfiniteQuery<Page, Error>({
		queryKey: ["followers", id],
		queryFn: ({ pageParam = 0 }) => getFollowers(id, pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	if (query.isLoading) return <UserSkeletons count={2} />;

	if (query.isError) return <Error retry={query.refetch} />;

	return (
		<FlatList
			data={query.data.pages.flatMap((page) => page.users)}
			keyExtractor={(user) => user.id}
			renderItem={({ item: user }) => <User user={user} />}
			ItemSeparatorComponent={() => <Separator />}
			ListEmptyComponent={<Empty>This user is followed by no one yet.</Empty>}
			ListFooterComponent={
				<Box pb={64}>{query.hasNextPage && <UserSkeletons />}</Box>
			}
			onEndReached={() => query.fetchNextPage()}
			showsVerticalScrollIndicator={false}
		/>
	);
};

export default FollowersScreen;
