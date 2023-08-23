import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAll } from "@/libs/supabase/api/comments";
import { Box, Subtitle, Center } from "@/components/ui";
import { Comment } from "@/features/comment";
import CommentBar from "@/features/post/components/CommentBar";

interface Page {
	comments: Comment[];
	nextCursor: number;
}

const CommentsScreen = () => {
	const [comments, setComments] = useState<Comment[]>([]);
	const { id: postId } = useLocalSearchParams() as { id: string };

	const query = useInfiniteQuery<Page, Error>({
		queryKey: ["comments", postId],
		queryFn: ({ pageParam }) => getAll({ postId, pageParam }),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	useEffect(() => {
		if (query.data?.pages) {
			const newPage = query.data.pages[query.data.pages.length - 1];
			const newComments = newPage.comments;
			setComments((prevComments) => [...prevComments, ...newComments]);
		}
	}, [query.data]);

	if (query.isLoading) return null;

	if (query.isError) return null;

	return (
		<Box flex={1} pb={48}>
			{comments.length ? (
				<FlatList
					data={comments}
					keyExtractor={(comment) => comment.id}
					renderItem={({ item: comment }) => <Comment comment={comment} />}
					ListFooterComponent={
						<Box pb={64}>
							{query.hasNextPage && <ActivityIndicator size="small" />}
						</Box>
					}
					onEndReached={() => query.fetchNextPage()}
				/>
			) : (
				<Center>
					<Subtitle>No comment yet.</Subtitle>
				</Center>
			)}

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
