import { FlatList, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAll } from "@/libs/supabase/api/posts";
import { ErrorState, RefreshControl } from "@/components/common";
import { Box, Icon, Separator } from "@/components/ui";
import { Post } from "@/features/post";
import PostSkeleton from "@/features/post/components/PostSkeleton";

interface PostsPage {
	posts: Post[];
	nextCursor: number;
}

const FeedScreen = () => {
	const query = useInfiniteQuery<PostsPage, Error>({
		queryKey: ["feed"],
		queryFn: ({ pageParam = 0 }) => getAll(pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	if (query.isLoading)
		return (
			<FlatList
				data={Array.from({ length: 2 }, (_, i) => i)}
				keyExtractor={(item) => item.toString()}
				renderItem={() => <PostSkeleton />}
				ItemSeparatorComponent={() => <Separator />}
				scrollEnabled={false}
			/>
		);

	if (query.isError) return <ErrorState retry={query.refetch} />;

	return (
		<Box flex={1} position="relative">
			<FlatList
				data={query.data.pages.flatMap((page) => page.posts)}
				keyExtractor={(post) => post.id}
				renderItem={({ item: post }) => <Post post={post} />}
				ItemSeparatorComponent={() => <Separator />}
				ListFooterComponent={
					<Box pb={64}>{query.hasNextPage && <PostSkeleton />}</Box>
				}
				refreshControl={<RefreshControl refetch={query.refetch} />}
				showsVerticalScrollIndicator={false}
				onEndReached={() => query.fetchNextPage()}
			/>

			<Link href="/(app)/post/create" asChild>
				<TouchableOpacity
					style={{ position: "absolute", bottom: 12, right: 12 }}
				>
					<Box
						justifyContent="center"
						alignItems="center"
						width={56}
						height={56}
						bg="primary-9"
						borderRadius="full"
						shadowColor="primary-9"
						shadowOffset={{ width: 0, height: 3 }}
						shadowOpacity={0.3}
						shadowRadius={3}
						elevation={5}
					>
						<Icon name="Plus" size={24} color="white" />
					</Box>
				</TouchableOpacity>
			</Link>
		</Box>
	);
};

export default FeedScreen;
