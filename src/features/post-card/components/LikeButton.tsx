import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase";
import { NewLike, toggle } from "@/libs/supabase/api/likes";
import { RoundButton } from "@/components/ui";

interface LikeButtonProps {
	postId: string;
	userHasLikedPost: boolean;
}

const LikeButton = ({ postId, userHasLikedPost }: LikeButtonProps) => {
	const queryClient = useQueryClient();

	const mutation = useMutation<NewLike, Error, NewLike>(toggle, {
		onSuccess: ({ user_id, post_id }) => {
			queryClient.invalidateQueries({
				queryKey: ["feed"],
			});
			queryClient.invalidateQueries({
				queryKey: ["posts", user_id],
			});
			queryClient.invalidateQueries({
				queryKey: ["likes", user_id],
			});
			queryClient.invalidateQueries({
				queryKey: ["post", post_id],
			});
		},
	});

	const handleLikePress = async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		mutation.mutate({
			post_id: postId,
			user_id: user.id,
			userHasLikedPost,
		});
	};

	return (
		<RoundButton
			variant="outline"
			size="sm"
			icon="Heart"
			fill={userHasLikedPost}
			disabled={mutation.isLoading}
			onPress={handleLikePress}
		/>
	);
};

export default LikeButton;
