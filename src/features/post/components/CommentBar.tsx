import { TextInput, Pressable } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentSchema } from "@/utils/schema";
import { supabase } from "@/libs/supabase";
import { addComment } from "@/libs/supabase/api";
import { Box, Text } from "@/components/ui";
import { Theme } from "@/providers/theme/styles/restyleThemes";
import { useTheme } from "@shopify/restyle";

const CommentBar = ({ postId }: { postId: string }) => {
	const { colors } = useTheme<Theme>();
	const queryClient = useQueryClient();
	const { control, handleSubmit, reset } = useForm<CommentSchema>({
		resolver: zodResolver(CommentSchema),
	});
	const commentMutation = useMutation(addComment, {
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["comments", postId] });
		},
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
					backgroundColor="neutral-3"
				>
					<TextInput
						placeholder="Add a comment..."
						placeholderTextColor={colors["neutral-9"]}
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
							{}
							<Box px={16} py={8}>
								<Text variant="body" fontWeight="600" color="blue-11">
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
