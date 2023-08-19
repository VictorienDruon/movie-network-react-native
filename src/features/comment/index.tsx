import { Database } from "@/libs/supabase/types/database.types";
import { getRelativeDate } from "@/utils/dates";
import { Box, HStack, Title, Body, Avatar, Metadata } from "@/components/ui";

export type Comment = Database["public"]["Tables"]["comments"]["Row"] & {
	author: Database["public"]["Tables"]["profiles"]["Row"];
};

export const Comment = ({ comment }: { comment: Comment }) => {
	const { author, created_at, content } = comment;

	return (
		<HStack space={8} p={16}>
			<Avatar src={author.avatar_url} size={24} alt={author.name} />
			<Box flex={1}>
				<Title>{author.name}</Title>
				<Body>{content}</Body>
			</Box>
			<Metadata>{getRelativeDate(created_at)}</Metadata>
		</HStack>
	);
};
