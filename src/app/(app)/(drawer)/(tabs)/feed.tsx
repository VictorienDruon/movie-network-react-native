import { FlatList } from "react-native";
import { router } from "expo-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import useUser from "@/hooks/useUser";
import { getPosts } from "@/libs/supabase/api/posts";
import { ErrorState, RefreshControl } from "@/components/commons";
import {
	Box,
	Button,
	RoundButton,
	Separator,
	Title,
	VStack,
} from "@/components/ui";
import PostCard from "@/features/post-card";
import PostCardSkeleton from "@/features/post-card/components/PostCardSkeleton";

const FeedScreen = () => {
	const user = useUser();

	const query = useInfiniteQuery({
		queryKey: ["feed"],
		queryFn: ({ pageParam = 0 }) => getPosts(pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		enabled: !!user,
	});

	if (!user)
		return (
			<VStack flex={1} justifyContent="center" px={64} space={32}>
				<Title textAlign="center">
					You need to be signed in to see your feed.
				</Title>

				<Button onPress={() => router.push("/")}>Sign in</Button>
			</VStack>
		);

	if (true)
		return (
			<FlatList
				data={Array.from({ length: 2 }, (_, i) => i)}
				keyExtractor={(item) => item.toString()}
				renderItem={() => <PostCardSkeleton />}
				ItemSeparatorComponent={() => <Separator />}
			/>
		);

	if (query.isError) return <ErrorState retry={query.refetch} />;

	return (
		<Box flex={1} position="relative">
			<FlatList
				data={query.data.pages.flatMap((page) => page.results)}
				keyExtractor={(post) => post.id}
				renderItem={({ item: post }) => <PostCard post={post} />}
				ItemSeparatorComponent={() => <Separator />}
				ListFooterComponent={
					<Box pb={64}>{query.hasNextPage && <PostCardSkeleton />}</Box>
				}
				refreshControl={<RefreshControl refetch={query.refetch} />}
				showsVerticalScrollIndicator={false}
				onEndReached={() => query.fetchNextPage()}
				automaticallyAdjustKeyboardInsets={true}
			/>

			<RoundButton
				variant="primary"
				size="lg"
				icon="Plus"
				href="/post/create"
				position="absolute"
				bottom={12}
				right={12}
				shadowColor="primary-9"
				shadowOffset={{ width: 0, height: 3 }}
				shadowOpacity={0.3}
				shadowRadius={3}
				elevation={5}
			/>
		</Box>
	);
};

export default FeedScreen;
