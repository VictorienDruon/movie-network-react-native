import { useState } from "react";
import { Dimensions, FlatList } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { discoverMovies } from "@/libs/axios/api/discover";
import { searchMovies } from "@/libs/axios/api/search";
import { Movie } from "@/libs/axios/types";
import { ErrorState, EmptyState } from "@/components/common";
import { Box } from "@/components/ui";
import Card from "@/features/search";
import CardSkeletons from "@/features/search/components/CardSkeleton";
import SearchBar from "@/features/search/components/SearchBar";

interface MoviesPage {
	movies: Movie[];
	nextCursor: number;
}

const MoviesModal = () => {
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
							margin={margin}
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
	);
};

export default MoviesModal;
