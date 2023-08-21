import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getOne } from "@/libs/supabase/api/posts";
import { Post } from "@/features/post";

const PostScreen = () => {
	const { id } = useLocalSearchParams() as { id: string };

	const query = useQuery<Post, Error>({
		queryKey: ["post", id],
		queryFn: () => getOne(id),
	});

	if (query.isLoading) return null;

	if (query.isError) return null;

	return <Post post={query.data} />;
};

export default PostScreen;
