import { FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllByPost } from "@/libs/supabase/api/comments";
import { useSession } from "@/providers/session";
import { ErrorState, EmptyState } from "@/components/commons";
import { Avatar, Box, HStack } from "@/components/ui";
import CommentCard from "@/features/comment-card";
import Comment from "@/features/comment-card/types/Comment";
import CommentBar from "@/features/post-card/components/CommentBar";
import CommentCardSkeleton from "@/features/comment-card/components/CommentCardSkeleton";

interface CommentsPage {
	comments: Comment[];
	nextCursor: number;
}

const CommentsModal = () => {
	const { id: postId } = useLocalSearchParams<{ id: string }>();
	const { user } = useSession();

	const query = useInfiniteQuery<CommentsPage, Error>({
		queryKey: ["comments", postId],
		queryFn: ({ pageParam = 0 }) => getAllByPost(postId, pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	if (query.isError) return <ErrorState retry={query.refetch} />;

	return (
		<Box flex={1} pb={48}>
			{query.isLoading ? (
				<FlatList
					data={Array.from({ length: 4 }, (_, i) => i)}
					keyExtractor={(item) => item.toString()}
					renderItem={() => <CommentCardSkeleton />}
				/>
			) : (
				<FlatList
					data={query.data.pages.flatMap((page) => page.comments)}
					keyExtractor={(comment) => comment.id}
					renderItem={({ item: comment }) => <CommentCard comment={comment} />}
					ListEmptyComponent={
						<EmptyState>There are no comments yet.</EmptyState>
					}
					ListFooterComponent={
						<Box pb={64}>{query.hasNextPage && <CommentCardSkeleton />}</Box>
					}
					onEndReached={() => query.fetchNextPage()}
					showsVerticalScrollIndicator={false}
				/>
			)}

			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={116}
			>
				<HStack
					alignItems="center"
					height={56}
					px={16}
					space={8}
					borderTopWidth={0.5}
					borderColor="neutral-6"
				>
					{user && <Avatar size={40} src={user.avatar_url} alt={user.name} />}
					<CommentBar postId={postId} />
				</HStack>
			</KeyboardAvoidingView>
		</Box>
	);
};

export default CommentsModal;
