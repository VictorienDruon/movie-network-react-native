import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase";
import { NewLike, toggle } from "@/libs/supabase/api/likes";
import { HStack, Icon } from "@/components/ui";
import CommentBar from "@/features/post/components/CommentBar";

interface ActionsProps {
	postId: string;
	userHasLikedPost: boolean;
}

const Actions = ({ postId, userHasLikedPost }: ActionsProps) => {
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
		<HStack space={8}>
			<CommentBar postId={postId} />

			<Link
				href={{
					pathname: "/(app)/post/[id]/comments",
					params: { id: postId },
				}}
				asChild
			>
				<TouchableOpacity>
					<HStack
						space={0}
						justifyContent="center"
						alignItems="center"
						width={40}
						height={40}
						backgroundColor="neutral-3"
						borderRadius="full"
					>
						<Icon name="MessageSquare" size={16} color="neutral-9" />
					</HStack>
				</TouchableOpacity>
			</Link>

			<TouchableOpacity disabled={mutation.isLoading} onPress={handleLikePress}>
				<HStack
					space={0}
					justifyContent="center"
					alignItems="center"
					width={40}
					height={40}
					backgroundColor="primary-3"
					borderRadius="full"
				>
					<Icon
						name="Heart"
						size={16}
						color="primary-9"
						fill={userHasLikedPost}
					/>
				</HStack>
			</TouchableOpacity>
		</HStack>
	);
};

export default Actions;
