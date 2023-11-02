import { Animated } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostsByUser } from "@/libs/supabase/api/posts";
import { EmptyState, RefreshControl } from "@/components/commons";
import { Box, Separator } from "@/components/ui";
import PostCard from "@/features/post-card";
import PostCardSkeleton from "@/features/post-card/components/PostCardSkeleton";

const PostsTab = ({ userId }: { userId: string }) => {
	const query = useInfiniteQuery({
		queryKey: ["posts", userId],
		queryFn: ({ pageParam = 0 }) => getPostsByUser(userId, pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	if (query.isLoading) return <PostCardSkeleton />;

	if (query.isError)
		return <EmptyState>An error occured, please try again later.</EmptyState>;

	return (
		<Animated.FlatList
			data={query.data.pages.flatMap((page) => page.results)}
			keyExtractor={(post) => post.id}
			renderItem={({ item: post }) => <PostCard post={post} />}
			ItemSeparatorComponent={() => <Separator />}
			ListEmptyComponent={
				<EmptyState>This users has not posted anything yet.</EmptyState>
			}
			ListFooterComponent={
				<Box pb={64}>{query.hasNextPage && <PostCardSkeleton />}</Box>
			}
			refreshControl={<RefreshControl refetch={query.refetch} />}
			onEndReached={() => query.fetchNextPage()}
			showsVerticalScrollIndicator={false}
		/>
	);
};

export default PostsTab;
