import { useCallback, useEffect, useState } from "react";
import {
	ActivityIndicator,
	Animated,
	RefreshControl,
	TouchableOpacity,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { useScrollProps } from "@bacons/expo-router-top-tabs";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllByUser } from "@/libs/supabase/api/comments";
import { Box } from "@/components/ui";
import { Comment } from "@/features/comment";

interface Page {
	comments: Comment[];
	nextCursor: number;
}

const UserCommentsScreen = () => {
	const { userId } = useLocalSearchParams();
	const props = useScrollProps();

	const [comments, setComments] = useState<Comment[]>([]);
	const [refreshing, setRefreshing] = useState<boolean>(false);

	const query = useInfiniteQuery<Page, Error>({
		queryKey: ["comments", userId],
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
			const newPosts = newPage.comments;
			setComments((prevPosts) => [...prevPosts, ...newPosts]);
		}
	}, [query.data]);

	if (query.isLoading) return null;

	if (query.isError) return null;

	return (
		<Animated.FlatList
			data={comments}
			keyExtractor={(comment) => comment.id}
			renderItem={({ item: comment }) => (
				<Link
					href={{
						pathname: "/(app)/post/[id]",
						params: { id: comment.post_id },
					}}
					asChild
				>
					<TouchableOpacity>
						<Comment comment={comment} />
					</TouchableOpacity>
				</Link>
			)}
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

export default UserCommentsScreen;
