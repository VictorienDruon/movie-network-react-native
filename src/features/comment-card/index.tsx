import { TouchableOpacity } from "react-native";
import { router, useSegments } from "expo-router";
import { getRelativeDate } from "@/utils/dates";
import Comment from "./types/Comment";
import { VStack, HStack, Title, Body, Avatar, Metadata } from "@/components/ui";

const CommentCard = ({ comment }: { comment: Comment }) => {
	const { createdAt, content, author } = comment;
	const segments = useSegments();

	const handleAvatarPress = () => {
		if (segments[1] === "post") {
			router.push("..");
			router.push({
				pathname: "/(app)/profile/[id]/(tabs)",
				params: { id: author.id },
			});
		}
	};

	const handleCommentPress = () => {
		if (segments[1] === "profile") {
			router.push({
				pathname: "/(app)/post/[id]",
				params: { id: comment.postId },
			});
		}
	};

	return (
		<HStack space={8} p={16}>
			<TouchableOpacity
				disabled={segments[1] !== "post"}
				onPress={handleAvatarPress}
			>
				<Avatar
					src={author.avatarUrl}
					size={28}
					alt={`${author.name} avatar`}
				/>
			</TouchableOpacity>

			<VStack space={8} flex={1}>
				<Title>{author.name}</Title>

				<TouchableOpacity
					disabled={segments[1] !== "profile"}
					onPress={handleCommentPress}
				>
					<Body>{content}</Body>
				</TouchableOpacity>
			</VStack>
			<Metadata>{getRelativeDate(createdAt)}</Metadata>
		</HStack>
	);
};

export default CommentCard;
