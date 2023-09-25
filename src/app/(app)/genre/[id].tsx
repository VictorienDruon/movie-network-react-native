import { FlatList, ScrollView } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { genresList } from "@/utils/genresList";
import { discoverMovies, discoverTv } from "@/libs/axios/api/discover";
import { Section } from "@/components/layouts";
import { ErrorState } from "@/components/commons";
import { Heading, VStack } from "@/components/ui";
import { Poster } from "@/features/poster";
import PosterSkeleton from "@/features/poster/components/PosterSkeleton";

interface PostersPage {
	posters: Poster[];
	nextCursor: number;
}

const GenreScreen = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { name, movieId, tvId } = genresList.find(
		(genre) => genre.movieId === id || genre.tvId === id
	);

	const moviesQuery = useInfiniteQuery<PostersPage, Error>({
		queryKey: ["genre", "movies", id],
		queryFn: ({ pageParam = 1 }) =>
			discoverMovies(pageParam, { with_genres: movieId }),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	const showsQuery = useInfiniteQuery<PostersPage, Error>({
		queryKey: ["genre", "shows", id],
		queryFn: ({ pageParam = 1 }) =>
			discoverTv(pageParam, { with_genres: tvId }),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	if (moviesQuery.isError) return <ErrorState retry={moviesQuery.refetch} />;
	if (showsQuery.isError) return <ErrorState retry={showsQuery.refetch} />;

	return (
		<>
			<Stack.Screen options={{ title: name }} />

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingTop: 24,
					paddingBottom: 64,
				}}
			>
				<VStack space={24}>
					<Heading px={16} fontSize={24} lineHeight={28}>
						{name}
					</Heading>

					<Section title="Movies" size="lg" flatlist>
						{moviesQuery.isLoading ? (
							<FlatList
								data={[...Array(3).keys()]}
								keyExtractor={(i) => "movie" + i.toString()}
								renderItem={() => <PosterSkeleton size="md" mx={8} />}
								contentContainerStyle={{ paddingHorizontal: 8 }}
								showsHorizontalScrollIndicator={false}
								horizontal
							/>
						) : (
							<FlatList
								data={moviesQuery.data.pages.flatMap((page) => page.posters)}
								keyExtractor={(m) => "movie" + m.tmdb_id.toString()}
								renderItem={({ item }) => (
									<Poster poster={item} size="md" mx={8} />
								)}
								ListFooterComponent={() =>
									moviesQuery.hasNextPage && <PosterSkeleton size="md" mx={8} />
								}
								contentContainerStyle={{ paddingHorizontal: 8 }}
								showsHorizontalScrollIndicator={false}
								onEndReached={() => moviesQuery.fetchNextPage()}
								horizontal
							/>
						)}
					</Section>

					<Section title="Shows" size="lg" flatlist>
						{showsQuery.isLoading ? (
							<FlatList
								data={[...Array(3).keys()]}
								keyExtractor={(i) => "movie" + i.toString()}
								renderItem={() => <PosterSkeleton size="md" mx={8} />}
								contentContainerStyle={{ paddingHorizontal: 8 }}
								showsHorizontalScrollIndicator={false}
								horizontal
							/>
						) : (
							<FlatList
								data={showsQuery.data.pages.flatMap((page) => page.posters)}
								keyExtractor={(s) => "show" + s.tmdb_id.toString()}
								renderItem={({ item }) => (
									<Poster poster={item} size="md" mx={8} />
								)}
								ListFooterComponent={() =>
									showsQuery.hasNextPage && <PosterSkeleton size="md" mx={8} />
								}
								contentContainerStyle={{ paddingHorizontal: 8 }}
								showsHorizontalScrollIndicator={false}
								onEndReached={() => showsQuery.fetchNextPage()}
								horizontal
							/>
						)}
					</Section>
				</VStack>
			</ScrollView>
		</>
	);
};

export default GenreScreen;
