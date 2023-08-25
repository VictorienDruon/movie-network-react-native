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
			<Avatar src={author.avatar_url} size={28} alt={author.name} />
			<VStack space={2} flex={1}>
				<Title>{author.name}</Title>
				<Body>{content}</Body>
			</VStack>
			<Metadata>{getRelativeDate(created_at)}</Metadata>
		</HStack>
	);
};
