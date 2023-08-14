import { Database } from "@/libs/supabase/types/database.types";
import { getRelativeDate } from "@/utils/dates";
import { Box, Text, Avatar } from "@/components/ui";

export type Comment = Database["public"]["Tables"]["comments"]["Row"] & {
	author: Database["public"]["Tables"]["profiles"]["Row"];
};

export const Comment = ({ comment }: { comment: Comment }) => {
	const { author, created_at, content } = comment;

	return (
		<Box flexDirection="row" p="md">
			<Avatar src={author.avatar_url} size="sm" alt={author.name} />
			<Box flex={1} px="sm">
				<Text variant="title">{author.name}</Text>
				<Text variant="body">{content}</Text>
			</Box>
			<Text variant="metadata">{getRelativeDate(created_at)}</Text>
		</Box>
	);
};
