import { Animated } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommentsByUser } from "@/libs/supabase/api/comments";
import { EmptyState, RefreshControl } from "@/components/commons";
import { Box } from "@/components/ui";
import CommentCard from "@/features/comment-card";
import CommentCardSkeleton from "@/features/comment-card/components/CommentCardSkeleton";

const CommentsTab = ({ userId }: { userId: string }) => {
	const query = useInfiniteQuery({
		queryKey: ["comments", userId],
		queryFn: ({ pageParam = 0 }) => getCommentsByUser(userId, pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	if (query.isLoading) return <CommentCardSkeleton />;

	if (query.isError)
		return <EmptyState>An error occured, please try again later.</EmptyState>;

	return (
		<Animated.FlatList
			data={query.data.pages.flatMap((page) => page.results)}
			keyExtractor={(comment) => comment.id}
			renderItem={({ item: comment }) => <CommentCard comment={comment} />}
			ListEmptyComponent={
				<EmptyState>This user has not commented anything yet.</EmptyState>
			}
			ListFooterComponent={
				<Box pb={64}>{query.hasNextPage && <CommentCardSkeleton />}</Box>
			}
			refreshControl={<RefreshControl refetch={query.refetch} />}
			onEndReached={() => query.fetchNextPage()}
			showsVerticalScrollIndicator={false}
		/>
	);
};

export default CommentsTab;
