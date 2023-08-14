import { TextInput, Pressable } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentSchema } from "@/utils/schema";
import { supabase } from "@/libs/supabase";
import { addComment } from "@/libs/supabase/api";
import { Box, Text } from "@/components/ui";

const CommentBar = ({ postId }: { postId: string }) => {
	const queryClient = useQueryClient();
	const commentMutation = useMutation(addComment, {
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["comments", postId] });
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
				<Box
					flex={1}
					flexDirection="row"
					alignItems="flex-end"
					maxHeight={100}
					borderRadius={20}
					backgroundColor="gray4"
				>
					<TextInput
						placeholder="Add a comment..."
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						style={{
							flex: 1,
							paddingTop: 10,
							paddingBottom: 10,
							paddingLeft: 15,
						}}
						multiline
					/>
					{value && value.length <= 280 && (
						<Pressable onPress={handleCommentSubmit}>
							<Box px="md" py="sm">
								<Text variant="subtitle" fontWeight="600" color="info12">
									Publish
								</Text>
							</Box>
						</Pressable>
					)}
				</Box>
			)}
			name="content"
		/>
	);
};

export default CommentBar;
