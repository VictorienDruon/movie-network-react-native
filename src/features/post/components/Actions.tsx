import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase";
import { toggleLike } from "@/libs/supabase/api";
import { HStack, Icon } from "@/components/ui";
import CommentBar from "@/components/CommentBar";

interface ActionsProps {
	postId: string;
	userHasLikedPost: boolean;
}

const Actions = ({ postId, userHasLikedPost }: ActionsProps) => {
	const [isLiked, setIsLiked] = useState<boolean>(userHasLikedPost);
	const mutation = useMutation(toggleLike, {
		onSuccess: () => {
			setIsLiked((prev) => !prev);
		},
	});

	const handleLikePress = async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		mutation.mutate({
			post_id: postId,
			user_id: user.id,
			userHasLikedPost: isLiked,
		});
	};

	return (
		<HStack space={8}>
			<CommentBar postId={postId} />

			<Link
				href={{
					pathname: "/(app)/comments/[postId]",
					params: { postId },
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
					<Icon name="Heart" size={16} color="primary-9" fill={isLiked} />
				</HStack>
			</TouchableOpacity>
		</HStack>
	);
};

export default Actions;
