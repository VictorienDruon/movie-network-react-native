import { Animated } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useScrollProps } from "@bacons/expo-router-top-tabs";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllByUser } from "@/libs/supabase/api/comments";
import { Box, EmptyState, Refresh } from "@/components/ui";
import { Comment } from "@/features/comment";
import CommentSkeletons from "@/features/comment/components/CommentSkeletons";

interface Page {
	comments: Comment[];
	nextCursor: number;
}

const CommentsTab = () => {
	const { userId } = useLocalSearchParams() as { userId: string };
	const props = useScrollProps();

	const query = useInfiniteQuery<Page, Error>({
		queryKey: ["comments", userId],
		queryFn: ({ pageParam = 0 }) => getAllByUser(userId, pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
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
				<Box pb={64}>{query.hasNextPage && <CommentSkeletons />}</Box>
			}
			refreshControl={<Refresh refetch={query.refetch} />}
			onEndReached={() => query.fetchNextPage()}
			showsVerticalScrollIndicator={false}
			{...props}
		/>
	);
};

export default CommentsTab;
