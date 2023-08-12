import { StyleSheet, View, FlatList, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getComments } from "@/libs/supabase/api";
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
		<View style={styles.container}>
			<FlatList
				data={comments}
				keyExtractor={(comment) => comment.id}
				renderItem={({ item: comment }) => <Comment comment={comment} />}
			/>
			<View style={styles.footer}>
				<CommentBar postId={postId} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	footer: {
		flexDirection: "row",
		minHeight: 120,
		padding: 16,
		paddingBottom: 64,
		borderStyle: "solid",
		borderColor: "#D9D9D9",
		borderTopWidth: 0.5,
	},
});

export default PostScreen;
