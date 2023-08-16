import { useCallback, useState } from "react";
import { RefreshControl, FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/libs/supabase/api";
import { Box, Heading } from "@/components/ui";
import { Post } from "@/features/post";

const HomeScreen = () => {
	const [refreshing, setRefreshing] = useState<boolean>(false);
	const query = useQuery<Post[], Error>({
		queryKey: ["posts"],
		queryFn: getPosts,
	});

	const handleRefresh = useCallback(() => {
		setRefreshing(true);
		query.refetch().then(() => setRefreshing(false));
	}, []);

	if (query.isLoading) return <Heading>Loading...</Heading>;

	if (query.isError) return <Heading>Error: {query.error.message}</Heading>;

	return (
		<Box pt={64} pb={24}>
			<Heading pl={16}>Home</Heading>
			<FlatList
				data={query.data}
				keyExtractor={(post) => post.id}
				renderItem={({ item: post }) => <Post post={post} />}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
				}
			/>
		</Box>
	);
};

export default HomeScreen;
