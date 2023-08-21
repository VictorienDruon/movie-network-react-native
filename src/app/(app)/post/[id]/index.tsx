import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "@/libs/supabase/api";
import { Post } from "@/features/post";

const PostScreen = () => {
	const { id } = useLocalSearchParams() as { id: string };

	const query = useQuery<Post, Error>({
		queryKey: ["post", id],
		queryFn: () => getPost(id),
	});

	if (query.isLoading) return null;

	if (query.isError) return null;

	return <Post post={query.data} />;
};

export default PostScreen;
