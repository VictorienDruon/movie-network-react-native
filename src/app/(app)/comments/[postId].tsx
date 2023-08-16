import { FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getComments } from "@/libs/supabase/api";
import { Box, HStack, Heading } from "@/components/ui";
import { Comment } from "@/features/post/components/Comment";
import CommentBar from "@/features/post/components/CommentBar";

const PostScreen = () => {
	const { postId } = useLocalSearchParams() as { postId: string };

	const query = useQuery<Comment[], Error>({
		queryKey: ["post", postId],
		queryFn: () => getComments(postId),
	});

	if (query.isLoading) return <Heading>Loading...</Heading>;

	if (query.isError) return <Heading>Error: {query.error.message}</Heading>;

	return (
		<Box flex={1}>
			<FlatList
				data={query.data}
				keyExtractor={(comment) => comment.id}
				renderItem={({ item: comment }) => <Comment comment={comment} />}
			/>

			<HStack
				space={0}
				p={16}
				pb={48}
				borderTopWidth={0.5}
				borderTopColor="neutral-6"
			>
				<CommentBar postId={postId} />
			</HStack>
		</Box>
	);
};

export default PostScreen;
