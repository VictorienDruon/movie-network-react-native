import { Database } from "@/libs/supabase/types/database.types";
import { getRelativeDate } from "@/utils/dates";
import { Box, Text, Avatar } from "@/components/ui";
import Actions from "./components/Actions";

export type Post = Database["public"]["Tables"]["posts"]["Row"] & {
	author: Database["public"]["Tables"]["profiles"]["Row"];
	user_has_liked_post: boolean;
};

export const Post = ({ post }: { post: Post }) => {
	const { id, content, created_at, author, user_has_liked_post } = post;

	return (
		<Box p="md" borderBottomWidth={0.5} borderBottomColor="gray6">
			<Box flexDirection="row" alignItems="center">
				<Avatar size="md" src={author.avatar_url} alt={author.name} />
				<Box flex={1} flexDirection="row" justifyContent="space-between">
					<Box pl="sm">
						<Text variant="title">{author.name}</Text>
						<Text variant="subtitle">Some subtitle</Text>
					</Box>
					<Text variant="metadata">{getRelativeDate(created_at)}</Text>
				</Box>
			</Box>

			<Box my="sm">
				<Text variant="body">{content}</Text>
			</Box>

			<Actions postId={id} userHasLikedPost={user_has_liked_post} />
		</Box>
	);
};
