import { useCallback, useState } from "react";
import { RefreshControl, FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/libs/supabase/api";
import { Layout, Text } from "@/components/ui";
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

	if (query.isLoading) return <Text>Loading...</Text>;

	if (query.isError) return <Text>Error: {query.error.message}</Text>;

	return (
		<Layout>
			<Text variant="header" pl="sm">
				Home
			</Text>
			<FlatList
				data={query.data}
				keyExtractor={(post) => post.id}
				renderItem={({ item: post }) => <Post post={post} />}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
				}
			/>
		</Layout>
	);
};

export default HomeScreen;
