import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Database } from "@/libs/supabase/types/database.types";
import { getRelativeDate } from "@/utils/dates";
import { Body, Metadata, HStack, VStack, Avatar, Title } from "@/components/ui";
import { Poster } from "@/features/poster";
import PostersLayout from "@/features/poster/components/PostersLayout";
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
				<Link
					href={{
						pathname: "/(app)/profile/[id]/(tabs)",
						params: { id },
					}}
					asChild
				>
					<TouchableOpacity>
						<HStack space={8} alignItems="center">
							<Avatar
								size={40}
								src={author.avatar_url}
								alt={`${author.name} avatar`}
							/>

							<Title>{author.name}</Title>
						</HStack>
					</TouchableOpacity>
				</Link>

				<Metadata>{getRelativeDate(created_at)}</Metadata>
			</HStack>

			<Body>{content}</Body>

			<PostersLayout posters={posters} />

			<Actions postId={id} userHasLikedPost={user_has_liked_post} />
		</VStack>
	);
};
