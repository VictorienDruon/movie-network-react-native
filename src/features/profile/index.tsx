import { useCallback, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { QueryObserverResult } from "@tanstack/react-query";
import { Database } from "@/libs/supabase/types/database.types";
import { VStack, Heading, Avatar, Box } from "@/components/ui";
import { Post } from "@/features/post";
import { Comment } from "@/features/post/components/Comment";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"] & {
	posts: Post[];
	comments: Comment[];
	likes: Post[];
};

interface ProfileProps {
	profile: Profile;
	refetch: () => Promise<QueryObserverResult>;
}

export const Profile = ({ profile, refetch }: ProfileProps) => {
	const { name, avatar_url, posts, comments, likes } = profile;
	const [refreshing, setRefreshing] = useState<boolean>(false);

	const handleRefresh = useCallback(() => {
		setRefreshing(true);
		refetch().then(() => setRefreshing(false));
	}, []);

	return (
		<Box flex={1} pt={64}>
			<VStack space={4} pl={16} bg="neutral-1">
				<Avatar size={64} src={avatar_url} alt={name} />
				<Heading>{name}</Heading>
			</VStack>
			<FlatList
				data={posts}
				keyExtractor={(post) => post.id}
				renderItem={({ item: post }) => <Post post={post} />}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
				}
			/>
		</Box>
	);
};
