import { Database } from "@/libs/supabase/types/database.types";
import { getRelativeDate } from "@/utils/dates";
import { Box, Body, Metadata, HStack, VStack } from "@/components/ui";
import { Poster } from "@/features/poster";
import { User } from "@/features/user";
import Layout from "@/features/poster/components/Layout";
import Actions from "./components/Actions";

export type Post = Database["public"]["Tables"]["posts"]["Row"] & {
	author: Database["public"]["Tables"]["profiles"]["Row"];
	posters: Poster[];
	user_has_liked_post: boolean;
};

export const Post = ({ post }: { post: Post }) => {
	const { id, content, created_at, author, posters, user_has_liked_post } =
		post;

	return (
		<VStack space={20} p={16}>
			<HStack justifyContent="space-between" space={8}>
				<User user={author} />

				<Metadata>{getRelativeDate(created_at)}</Metadata>
			</HStack>

			<Body>{content}</Body>

			{posters.length > 0 && (
				<Box alignItems="center" maxHeight={300}>
					<Layout posters={posters} />
				</Box>
			)}

			<Actions postId={id} userHasLikedPost={user_has_liked_post} />
		</VStack>
	);
};
