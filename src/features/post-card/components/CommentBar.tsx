import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentSchema } from "@/utils/schema";
import { supabase } from "@/libs/supabase";
import {
	createComment,
	handleCommentSuccess,
} from "@/libs/supabase/api/comments";
import { HStack, Input, Button } from "@/components/ui";

const CommentBar = ({ postId }: { postId: string }) => {
	const queryClient = useQueryClient();

	const { control, formState, handleSubmit, reset } = useForm<CommentSchema>({
		resolver: zodResolver(CommentSchema),
	});

	const mutation = useMutation(createComment, {
		onSuccess: (comment) => handleCommentSuccess(comment, queryClient),
	});

	const handleCommentSubmit = handleSubmit(
		async ({ content }: CommentSchema) => {
			reset();
			const {
				data: { user },
			} = await supabase.auth.getUser();
			mutation.mutate({ content, post_id: postId, user_id: user.id });
		}
	);

	return (
		<HStack
			flex={1}
			alignItems="center"
			height={40}
			p={8}
			pl={16}
			space={8}
			bg="neutral-3"
			borderRadius="xl"
		>
			<Controller
				name="content"
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<Input
						flex={1}
						placeholder="Add a comment..."
						color="neutral-12"
						placeholderTextColor="neutral-9"
						onChangeText={onChange}
						onBlur={onBlur}
						value={value}
					/>
				)}
			/>

			{formState.isValid && (
				<Button rightIcon="Send" onPress={handleCommentSubmit} />
			)}
		</HStack>
	);
};

export default CommentBar;
