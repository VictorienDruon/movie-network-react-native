import { Animated } from "react-native";
import { useScrollProps } from "@bacons/expo-router-top-tabs";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllByUser } from "@/libs/supabase/api/comments";
import useFocus from "@/hooks/useFocus";
import { EmptyState, RefreshControl } from "@/components/commons";
import { Box } from "@/components/ui";
import CommentCard from "@/features/comment-card";
import Comment from "@/features/comment-card/types/Comment"
import CommentCardSkeleton from "@/features/comment-card/components/CommentCardSkeleton";
import { useParams } from "./_layout";

interface CommentsPage {
	comments: Comment[];
	nextCursor: number;
}

const CommentsTab = () => {
	const { userId } = useParams();
	const isFocused = useFocus();
	const props = useScrollProps();

	const query = useInfiniteQuery<CommentsPage, Error>({
		queryKey: ["comments", userId],
		queryFn: ({ pageParam = 0 }) => getAllByUser(userId, pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		enabled: isFocused,
	});

	if (query.isLoading) return null;

	if (query.isError) return null;

	return (
		<Animated.FlatList
			data={query.data.pages.flatMap((page) => page.comments)}
			keyExtractor={(comment) => comment.id}
			renderItem={({ item: comment }) => <CommentCard comment={comment} />}
			ListEmptyComponent={
				<EmptyState>This user has not posted any comments yet.</EmptyState>
			}
			ListFooterComponent={
				<Box pb={64}>{query.hasNextPage && <CommentCardSkeleton />}</Box>
			}
			refreshControl={<RefreshControl refetch={query.refetch} />}
			onEndReached={() => query.fetchNextPage()}
			showsVerticalScrollIndicator={false}
			{...props}
		/>
	);
};

export default CommentsTab;
