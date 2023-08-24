import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Animated, RefreshControl } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useScrollProps } from "@bacons/expo-router-top-tabs";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllByUser } from "@/libs/supabase/api/likes";
import { Box, Separator } from "@/components/ui";
import { Post } from "@/features/post";

interface Page {
	likes: Post[];
	nextCursor: number;
}

const UserLikesScreen = () => {
	const { userId } = useLocalSearchParams();
	const props = useScrollProps();

	const [likes, setLikes] = useState<Post[]>([]);
	const [refreshing, setRefreshing] = useState<boolean>(false);

	const query = useInfiniteQuery<Page>({
		queryKey: ["likes", userId],
		queryFn: ({ pageParam }) => getAllByUser({ userId, pageParam }),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	const handleRefresh = useCallback(() => {
		setRefreshing(true);
		query.refetch().then(() => setRefreshing(false));
	}, []);

	useEffect(() => {
		if (query.data?.pages) {
			const newPage = query.data.pages[query.data.pages.length - 1];
			const newPosts = newPage.likes;
			setLikes((prevPosts) => [...prevPosts, ...newPosts]);
		}
	}, [query.data]);

	if (query.isLoading) return null;

	if (query.isError) return null;

	return (
		<Animated.FlatList
			data={likes}
			keyExtractor={(like) => like.id}
			renderItem={({ item: like }) => <Post post={like} />}
			ItemSeparatorComponent={() => <Separator height={0.5} />}
			ListFooterComponent={
				<Box pb={64}>
					{query.hasNextPage && <ActivityIndicator size="small" />}
				</Box>
			}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
			}
			onEndReached={() => query.fetchNextPage()}
			{...props}
		/>
	);
};

export default UserLikesScreen;
