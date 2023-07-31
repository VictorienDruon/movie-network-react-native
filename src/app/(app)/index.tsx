import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { supabase } from "@/libs/supabase";
import { useAuth } from "@/providers/auth";

const HomeScreen = () => {
	const [isLoading, setIslLoading] = useState(false);
	const [posts, setPosts] = useState([]);
	const { signOut } = useAuth();

	useEffect(() => {
		const getPosts = async () => {
			try {
				const { data: posts, error } = await supabase.from("posts").select();
				if (error) throw new Error("Error getting posts: " + error.message);
				setPosts(posts);
			} catch (err) {
				console.error(err.message);
			}
		};
		getPosts();
	}, []);

	const handleSignOutPress = async () => {
		try {
			setIslLoading(true);
			signOut();
		} catch (err) {
			console.error(err);
		} finally {
			setIslLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.main}>
				<Text style={styles.title}>Posts</Text>
				{posts.map((post) => (
					<Text key={post.id} style={styles.subtitle}>
						{JSON.stringify(post)}
					</Text>
				))}
				<Button
					title="Sign Out"
					disabled={isLoading}
					onPress={handleSignOutPress}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		padding: 24,
	},
	main: {
		flex: 1,
		justifyContent: "center",
		maxWidth: 960,
		marginHorizontal: "auto",
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
	},
	subtitle: {
		fontSize: 12,
		color: "#38434D",
	},
});

export default HomeScreen;
