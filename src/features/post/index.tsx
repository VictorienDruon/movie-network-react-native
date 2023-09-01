import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";
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
import PostersLayout from "@/features/posters";
import Actions from "./components/Actions";

export type Post = Database["public"]["Tables"]["posts"]["Row"] & {
	author: Database["public"]["Tables"]["profiles"]["Row"];
	posters: Database["public"]["Tables"]["posters"]["Row"][];
	user_has_liked_post: boolean;
};

export const Post = ({ post }: { post: Post }) => {
	const { id, content, created_at, author, posters, user_has_liked_post } =
		post;

	return (
		<VStack space={20} p={16}>
			<HStack space={8} alignItems="center">
				<Link
					href={{
						pathname: "/(app)/profile/[id]/(tabs)",
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

			{posters.length > 0 && (
				<Box alignItems="center" maxHeight={300}>
					<PostersLayout posters={posters} />
				</Box>
			)}

			<Actions postId={id} userHasLikedPost={user_has_liked_post} />
		</VStack>
	);
};
