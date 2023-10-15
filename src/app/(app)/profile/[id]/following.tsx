import { FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getFollowing } from "@/libs/supabase/api/follows";
import { ErrorState, EmptyState } from "@/components/commons";
import {
	Avatar,
	Box,
	HStack,
	Separator,
	Skeleton,
	Title,
	Link,
} from "@/components/ui";

const FollowingModal = () => {
	const { id } = useLocalSearchParams<{ id: string }>();

	const query = useInfiniteQuery({
		queryKey: ["following", id],
		queryFn: ({ pageParam = 0 }) => getFollowing(id, pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	if (query.isLoading)
		return (
			<HStack alignItems="center" space={8} p={16}>
				<Skeleton width={40} height={40} borderRadius="full" />
				<Skeleton width={120} height={20} borderRadius="md" />
			</HStack>
		);

	if (query.isError) return <ErrorState retry={query.refetch} />;

	return (
		<FlatList
			data={query.data.pages.flatMap((page) => page.results)}
			keyExtractor={(user) => user.id}
			renderItem={({ item: user }) => (
				<Link href={user.link}>
					<HStack space={8} alignItems="center" p={16}>
						<Avatar
							size={40}
							src={user.avatarUrl}
							alt={`${user.name} avatar`}
						/>

						<Title>{user.name}</Title>
					</HStack>
				</Link>
			)}
			ItemSeparatorComponent={() => <Separator />}
			ListEmptyComponent={
				<EmptyState>This user does not follow anyone yet.</EmptyState>
			}
			ListFooterComponent={
				<Box pb={64}>
					{query.hasNextPage && (
						<HStack alignItems="center" space={8} p={16}>
							<Skeleton width={40} height={40} borderRadius="full" />
							<Skeleton width={120} height={20} />
						</HStack>
					)}
				</Box>
			}
			onEndReached={() => query.fetchNextPage()}
			showsVerticalScrollIndicator={false}
		/>
	);
};

export default FollowingModal;
