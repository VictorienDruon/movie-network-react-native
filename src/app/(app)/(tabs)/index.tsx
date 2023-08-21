import { useCallback, useState } from "react";
import { RefreshControl, FlatList, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getAll } from "@/libs/supabase/api/posts";
import { Box, HStack, Icon } from "@/components/ui";
import { Post } from "@/features/post";

const HomeScreen = () => {
	const [refreshing, setRefreshing] = useState<boolean>(false);
	const query = useQuery<Post[], Error>({
		queryKey: ["feed"],
		queryFn: getAll,
	});

	const handleRefresh = useCallback(() => {
		setRefreshing(true);
		query.refetch().then(() => setRefreshing(false));
	}, []);

	if (query.isLoading) return null;

	if (query.isError) return null;

	return (
		<Box flex={1} position="relative">
			<FlatList
				data={query.data}
				keyExtractor={(post) => post.id}
				renderItem={({ item: post }) => <Post post={post} />}
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
				}
			/>

			<Link href="post/create" asChild>
				<TouchableOpacity
					style={{ position: "absolute", bottom: 12, right: 12 }}
				>
					<HStack
						space={0}
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
						<Icon name="Plus" size={24} color="primary-3" />
					</HStack>
				</TouchableOpacity>
			</Link>
		</Box>
	);
};

export default HomeScreen;
