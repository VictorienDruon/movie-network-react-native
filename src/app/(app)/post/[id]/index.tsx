import { ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "@/libs/supabase/api/posts";
import { ErrorState } from "@/components/commons";
import PostCard from "@/features/post-card";
import PostCardSkeleton from "@/features/post-card/components/PostCardSkeleton";

const PostScreen = () => {
	const { id } = useLocalSearchParams<{ id: string }>();

	const query = useQuery({
		queryKey: ["post", id],
		queryFn: () => getPost(id),
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
