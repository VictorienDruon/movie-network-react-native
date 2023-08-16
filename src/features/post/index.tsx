import { Database } from "@/libs/supabase/types/database.types";
import { getRelativeDate } from "@/utils/dates";
import {
	Box,
	Subtitle,
	Avatar,
	Title,
	Body,
	Metadata,
	HStack,
} from "@/components/ui";
import Actions from "./components/Actions";

export type Post = Database["public"]["Tables"]["posts"]["Row"] & {
	author: Database["public"]["Tables"]["profiles"]["Row"];
	user_has_liked_post: boolean;
};

export const Post = ({ post }: { post: Post }) => {
	const { id, content, created_at, author, user_has_liked_post } = post;

	return (
		<Box p={16} borderBottomWidth={0.25} borderBottomColor="neutral-6">
			<HStack space={8} alignItems="center">
				<Avatar size="md" src={author.avatar_url} alt={author.name} />
				<HStack space={8} flex={1} justifyContent="space-between">
					<Box>
						<Title>{author.name}</Title>
						<Subtitle>Some subtitle</Subtitle>
					</Box>
					<Metadata>{getRelativeDate(created_at)}</Metadata>
				</HStack>
			</HStack>

			<Box my={8}>
				<Body>{content}</Body>
			</Box>

			<Actions postId={id} userHasLikedPost={user_has_liked_post} />
		</Box>
	);
};
