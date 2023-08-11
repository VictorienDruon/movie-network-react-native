import { useState } from "react";
import { View, TouchableHighlight, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase";
import { toggleLike } from "@/libs/supabase/api";
import { MessageSquare, Heart } from "lucide-react-native";
import CommentBar from "./CommentBar";

interface ActionsProps {
	postId: string;
	userHasLikedPost: boolean;
}

const Actions = ({ postId, userHasLikedPost }: ActionsProps) => {
	const [isLiked, setIsLiked] = useState<boolean>(userHasLikedPost);
	const likeMutation = useMutation(toggleLike);

	const handleLikePress = async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		likeMutation.mutate({
			post_id: postId,
			user_id: user.id,
			userHasLikedPost: isLiked,
		});
		setIsLiked((prev) => !prev);
	};

	return (
		<View style={styles.container}>
			<CommentBar postId={postId} />

			<Link
				href={{
					pathname: "/(app)/comments/[postId]",
					params: { postId },
				}}
				style={[styles.button, { backgroundColor: "#ECECEC" }]}
				asChild
			>
				<TouchableHighlight underlayColor="#C0C0C0">
					<MessageSquare color="#8D8D8E" size={16} />
				</TouchableHighlight>
			</Link>

			<TouchableHighlight
				style={[styles.button, { backgroundColor: "#F6DBE0" }]}
				underlayColor="#FFC0CB"
				disabled={likeMutation.isLoading}
				onPress={handleLikePress}
			>
				<Heart color="#E95568" fill={isLiked ? "#E95568" : "none"} size={16} />
			</TouchableHighlight>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
	},
	button: {
		display: "flex",
		width: 40,
		height: 40,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 100,
		marginLeft: 8,
	},
});

export default Actions;
