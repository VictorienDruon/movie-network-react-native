import { ActivityIndicator, Animated, TouchableOpacity } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { useScrollProps } from "@bacons/expo-router-top-tabs";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllByUser } from "@/libs/supabase/api/comments";
import { Box, Empty, Refresh } from "@/components/ui";
import { Comment } from "@/features/comment";

interface Page {
	comments: Comment[];
	nextCursor: number;
}

const ProfileCommentsScreen = () => {
	const { userId } = useLocalSearchParams() as { userId: string };
	const props = useScrollProps();

	const query = useInfiniteQuery<Page, Error>({
		queryKey: ["comments", userId],
		queryFn: ({ pageParam = 0 }) => getAllByUser(userId, pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	if (query.isLoading) return null;

	if (query.isError) return null;

	return (
		<Animated.FlatList
			data={query.data.pages.flatMap((page) => page.comments)}
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
			ListEmptyComponent={
				<Empty>This user has not posted any comments yet.</Empty>
			}
			ListFooterComponent={
				<Box pb={64}>
					{query.hasNextPage && <ActivityIndicator size="small" />}
				</Box>
			}
			refreshControl={<Refresh refetch={query.refetch} />}
			onEndReached={() => query.fetchNextPage()}
			showsVerticalScrollIndicator={false}
			{...props}
		/>
	);
};

export default ProfileCommentsScreen;
