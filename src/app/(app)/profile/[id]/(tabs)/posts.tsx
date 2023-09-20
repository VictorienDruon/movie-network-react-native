import { Animated } from "react-native";
import { useScrollProps } from "@bacons/expo-router-top-tabs";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllByUser } from "@/libs/supabase/api/posts";
import useFocus from "@/hooks/useFocus";
import { EmptyState, RefreshControl } from "@/components/commons";
import { Box, Separator } from "@/components/ui";
import { Post } from "@/features/post";
import PostSkeleton from "@/features/post/components/PostSkeleton";
import { useParams } from "./_layout";

interface PostsPage {
	posts: Post[];
	nextCursor: number;
}

const PostsTab = () => {
	const { userId } = useParams();
	const isFocused = useFocus();
	const props = useScrollProps();

	const query = useInfiniteQuery<PostsPage, Error>({
		queryKey: ["posts", userId],
		queryFn: ({ pageParam = 0 }) => getAllByUser(userId, pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		enabled: isFocused,
	});

	if (query.isLoading) return null;

	if (query.isError) return null;

	return (
		<Animated.FlatList
			data={query.data.pages.flatMap((page) => page.posts)}
			keyExtractor={(post) => post.id}
			renderItem={({ item: post }) => <Post post={post} />}
			ItemSeparatorComponent={() => <Separator />}
			ListEmptyComponent={
				<EmptyState>This user has not posted any posts yet.</EmptyState>
			}
			ListFooterComponent={
				<Box pb={64}>{query.hasNextPage && <PostSkeleton />}</Box>
			}
			refreshControl={<RefreshControl refetch={query.refetch} />}
			onEndReached={() => query.fetchNextPage()}
			showsVerticalScrollIndicator={false}
			{...props}
		/>
	);
};

export default PostsTab;
