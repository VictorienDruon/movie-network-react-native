import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "@/libs/supabase/api";
import { Post } from "@/features/post";

const PostScreen = () => {
	const { postId } = useLocalSearchParams() as { postId: string };

	const query = useQuery<Post, Error>({
		queryKey: ["posts", postId],
		queryFn: () => getPost(postId),
	});

	if (query.isLoading) return null;

	if (query.isError) return null;

	return <Post post={query.data} />;
};

export default PostScreen;
