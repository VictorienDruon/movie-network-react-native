import { useState } from "react";
import { Link } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase";
import { toggleLike } from "@/libs/supabase/api";
import { Box, Icon } from "@/components/ui";
import CommentBar from "./CommentBar";
import { Pressable } from "react-native";

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
						ml="sm"
						backgroundColor="gray4"
						borderRadius={100}
					>
						<Icon name="MessageSquare" color="#8D8D8E" size="sm" />
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
					ml="sm"
					backgroundColor="error4"
					borderRadius={100}
				>
					<Icon name="Heart" color="#E95568" size="sm" fill={isLiked} />
				</Box>
			</Pressable>
		</Box>
	);
};

export default Actions;
