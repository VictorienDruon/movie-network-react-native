import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getOne } from "@/libs/supabase/api/posts";
import { ErrorState } from "@/components/common";
import { Post } from "@/features/post";
import PostSkeleton from "@/features/post/components/PostSkeleton";

const PostScreen = () => {
	const { id } = useLocalSearchParams<{ id: string }>();

	const query = useQuery<Post, Error>({
		queryKey: ["post", id],
		queryFn: () => getOne(id),
	});

	if (query.isLoading) return <PostSkeleton />;

	if (query.isError) return <ErrorState retry={query.refetch} />;

	return <Post post={query.data} />;
};

export default PostScreen;
