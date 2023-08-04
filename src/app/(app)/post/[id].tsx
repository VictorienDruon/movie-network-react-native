import { useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	ScrollView,
	TouchableHighlight,
	FlatList,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { supabase } from "@/libs/supabase";
import { ArrowLeft } from "lucide-react-native";
import PostItem from "@/features/post";
import CommentItem from "@/features/post/components/CommentItem";
import Post from "@/features/post/types/Post";
import Comment from "@/features/post/types/Comment";

const PostScreen = () => {
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [post, setPost] = useState<Post>();
	const [comments, setComments] = useState<Comment[]>();
	const { goBack } = useNavigation();
	const { id } = useLocalSearchParams();

	const getPostAndComments = async () => {
		try {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			const {
				data: { likes, comments, ...rest },
				error,
			} = await supabase
				.from("posts")
				.select(
					"*, author: profiles(*), likes(user_id), comments(*, author: profiles(*))"
				)
				.eq("id", id)
				.single();
			if (error) throw new Error("Error getting post: " + error.message);
			const user_has_liked_post = !!likes.find(
				(like) => like.user_id === session.user.id
			);
			const post = {
				...rest,
				user_has_liked_post,
			};
			setPost(post);
			setComments(comments);
		} catch (err) {
			console.error(err.message);
		} finally {
			setIsLoaded(true);
		}
	};

	useEffect(() => {
		getPostAndComments();

		const channel = supabase
			.channel("realtime-comments")
			.on(
				"postgres_changes",
				{
					event: "INSERT",
					schema: "public",
					table: "comments",
				},
				async (payload) => {
					const { data: author, error } = await supabase
						.from("profiles")
						.select("*")
						.eq("id", payload.new.user_id)
						.single();
					const newComment = { ...payload.new, author } as Comment;
					setComments((prevComments) => [...prevComments, newComment]);
				}
			)
			.on(
				"postgres_changes",
				{
					event: "DELETE",
					schema: "public",
					table: "comments",
				},
				(payload) =>
					setComments((prevComments) =>
						prevComments.filter((comment) => comment.id !== payload.old.id)
					)
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, []);

	if (!isLoaded) return null;

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableHighlight
					style={[styles.button, { backgroundColor: "#ECECEC" }]}
					underlayColor="#C0C0C0"
					onPress={goBack}
				>
					<ArrowLeft color="#8D8D8E" size={16} />
				</TouchableHighlight>
			</View>
			<FlatList
				data={comments}
				keyExtractor={(comment) => comment.id}
				ListHeaderComponent={() => <PostItem post={post} />}
				renderItem={({ item: comment }) => <CommentItem comment={comment} />}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 48,
		backgroundColor: "#fff",
	},
	header: {
		padding: 16,
	},
	button: {
		display: "flex",
		width: 40,
		height: 40,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		marginLeft: 8,
	},
});

export default PostScreen;
