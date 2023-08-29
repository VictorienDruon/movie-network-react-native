import { Animated } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useScrollProps } from "@bacons/expo-router-top-tabs";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAll } from "@/libs/supabase/api/likes";
import { Box, EmptyState, Refresh, Separator } from "@/components/ui";
import { Post } from "@/features/post";
import PostSkeletons from "@/features/post/components/PostSkeletons";

interface Page {
	likes: Post[];
	nextCursor: number;
}

const LikesTab = () => {
	const { userId } = useLocalSearchParams() as { userId: string };
	const props = useScrollProps();

	const query = useInfiniteQuery<Page, Error>({
		queryKey: ["likes", userId],
		queryFn: ({ pageParam = 0 }) => getAll(userId, pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	if (query.isLoading) return null;

	if (query.isError) return null;

	return (
		<Animated.FlatList
			data={query.data.pages.flatMap((page) => page.likes)}
			keyExtractor={(like) => like.id}
			renderItem={({ item: like }) => <Post post={like} />}
			ItemSeparatorComponent={() => <Separator />}
			ListEmptyComponent={
				<EmptyState>This user has not liked any posts yet.</EmptyState>
			}
			ListFooterComponent={
				<Box pb={64}>{query.hasNextPage && <PostSkeletons />}</Box>
			}
			refreshControl={<Refresh refetch={query.refetch} />}
			onEndReached={() => query.fetchNextPage()}
			showsVerticalScrollIndicator={false}
			{...props}
		/>
	);
};

export default LikesTab;
