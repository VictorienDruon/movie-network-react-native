import { View, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import Comment from "../types/Comment";
import { getRelativeDate } from "@/utils/dates";

const CommentItem = ({ comment }: { comment: Comment }) => {
	const { author, created_at, content } = comment;

	return (
		<View style={styles.container}>
			<Image style={styles.avatar} source={author.avatar_url} />
			<View style={styles.main}>
				<View style={styles.info}>
					<Text style={styles.authorName}>{author.name}</Text>
					<Text style={styles.content}>{content}</Text>
				</View>
				<Text style={styles.createdAt}>{getRelativeDate(created_at)}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		borderStyle: "solid",
		borderColor: "#929292",
		borderBottomWidth: 0.5,
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
	content: {
		fontSize: 14,
	},
	createdAt: {
		fontSize: 12,
		color: "#929292",
	},
});

export default CommentItem;
