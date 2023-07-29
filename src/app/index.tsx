import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { supabase } from "@/libs/supabase";

const HomePage = () => {
	const [posts, setPosts] = useState([]);

	const getPosts = async () => {
		try {
			const { data: posts, error } = await supabase.from("posts").select();
			if (error) throw error;
			setPosts(posts);
		} catch (err) {
			console.log(err.message);
		}
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.main}>
				<Text style={styles.title}>Posts</Text>
				{posts.map((post) => (
					<Text key={post.id} style={styles.subtitle}>
						{JSON.stringify(post)}
					</Text>
				))}
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

export default HomePage;
