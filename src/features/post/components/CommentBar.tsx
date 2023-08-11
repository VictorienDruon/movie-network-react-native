import { TextInput, View, Text, StyleSheet, Pressable } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentSchema } from "@/utils/schema";
import { supabase } from "@/libs/supabase";
import { addComment } from "@/libs/supabase/api";

const CommentBar = ({ postId }: { postId: string }) => {
	const queryClient = useQueryClient();
	const commentMutation = useMutation(addComment, {
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["post", postId] });
		},
	});
	const { control, handleSubmit, reset } = useForm<CommentSchema>({
		resolver: zodResolver(CommentSchema),
	});

	const handleCommentSubmit = handleSubmit(
		async ({ content }: CommentSchema) => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			commentMutation.mutate({ content, post_id: postId, user_id: user.id });
			reset();
		}
	);

	return (
		<Controller
			control={control}
			render={({ field: { onChange, onBlur, value } }) => (
				<View style={styles.container}>
					<TextInput
						placeholder="Add a comment..."
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						style={styles.textInput}
						multiline
					/>
					{value && value.length <= 280 && (
						<Pressable onPress={handleCommentSubmit} style={styles.button}>
							<Text style={styles.text}>Publish</Text>
						</Pressable>
					)}
				</View>
			)}
			name="content"
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		maxHeight: 100,
		borderRadius: 20,
		backgroundColor: "#ECECEC",
	},
	textInput: {
		flex: 1,
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 15,
	},
	button: {
		alignSelf: "stretch",
		justifyContent: "flex-end",
		paddingVertical: 10,
		paddingHorizontal: 15,
	},
	text: {
		color: "#4193EF",
		fontWeight: "600",
	},
});

export default CommentBar;
