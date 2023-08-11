import { View, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { getRelativeDate } from "@/utils/dates";
import Actions from "./components/Actions";
import { Database } from "@/libs/supabase/types/database.types";

export type Post = Database["public"]["Tables"]["posts"]["Row"] & {
	author: Database["public"]["Tables"]["profiles"]["Row"];
	user_has_liked_post: boolean;
};

export const Post = ({ post }: { post: Post }) => {
	const { id, content, created_at, author, user_has_liked_post } = post;

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image style={styles.avatar} source={author.avatar_url} />
				<View style={styles.main}>
					<View style={styles.info}>
						<Text style={styles.authorName}>{author.name}</Text>
						<Text style={styles.subtitle}>Some subtitle</Text>
					</View>
					<Text style={styles.createdAt}>{getRelativeDate(created_at)}</Text>
				</View>
			</View>
			<View style={styles.contentContainer}>
				<Text style={styles.content}>{content}</Text>
			</View>
			<Actions postId={id} userHasLikedPost={user_has_liked_post} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		padding: 16,
		borderStyle: "solid",
		borderColor: "#D9D9D9",
		borderBottomWidth: 0.5,
	},
	header: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 25,
	},
	main: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	info: {
		paddingLeft: 8,
	},
	authorName: {
		fontSize: 16,
		fontWeight: "bold",
	},
	subtitle: {
		fontSize: 14,
		color: "#929292",
	},
	createdAt: {
		fontSize: 12,
		color: "#929292",
	},
	contentContainer: {
		marginVertical: 10,
	},
	content: {
		fontSize: 16,
	},
});
