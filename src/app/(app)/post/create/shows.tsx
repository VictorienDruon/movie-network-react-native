import { useState } from "react";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import { Link, Stack, router } from "expo-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { discoverShows } from "@/libs/axios/api/discover";
import { searchShows } from "@/libs/axios/api/search";
import { Show } from "@/libs/axios/types";
import { usePostCreation } from "@/providers/post-creation";
import { ErrorState, EmptyState } from "@/components/common";
import { Box, Title } from "@/components/ui";
import SearchBar from "@/components/search-bar";
import Card from "@/features/card";
import CardSkeletons from "@/features/card/components/CardSkeleton";

interface ShowsPage {
	shows: Show[];
	nextCursor: number;
}

const ShowsModal = () => {
	const { isSelected, toggle, push } = usePostCreation();
	const [value, setValue] = useState<string>("");
	const { width } = Dimensions.get("screen");
	const margin = (width - 332) / 6;

	const initQuery = useInfiniteQuery<ShowsPage, Error>({
		queryKey: ["discoverShows"],
		queryFn: ({ pageParam = 1 }) => discoverShows(pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	const query = useInfiniteQuery<ShowsPage, Error>({
		queryKey: ["searchShows", value],
		queryFn: ({ pageParam = 1 }) => searchShows(value, pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		enabled: value.length > 0,
	});

	if (initQuery.isError) return <ErrorState retry={initQuery.refetch} />;
	if (query.isError) return <ErrorState retry={query.refetch} />;

	const isLoading = (value && query.isLoading) || initQuery.isLoading;
	const data = value ? query.data : initQuery.data;
	const hasNextPage = value ? query.hasNextPage : initQuery.hasNextPage;
	const fetchNextPage = value ? query.fetchNextPage : initQuery.fetchNextPage;

	return (
		<>
			<Stack.Screen
				options={{
					headerLeft: () => (
						<Link href=".." asChild>
							<TouchableOpacity>
								<Title color="primary-9" fontWeight="normal">
									Cancel
								</Title>
							</TouchableOpacity>
						</Link>
					),
					headerRight: () => (
						<Link href=".." asChild>
							<TouchableOpacity onPress={push}>
								<Title color="primary-9">Done</Title>
							</TouchableOpacity>
						</Link>
					),
				}}
			/>

			<Box flex={1} px={16}>
				<SearchBar label="TV shows" setValue={setValue} />

				{isLoading ? (
					<CardSkeletons count={9} margin={margin} />
				) : (
					<FlatList
						data={data.pages.flatMap((page) => page.shows)}
						numColumns={3}
						keyExtractor={(show) => show.id.toString()}
						renderItem={({ item: show }) => (
							<Card
								title={show.name}
								posterPath={show.poster_path}
								isSelected={isSelected(show.id)}
								margin={margin}
								onPress={() =>
									toggle({
										type: "tv",
										id: show.id,
										title: show.name,
										poster_path: show.poster_path,
									})
								}
							/>
						)}
						ListEmptyComponent={<EmptyState>No results</EmptyState>}
						ListFooterComponent={
							<Box pb={64}>
								{hasNextPage && <CardSkeletons count={3} margin={margin} />}
							</Box>
						}
						onEndReached={() => fetchNextPage()}
						showsVerticalScrollIndicator={false}
					/>
				)}
			</Box>
		</>
	);
};

export default ShowsModal;
