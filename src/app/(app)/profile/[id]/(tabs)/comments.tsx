import { Animated } from "react-native";
import { useScrollProps } from "@bacons/expo-router-top-tabs";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllByUser } from "@/libs/supabase/api/comments";
import useFocus from "@/hooks/useFocus";
import { EmptyState, RefreshControl } from "@/components/common";
import { Box } from "@/components/ui";
import { Comment } from "@/features/comment";
import CommentSkeleton from "@/features/comment/components/CommentSkeleton";
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
			renderItem={({ item: comment }) => <Comment comment={comment} />}
			ListEmptyComponent={
				<EmptyState>This user has not posted any comments yet.</EmptyState>
			}
			ListFooterComponent={
				<Box pb={64}>{query.hasNextPage && <CommentSkeleton />}</Box>
			}
			refreshControl={<RefreshControl refetch={query.refetch} />}
			onEndReached={() => query.fetchNextPage()}
			showsVerticalScrollIndicator={false}
			{...props}
		/>
	);
};

export default CommentsTab;
