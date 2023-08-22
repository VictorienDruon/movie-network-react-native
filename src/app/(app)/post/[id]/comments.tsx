import { FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getAll } from "@/libs/supabase/api/comments";
import { Box, Subtitle, Center } from "@/components/ui";
import { Comment } from "@/features/comment";
import CommentBar from "@/features/post/components/CommentBar";

const CommentsScreen = () => {
	const { id } = useLocalSearchParams() as { id: string };

	const query = useQuery<Comment[], Error>({
		queryKey: ["comments", id],
		queryFn: () => getAll(id),
	});

	if (query.isLoading) return null;

	if (query.isError) return null;

	return (
		<Box flex={1} pb={48}>
			{query.data.length ? (
				<FlatList
					data={query.data}
					keyExtractor={(comment) => comment.id}
					renderItem={({ item: comment }) => <Comment comment={comment} />}
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
					<CommentBar postId={id} />
				</Box>
			</KeyboardAvoidingView>
		</Box>
	);
};

export default CommentsScreen;
