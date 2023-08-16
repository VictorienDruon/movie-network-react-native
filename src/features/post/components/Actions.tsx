import { useState } from "react";
import { Pressable } from "react-native";
import { Link } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/libs/supabase";
import { toggleLike } from "@/libs/supabase/api";
import { Box, HStack, Icon } from "@/components/ui";
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
		<HStack space={8}>
			<CommentBar postId={postId} />

			<Link
				href={{
					pathname: "/(app)/comments/[postId]",
					params: { postId },
				}}
				asChild
			>
				<Pressable>
					<HStack
						space={0}
						justifyContent="center"
						alignItems="center"
						width={40}
						height={40}
						backgroundColor="neutral-3"
						borderRadius={100}
					>
						<Icon name="MessageSquare" size={16} color="neutral-9" />
					</HStack>
				</Pressable>
			</Link>

			<Pressable disabled={likeMutation.isLoading} onPress={handleLikePress}>
				<HStack
					space={0}
					justifyContent="center"
					alignItems="center"
					width={40}
					height={40}
					backgroundColor="primary-3"
					borderRadius={100}
				>
					<Icon name="Heart" size={16} color="primary-9" fill={isLiked} />
				</HStack>
			</Pressable>
		</HStack>
	);
};

export default Actions;
