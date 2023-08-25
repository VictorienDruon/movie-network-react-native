import { ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getOne } from "@/libs/supabase/api/posts";
import { Error } from "@/components/ui";
import { Post } from "@/features/post";

const PostScreen = () => {
	const { id } = useLocalSearchParams() as { id: string };

	const query = useQuery<Post, Error>({
		queryKey: ["post", id],
		queryFn: () => getOne(id),
	});

	if (query.isLoading)
		return <ActivityIndicator size="small" style={{ paddingTop: 16 }} />;

	if (query.isError) return <Error retry={query.refetch} />;

	return <Post post={query.data} />;
};

export default PostScreen;
