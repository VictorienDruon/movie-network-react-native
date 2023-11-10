import { TouchableOpacity } from "react-native";
import { router, useSegments } from "expo-router";
import { getRelativeDate } from "@/utils/dates";
import Comment from "./types/Comment";
import {
	VStack,
	HStack,
	Title,
	Body,
	Avatar,
	Metadata,
	Icon,
} from "@/components/ui";
import ActionsMenu from "./components/ActionsMenu";

const CommentCard = ({ comment }: { comment: Comment }) => {
	const { id, createdAt, content, author } = comment;
	const segments = useSegments();

	const handleAvatarPress = () => {
		if (segments[1] === "post") {
			router.push("..");
			router.push({
				pathname: "/profile/[id]",
				params: { id: author.id },
			});
		}
	};

	const handleCommentPress = () => {
		if (segments[1] === "profile") {
			router.push({
				pathname: "/post/[id]",
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
				<Avatar src={author.avatarUrl} size={40} name={author.name} />
			</TouchableOpacity>

			<VStack space={4} flex={1}>
				<HStack justifyContent="space-between" alignItems="center" space={4}>
					<HStack alignItems="flex-end" maxWidth="70%" space={4}>
						<Title numberOfLines={1} ellipsizeMode="tail">
							{author.name}
						</Title>

						<Metadata>•</Metadata>

						<Metadata>{getRelativeDate(createdAt)}</Metadata>
					</HStack>

					<ActionsMenu commentId={id} />
				</HStack>

				<TouchableOpacity
					disabled={segments[1] !== "profile"}
					onPress={handleCommentPress}
				>
					<Body>{content}</Body>
				</TouchableOpacity>
			</VStack>
		</HStack>
	);
};

export default CommentCard;
