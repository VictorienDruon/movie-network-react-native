import { useState } from "react";
import {
	View,
	TextInput,
	TouchableHighlight,
	StyleSheet,
	Text,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { MessageSquare, Heart } from "lucide-react-native";
import { supabase } from "@/libs/supabase";
import { CommentSchema } from "@/utils/schema";

interface ActionsProps {
	postId: string;
	userHasLikedPost: boolean;
}

const Actions = ({ postId, userHasLikedPost }: ActionsProps) => {
	const [isLikeLoading, setIsLikeLoading] = useState(false);
	const [isLiked, setIsLiked] = useState(userHasLikedPost);
	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CommentSchema>({
		resolver: zodResolver(CommentSchema),
	});

	const handleCommentSubmit = handleSubmit(
		async ({ comment }: CommentSchema) => {
			try {
				const {
					data: { user },
				} = await supabase.auth.getUser();
				if (user) {
					const { error } = await supabase
						.from("comments")
						.insert({ content: comment, post_id: postId, user_id: user.id });
					if (error)
						throw new Error("Error inserting comment: " + error.message);
					reset();
				}
			} catch (err) {
				console.error(err);
			}
		}
	);

	const handleLikePress = async () => {
		try {
			setIsLikeLoading(true);
			const currentIsLiked = isLiked;
			// Optimistic update
			setIsLiked((isLiked) => !isLiked);
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (user) {
				if (currentIsLiked) {
					const { error } = await supabase
						.from("likes")
						.delete()
						.match({ post_id: postId, user_id: user.id });
					if (error) {
						// Revert optimistic update
						setIsLiked(currentIsLiked);
						throw new Error("Error deleting like: " + error.message);
					}
				} else {
					const { error } = await supabase
						.from("likes")
						.insert({ post_id: postId, user_id: user.id });
					if (error) {
						// Revert optimistic update
						setIsLiked(currentIsLiked);
						throw new Error("Error inserting like: " + error.message);
					}
				}
			}
		} catch (err) {
			console.error(err);
		} finally {
			setIsLikeLoading(false);
		}
	};

	return (
		<View>
			<View style={styles.actions}>
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							placeholder="Add a comment..."
							onBlur={onBlur}
							onChangeText={onChange}
							onSubmitEditing={handleCommentSubmit}
							returnKeyType="send"
							value={value}
							style={styles.textInput}
						/>
					)}
					name="comment"
				/>

				<Link
					href={{
						pathname: "/(app)/post/[id]",
						params: { id: postId },
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
					disabled={isLikeLoading}
					onPress={handleLikePress}
				>
					<Heart
						color="#E95568"
						fill={isLiked ? "#E95568" : "none"}
						size={16}
					/>
				</TouchableHighlight>
			</View>

			{errors.comment && (
				<Text style={styles.errorText}>{errors.comment.message}</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	actions: {
		flexDirection: "row",
		marginBottom: 10,
	},
	textInput: {
		flex: 1,
		height: 40,
		paddingHorizontal: 20,
		backgroundColor: "#ECECEC",
		borderRadius: 100,
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
	errorText: {
		color: "red",
	},
});

export default Actions;
