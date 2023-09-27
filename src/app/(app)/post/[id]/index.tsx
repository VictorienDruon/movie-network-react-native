import { ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getOne } from "@/libs/supabase/api/posts";
import { ErrorState } from "@/components/commons";
import PostCard from "@/features/post-card";
import Post from "@/features/post-card/types/Post";
import PostCardSkeleton from "@/features/post-card/components/PostCardSkeleton";

const PostScreen = () => {
	const { id } = useLocalSearchParams<{ id: string }>();

	const query = useQuery<Post, Error>({
		queryKey: ["post", id],
		queryFn: () => getOne(id),
	});

	if (query.isLoading) return <PostCardSkeleton />;

	if (query.isError) return <ErrorState retry={query.refetch} />;

	return (
		<ScrollView>
			<PostCard post={query.data} />
		</ScrollView>
	);
};

export default PostScreen;
