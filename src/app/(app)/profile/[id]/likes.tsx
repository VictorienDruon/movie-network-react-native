import { ActivityIndicator, Animated } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useScrollProps } from "@bacons/expo-router-top-tabs";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllByUser } from "@/libs/supabase/api/likes";
import { Box, Refresh, Separator } from "@/components/ui";
import { Post } from "@/features/post";

interface Page {
	likes: Post[];
	nextCursor: number;
}

const UserLikesScreen = () => {
	const { userId } = useLocalSearchParams();
	const props = useScrollProps();

	const query = useInfiniteQuery<Page>({
		queryKey: ["likes", userId],
		queryFn: ({ pageParam = 0 }) => getAllByUser({ userId, pageParam }),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	if (query.isLoading) return null;

	if (query.isError) return null;

	return (
		<Animated.FlatList
			data={query.data.pages.flatMap((page) => page.likes)}
			keyExtractor={(like) => like.id}
			renderItem={({ item: like }) => <Post post={like} />}
			ItemSeparatorComponent={() => <Separator height={0.5} />}
			ListFooterComponent={
				<Box pb={64}>
					{query.hasNextPage && <ActivityIndicator size="small" />}
				</Box>
			}
			refreshControl={<Refresh refetch={query.refetch} />}
			onEndReached={() => query.fetchNextPage()}
			{...props}
		/>
	);
};

export default UserLikesScreen;
