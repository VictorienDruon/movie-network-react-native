import { useCallback, useEffect, useState } from "react";
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	RefreshControl,
} from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllByUser } from "@/libs/supabase/api/comments";
import { Box } from "@/components/ui";
import { Comment } from "@/features/comment";

interface Page {
	comments: Comment[];
	nextCursor: number;
}

const Comments = ({ userId }: { userId: string }) => {
	const [comments, setComments] = useState<Comment[]>([]);
	const [refreshing, setRefreshing] = useState<boolean>(false);
	const { width } = Dimensions.get("screen");

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
		<Box width={width}>
			<FlatList
				data={comments}
				keyExtractor={(comment) => comment.id}
				renderItem={({ item: comment }) => <Comment comment={comment} />}
				ListFooterComponent={
					<Box pb={64}>
						{query.hasNextPage && <ActivityIndicator size="small" />}
					</Box>
				}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
				}
				onEndReached={() => query.fetchNextPage()}
			/>
		</Box>
	);
};

export default Comments;
