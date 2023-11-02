import { Animated } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getLikes } from "@/libs/supabase/api/likes";
import { EmptyState, RefreshControl } from "@/components/commons";
import { Box, Separator } from "@/components/ui";
import PostCard from "@/features/post-card";
import PostCardSkeleton from "@/features/post-card/components/PostCardSkeleton";

const LikesTab = ({ userId }: { userId: string }) => {
	const query = useInfiniteQuery({
		queryKey: ["likes", userId],
		queryFn: ({ pageParam = 0 }) => getLikes(userId, pageParam),
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
				<EmptyState>This user has not liked anything yet.</EmptyState>
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

export default LikesTab;
