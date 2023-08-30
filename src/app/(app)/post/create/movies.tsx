import { useState } from "react";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import { Link, Stack, router } from "expo-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { discoverMovies } from "@/libs/axios/api/discover";
import { searchMovies } from "@/libs/axios/api/search";
import { Movie } from "@/libs/axios/types";
import { usePostCreation } from "@/providers/post-creation";
import { ErrorState, EmptyState } from "@/components/common";
import { Box, Title } from "@/components/ui";
import SearchBar from "@/components/search-bar";
import Card from "@/features/card";
import CardSkeletons from "@/features/card/components/CardSkeleton";

interface MoviesPage {
	movies: Movie[];
	nextCursor: number;
}

const MoviesModal = () => {
	const { isSelected, toggle, push } = usePostCreation();
	const [value, setValue] = useState<string>("");
	const { width } = Dimensions.get("screen");
	const margin = (width - 332) / 6;

	const initQuery = useInfiniteQuery<MoviesPage, Error>({
		queryKey: ["discoverMovies"],
		queryFn: ({ pageParam = 1 }) => discoverMovies(pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	const query = useInfiniteQuery<MoviesPage, Error>({
		queryKey: ["searchMovies", value],
		queryFn: ({ pageParam = 1 }) => searchMovies(value, pageParam),
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
				<SearchBar label="Movie" setValue={setValue} />

				{isLoading ? (
					<CardSkeletons count={9} margin={margin} />
				) : (
					<FlatList
						data={data.pages.flatMap((page) => page.movies)}
						numColumns={3}
						keyExtractor={(movie) => movie.id.toString()}
						renderItem={({ item: movie }) => (
							<Card
								title={movie.title}
								posterPath={movie.poster_path}
								isSelected={isSelected(movie.id)}
								margin={margin}
								onPress={() =>
									toggle({
										type: "movie",
										id: movie.id,
										title: movie.title,
										poster_path: movie.poster_path,
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

export default MoviesModal;
