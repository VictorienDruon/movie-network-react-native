import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, RefreshControl, FlatList } from "react-native";
import { supabase } from "@/libs/supabase";
import PostItem from "@/features/post";
import Post from "@/features/post/types/Post";

const HomeScreen = () => {
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [refreshing, setRefreshing] = useState<boolean>(false);
	const [posts, setPosts] = useState<Post[]>([]);

	const getPosts = async () => {
		try {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			const { data, error } = await supabase
				.from("posts")
				.select("*, author: profiles(*), likes(user_id)")
				.order("created_at", { ascending: false });
			if (error) throw new Error("Error getting posts: " + error.message);
			const posts = data.map((post) => ({
				...post,
				user_has_liked_post: !!post.likes.find(
					(like) => like.user_id === session.user.id
				),
			}));
			setPosts(posts);
		} catch (err) {
			console.error(err.message);
		} finally {
			setIsLoaded(true);
		}
	};

	const handleRefresh = useCallback(() => {
		setRefreshing(true);
		getPosts().then(() => setRefreshing(false));
	}, []);

	useEffect(() => {
		getPosts();
	}, []);

	if (!isLoaded) return null;

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Posts</Text>
			</View>
			<FlatList
				data={posts}
				keyExtractor={(post) => post.id}
				renderItem={({ item: post }) => <PostItem post={post} />}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
				}
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
	title: {
		fontSize: 32,
		fontWeight: "bold",
	},
});

export default HomeScreen;
