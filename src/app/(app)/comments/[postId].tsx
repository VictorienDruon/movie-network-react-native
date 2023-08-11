import { StyleSheet, View, FlatList, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getPostWithComments } from "@/libs/supabase/api";
import { Post } from "@/features/post";
import { Comment } from "@/features/post/components/Comment";
import CommentBar from "@/features/post/components/CommentBar";

interface Data {
	post: Post;
	comments: Comment[];
}

const PostScreen = () => {
	const { postId } = useLocalSearchParams() as { postId: string };

	const { isLoading, isError, data, error } = useQuery<Data, Error>({
		queryKey: ["post", postId],
		queryFn: () => getPostWithComments(postId),
	});

	if (isLoading) return <Text>Loading...</Text>;

	if (isError) return <Text>Error: {error.message}</Text>;

	return (
		<View style={styles.container}>
			<FlatList
				data={data.comments}
				keyExtractor={(comment) => comment.id}
				renderItem={({ item: comment }) => <Comment comment={comment} />}
				ListFooterComponent={<CommentBar postId={postId} />}
				ListFooterComponentStyle={{ padding: 16 }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
});

export default PostScreen;
