import { useState } from "react";
import { Pressable } from "react-native";
import { Link } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase";
import { toggleLike } from "@/libs/supabase/api";
import { Box, Icon } from "@/components/ui";
import CommentBar from "./CommentBar";

interface ActionsProps {
	postId: string;
	userHasLikedPost: boolean;
}

const Actions = ({ postId, userHasLikedPost }: ActionsProps) => {
	const [isLiked, setIsLiked] = useState<boolean>(userHasLikedPost);
	const likeMutation = useMutation(toggleLike);

	const handleLikePress = async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		likeMutation.mutate({
			post_id: postId,
			user_id: user.id,
			userHasLikedPost: isLiked,
		});
		setIsLiked((prev) => !prev);
	};

	return (
		<Box flexDirection="row">
			<CommentBar postId={postId} />

			<Link
				href={{
					pathname: "/(app)/comments/[postId]",
					params: { postId },
				}}
				asChild
			>
				<Pressable>
					<Box
						flexDirection="row"
						justifyContent="center"
						alignItems="center"
						width={40}
						height={40}
						ml={8}
						backgroundColor="neutral-3"
						borderRadius={100}
					>
						<Icon name="MessageSquare" size="sm" color="neutral-9" />
					</Box>
				</Pressable>
			</Link>

			<Pressable disabled={likeMutation.isLoading} onPress={handleLikePress}>
				<Box
					flexDirection="row"
					justifyContent="center"
					alignItems="center"
					width={40}
					height={40}
					ml={8}
					backgroundColor="primary-3"
					borderRadius={100}
				>
					<Icon name="Heart" size="sm" color="primary-9" fill={isLiked} />
				</Box>
			</Pressable>
		</Box>
	);
};

export default Actions;
