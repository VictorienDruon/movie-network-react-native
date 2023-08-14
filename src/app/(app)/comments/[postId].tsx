import { FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getComments } from "@/libs/supabase/api";
import { Box, Text } from "@/components/ui";
import { Comment } from "@/features/post/components/Comment";
import CommentBar from "@/features/post/components/CommentBar";

const PostScreen = () => {
	const { postId } = useLocalSearchParams() as { postId: string };

	const {
		isLoading,
		isError,
		data: comments,
		error,
	} = useQuery<Comment[], Error>({
		queryKey: ["post", postId],
		queryFn: () => getComments(postId),
	});

	if (isLoading) return <Text>Loading...</Text>;

	if (isError) return <Text>Error: {error.message}</Text>;

	return (
		<Box flex={1} backgroundColor="mainBackground">
			<FlatList
				data={comments}
				keyExtractor={(comment) => comment.id}
				renderItem={({ item: comment }) => <Comment comment={comment} />}
			/>

			<Box
				flexDirection="row"
				p="md"
				pb="xl"
				borderTopWidth={0.5}
				borderTopColor="gray6"
			>
				<CommentBar postId={postId} />
			</Box>
		</Box>
	);
};

export default PostScreen;
