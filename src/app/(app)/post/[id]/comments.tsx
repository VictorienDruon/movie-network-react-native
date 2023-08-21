import { FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getComments } from "@/libs/supabase/api";
import { Box, HStack, Subtitle, Center } from "@/components/ui";
import CommentBar from "@/components/CommentBar";
import { Comment } from "@/features/comment";

const CommentsScreen = () => {
	const { id } = useLocalSearchParams() as { id: string };

	const query = useQuery<Comment[], Error>({
		queryKey: ["comments", id],
		queryFn: () => getComments(id),
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
				<CommentBar postId={id} />
			</HStack>
		</Box>
	);
};

export default CommentsScreen;
