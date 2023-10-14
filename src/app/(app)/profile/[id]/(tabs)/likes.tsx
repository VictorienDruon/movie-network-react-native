import { Animated } from "react-native";
import { useScrollProps } from "@bacons/expo-router-top-tabs";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getLikes } from "@/libs/supabase/api/likes";
import useFocus from "@/hooks/useFocus";
import { EmptyState, RefreshControl } from "@/components/commons";
import { Box, Separator } from "@/components/ui";
import PostCard from "@/features/post-card";
import PostCardSkeleton from "@/features/post-card/components/PostCardSkeleton";
import Post from "@/features/post-card/types/Post";
import { useParams } from "./_layout";

interface PostsPage {
	posts: Post[];
	nextCursor: number;
}

const LikesTab = () => {
	const { userId } = useParams();
	const isFocused = useFocus();
	const props = useScrollProps();

	const query = useInfiniteQuery({
		queryKey: ["likes", userId],
		queryFn: ({ pageParam = 0 }) => getLikes(userId, pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		enabled: isFocused,
	});

	if (query.isLoading) return null;

	if (query.isError) return null;

	return (
		<Animated.FlatList
			data={query.data.pages.flatMap((page) => page.results)}
			keyExtractor={(post) => post.id}
			renderItem={({ item: post }) => <PostCard post={post} />}
			ItemSeparatorComponent={() => <Separator />}
			ListEmptyComponent={
				<EmptyState>This user has not liked any posts yet.</EmptyState>
			}
			ListFooterComponent={
				<Box pb={64}>{query.hasNextPage && <PostCardSkeleton />}</Box>
			}
			refreshControl={<RefreshControl refetch={query.refetch} />}
			onEndReached={() => query.fetchNextPage()}
			showsVerticalScrollIndicator={false}
			{...props}
		/>
	);
};

export default LikesTab;
