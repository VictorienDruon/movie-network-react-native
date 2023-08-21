import { TouchableOpacity } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentSchema } from "@/utils/schema";
import { supabase } from "@/libs/supabase";
import { addComment } from "@/libs/supabase/api";
import { Box, HStack, Body, Input } from "@/components/ui";

const CommentBar = ({ postId }: { postId: string }) => {
	const queryClient = useQueryClient();

	const mutation = useMutation(addComment, {
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["comments", postId] });
		},
	});

	const { control, formState, handleSubmit, reset } = useForm<CommentSchema>({
		resolver: zodResolver(CommentSchema),
	});

	const handleCommentSubmit = handleSubmit(
		async ({ content }: CommentSchema) => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			mutation.mutate({ content, post_id: postId, user_id: user.id });
			reset();
		}
	);

	return (
		<Controller
			name="content"
			control={control}
			render={({ field: { onChange, onBlur, value } }) => (
				<HStack
					space={0}
					flex={1}
					alignItems="flex-end"
					maxHeight={100}
					borderRadius="lg"
					backgroundColor="neutral-3"
				>
					<Input
						placeholder="Add a comment..."
						color="neutral-12"
						placeholderTextColor="neutral-9"
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						multiline
						style={{
							flex: 1,
							paddingTop: 10,
							paddingBottom: 10,
							paddingHorizontal: 16,
						}}
					/>
					{formState.isValid && (
						<TouchableOpacity
							disabled={mutation.isLoading}
							onPress={handleCommentSubmit}
						>
							<Box pr={12} py={8}>
								<Body fontWeight="600" color="blue-11">
									Publish
								</Body>
							</Box>
						</TouchableOpacity>
					)}
				</HStack>
			)}
		/>
	);
};

export default CommentBar;
