import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Database } from "@/libs/supabase/types/database.types";
import { getRelativeDate } from "@/utils/dates";
import { VStack, HStack, Title, Body, Avatar, Metadata } from "@/components/ui";

export type Comment = Database["public"]["Tables"]["comments"]["Row"] & {
	author: Database["public"]["Tables"]["profiles"]["Row"];
};

export const Comment = ({ comment }: { comment: Comment }) => {
	const { created_at, content, author } = comment;

	return (
		<HStack space={8} p={16}>
			<Link
				href={{
					pathname: "/(app)/profile/[id]/(tabs)",
					params: { id: author.id },
				}}
				asChild
			>
				<TouchableOpacity>
					<Avatar src={author.avatar_url} size={28} alt={author.name} />
				</TouchableOpacity>
			</Link>

			<VStack space={2} flex={1}>
				<Title>{author.name}</Title>

				<Link
					href={{
						pathname: "/(app)/post/[id]",
						params: { id: comment.post_id },
					}}
					asChild
				>
					<TouchableOpacity>
						<Body>{content}</Body>
					</TouchableOpacity>
				</Link>
			</VStack>
			<Metadata>{getRelativeDate(created_at)}</Metadata>
		</HStack>
	);
};
