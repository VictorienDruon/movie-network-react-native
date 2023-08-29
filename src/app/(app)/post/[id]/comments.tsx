import { FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllByPost } from "@/libs/supabase/api/comments";
import { Box, EmptyState, ErrorState } from "@/components/ui";
import { Comment } from "@/features/comment";
import CommentBar from "@/features/post/components/CommentBar";
import CommentSkeletons from "@/features/comment/components/CommentSkeletons";

interface Page {
	comments: Comment[];
	nextCursor: number;
}

const CommentsScreen = () => {
	const { id: postId } = useLocalSearchParams() as { id: string };

	const query = useInfiniteQuery<Page, Error>({
		queryKey: ["comments", postId],
		queryFn: ({ pageParam = 0 }) => getAllByPost(postId, pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	if (query.isLoading) return <CommentSkeletons count={2} />;

	if (query.isError) return <ErrorState retry={query.refetch} />;

	return (
		<Box flex={1} pb={48}>
			<FlatList
				data={query.data.pages.flatMap((page) => page.comments)}
				keyExtractor={(comment) => comment.id}
				renderItem={({ item: comment }) => <Comment comment={comment} />}
				ListEmptyComponent={<EmptyState>There are no comments yet.</EmptyState>}
				ListFooterComponent={
					<Box pb={64}>{query.hasNextPage && <CommentSkeletons />}</Box>
				}
				onEndReached={() => query.fetchNextPage()}
				showsVerticalScrollIndicator={false}
			/>

			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={116}
			>
				<Box
					justifyContent="center"
					height={56}
					px={28}
					borderTopWidth={0.5}
					borderColor="neutral-6"
				>
					<CommentBar postId={postId} />
				</Box>
			</KeyboardAvoidingView>
		</Box>
	);
};

export default CommentsScreen;
