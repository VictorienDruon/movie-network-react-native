import { Animated } from "react-native";
import { useScrollProps } from "@bacons/expo-router-top-tabs";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostsByUser } from "@/libs/supabase/api/posts";
import useFocus from "@/hooks/useFocus";
import { EmptyState, RefreshControl } from "@/components/commons";
import { Box, Separator } from "@/components/ui";
import PostCard from "@/features/post-card";
import PostCardSkeleton from "@/features/post-card/components/PostCardSkeleton";
import { useParams } from "./_layout";

const PostsTab = () => {
	const { userId } = useParams();
	const isFocused = useFocus();
	const props = useScrollProps();

	const query = useInfiniteQuery({
		queryKey: ["posts", userId],
		queryFn: ({ pageParam = 0 }) => getPostsByUser(userId, pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		enabled: isFocused,
	});

	if (query.isLoading) return null;

	if (query.isError) return null;

	return (
		<Animated.FlatList
			data={query.data.pages.flatMap((page) => page.results)}
			keyExtractor={(post) => post.id}
			renderItem={({ item: post }) => <PostCard post={post} />}
			ItemSeparatorComponent={() => <Separator />}
			ListEmptyComponent={
				<EmptyState>This user has not posted any posts yet.</EmptyState>
			}
			ListFooterComponent={
				<Box pb={64}>{query.hasNextPage && <PostCardSkeleton />}</Box>
			}
			refreshControl={<RefreshControl refetch={query.refetch} />}
			onEndReached={() => query.fetchNextPage()}
			showsVerticalScrollIndicator={false}
			{...props}
		/>
	);
};

export default PostsTab;
