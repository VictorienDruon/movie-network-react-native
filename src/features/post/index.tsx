import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Database } from "@/libs/supabase/types/database.types";
import { getRelativeDate } from "@/utils/dates";
import { useSession } from "@/providers/session";
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
	user_has_liked_post: boolean;
};

export const Post = ({ post }: { post: Post }) => {
	const { id, content, created_at, author, user_has_liked_post } = post;
	const { user } = useSession();

	return (
		<VStack space={8} p={16}>
			<HStack space={8} alignItems="center">
				<Link
					href={{
						pathname: "/(app)/profile/[id]",
						params: { id: author.id },
					}}
					asChild
				>
					<TouchableOpacity>
						<Avatar size={40} src={author.avatar_url} alt={author.name} />
					</TouchableOpacity>
				</Link>

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
