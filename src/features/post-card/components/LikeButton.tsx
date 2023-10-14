import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase";
import { handleLikeSuccess, toggleLike } from "@/libs/supabase/api/likes";
import { RoundButton } from "@/components/ui";

interface LikeButtonProps {
	postId: string;
	userHasLikedPost: boolean;
}

const LikeButton = ({ postId, userHasLikedPost }: LikeButtonProps) => {
	const queryClient = useQueryClient();

	const mutation = useMutation(toggleLike, {
		onSuccess: (like) => handleLikeSuccess(like, queryClient),
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
