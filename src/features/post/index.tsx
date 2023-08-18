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
	VStack,
} from "@/components/ui";
import Actions from "./components/Actions";

export type Post = Database["public"]["Tables"]["posts"]["Row"] & {
	author: Database["public"]["Tables"]["profiles"]["Row"];
	likes: { user_id: string }[];
	user_has_liked_post: boolean;
};

export const Post = ({ post }: { post: Post }) => {
	const { id, content, created_at, author, user_has_liked_post } = post;

	return (
		<VStack
			space={8}
			p={16}
			borderBottomWidth={0.25}
			borderBottomColor="neutral-6"
		>
			<HStack space={8} alignItems="center">
				<Avatar size={40} src={author.avatar_url} alt={author.name} />
				<Box flex={1}>
					<Title>{author.name}</Title>
					<Subtitle>Some subtitle</Subtitle>
				</Box>
				<Metadata>{getRelativeDate(created_at)}</Metadata>
			</HStack>

			<Body>{content}</Body>

			<Actions postId={id} userHasLikedPost={user_has_liked_post} />
		</VStack>
	);
};
