import { useCallback, useState } from "react";
import { StyleSheet, Text, View, RefreshControl, FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/libs/supabase/api";
import { Post } from "@/features/post";

const HomeScreen = () => {
	const [refreshing, setRefreshing] = useState<boolean>(false);
	const {
		isLoading,
		isError,
		data: posts,
		error,
		refetch,
	} = useQuery<Post[], Error>({ queryKey: ["posts"], queryFn: getPosts });

	const handleRefresh = useCallback(() => {
		setRefreshing(true);
		refetch().then(() => setRefreshing(false));
	}, []);

	if (isLoading) return <Text>Loading...</Text>;

	if (isError) return <Text>Error: {error.message}</Text>;

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Posts</Text>
			</View>
			<FlatList
				data={posts}
				keyExtractor={(post) => post.id}
				renderItem={({ item: post }) => <Post post={post} />}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
				}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 48,
		backgroundColor: "#fff",
	},
	header: {
		padding: 16,
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
	},
});

export default HomeScreen;
