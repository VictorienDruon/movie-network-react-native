import { Animated } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useScrollProps } from "@bacons/expo-router-top-tabs";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllByUser } from "@/libs/supabase/api/posts";
import { Box, Separator, Refresh, EmptyState } from "@/components/ui";
import { Post } from "@/features/post";
import PostSkeletons from "@/features/post/components/PostSkeletons";

interface Page {
	posts: Post[];
	nextCursor: number;
}

const PostsTab = () => {
	const { userId } = useLocalSearchParams() as { userId: string };
	const props = useScrollProps();

	const query = useInfiniteQuery<Page, Error>({
		queryKey: ["posts", userId],
		queryFn: ({ pageParam = 0 }) => getAllByUser(userId, pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	if (query.isLoading) return null;

	if (query.isError) return null;

	return (
		<Animated.FlatList
			data={query.data.pages.flatMap((page) => page.posts)}
			keyExtractor={(post) => post.id}
			renderItem={({ item: post }) => <Post post={post} />}
			ItemSeparatorComponent={() => <Separator />}
			ListEmptyComponent={
				<EmptyState>This user has not posted any posts yet.</EmptyState>
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

export default PostsTab;
