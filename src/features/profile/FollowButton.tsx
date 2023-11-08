import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase";
import { handleFollowSuccess, toggleFollow } from "@/libs/supabase/api/follows";
import { Button } from "@/components/ui";

interface FollowButtonProps {
	id: string;
	isUserFollowing: boolean;
}

const FollowButton = ({ id, isUserFollowing }: FollowButtonProps) => {
	const queryClient = useQueryClient();

	const mutation = useMutation(toggleFollow, {
		onSuccess: (folllow) => handleFollowSuccess(folllow, queryClient),
	});

	const handleFollowPress = async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		mutation.mutate({
			follower_id: user.id,
			followed_id: id,
			is_user_following: isUserFollowing,
		});
	};

	return (
		<Button
			variant={isUserFollowing ? "secondaryOutline" : "secondary"}
			size="lg"
			disabled={mutation.isLoading}
			onPress={handleFollowPress}
		>
			{isUserFollowing ? "Unfollow" : "Follow"}
		</Button>
	);
};

export default FollowButton;
