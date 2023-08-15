import { FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getComments } from "@/libs/supabase/api";
import { Box, Text } from "@/components/ui";
import { Comment } from "@/features/post/components/Comment";
import CommentBar from "@/features/post/components/CommentBar";

const PostScreen = () => {
	const { postId } = useLocalSearchParams() as { postId: string };

	const query = useQuery<Comment[], Error>({
		queryKey: ["post", postId],
		queryFn: () => getComments(postId),
	});

	if (query.isLoading) return <Text variant="header">Loading...</Text>;

	if (query.isError)
		return <Text variant="header">Error: {query.error.message}</Text>;

	return (
		<Box flex={1}>
			<FlatList
				data={query.data}
				keyExtractor={(comment) => comment.id}
				renderItem={({ item: comment }) => <Comment comment={comment} />}
			/>

			<Box
				flexDirection="row"
				p={16}
				pb={48}
				borderTopWidth={0.5}
				borderTopColor="neutral-6"
			>
				<CommentBar postId={postId} />
			</Box>
		</Box>
	);
};

export default PostScreen;
