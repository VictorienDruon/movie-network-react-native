import { FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getComments } from "@/libs/supabase/api";
import { Box, HStack, Subtitle } from "@/components/ui";
import { Comment } from "@/features/post/components/Comment";
import CommentBar from "@/features/post/components/CommentBar";
import { Center } from "@/components/ui/center";

const PostScreen = () => {
	const { postId } = useLocalSearchParams() as { postId: string };

	const query = useQuery<Comment[], Error>({
		queryKey: ["comments", postId],
		queryFn: () => getComments(postId),
	});

	if (query.isLoading) return null;

	if (query.isError) return null;

	return (
		<Box flex={1}>
			{query.data.length === 0 ? (
				<Center>
					<Subtitle>No comment yet.</Subtitle>
				</Center>
			) : (
				<FlatList
					data={query.data}
					keyExtractor={(comment) => comment.id}
					renderItem={({ item: comment }) => <Comment comment={comment} />}
				/>
			)}

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
