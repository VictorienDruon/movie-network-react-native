import { TouchableOpacity } from "react-native";
import { router, useSegments } from "expo-router";
import { Database } from "@/libs/supabase/types/database.types";
import { getRelativeDate } from "@/utils/dates";
import { VStack, HStack, Title, Body, Avatar, Metadata } from "@/components/ui";

export type Comment = Database["public"]["Tables"]["comments"]["Row"] & {
	author: Database["public"]["Tables"]["profiles"]["Row"];
};

export const Comment = ({ comment }: { comment: Comment }) => {
	const { created_at, content, author } = comment;
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
				params: { id: comment.post_id },
			});
		}
	};

	return (
		<HStack space={8} p={16}>
			<TouchableOpacity onPress={handleAvatarPress}>
				<Avatar src={author.avatar_url} size={28} alt={author.name} />
			</TouchableOpacity>

			<VStack space={2} flex={1}>
				<Title>{author.name}</Title>

				<TouchableOpacity onPress={handleCommentPress}>
					<Body>{content}</Body>
				</TouchableOpacity>
			</VStack>
			<Metadata>{getRelativeDate(created_at)}</Metadata>
		</HStack>
	);
};
