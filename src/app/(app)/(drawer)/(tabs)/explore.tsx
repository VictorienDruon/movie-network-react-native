import { Dimensions, FlatList, ScrollView } from "react-native";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
	getDayTrending,
	getMediaTrending,
	getPeopleTrending,
} from "@/libs/axios/api/trending";
import { genresList } from "@/utils/genresList";
import { providersList } from "@/utils/providersList";
import { ErrorState } from "@/components/commons";
import { Section } from "@/components/layouts";
import { Box, Image, Link, SubHeading, VStack } from "@/components/ui";
import { Poster } from "@/features/poster";
import { PersonCard } from "@/features/person-card";
import PosterSkeleton from "@/features/poster/components/PosterSkeleton";
import PersonCardSkeleton from "@/features/person-card/components/PersonCardSkeleton";
import Person from "@/features/person-card/types/Person";

interface PostersPage {
	posters: Poster[];
	nextCursor: number;
}

interface PeoplePage {
	people: Person[];
	nextCursor: number;
}

const ExploreScreen = () => {
	const { width } = Dimensions.get("screen");
	const trendingSpacing = (width - 150) / 32;

	const daylyTrendsQuery = useQuery<Poster[], Error>({
		queryKey: ["trending", "all"],
		queryFn: getDayTrending,
	});

	const moviesTrendsQuery = useInfiniteQuery<PostersPage, Error>({
		queryKey: ["trending", "movie"],
		queryFn: ({ pageParam = 1 }) => getMediaTrending(pageParam, "movie"),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	const tvTrendsQuery = useInfiniteQuery<PostersPage, Error>({
		queryKey: ["trending", "tv"],
		queryFn: ({ pageParam = 1 }) => getMediaTrending(pageParam, "tv"),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	const peopleTrendsQuery = useInfiniteQuery<PeoplePage, Error>({
		queryKey: ["trending", "person"],
		queryFn: ({ pageParam = 1 }) => getPeopleTrending(pageParam),
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});

	if (daylyTrendsQuery.isError)
		return <ErrorState retry={daylyTrendsQuery.refetch} />;
	if (moviesTrendsQuery.isError)
		return <ErrorState retry={moviesTrendsQuery.refetch} />;
	if (tvTrendsQuery.isError)
		return <ErrorState retry={tvTrendsQuery.refetch} />;
	if (peopleTrendsQuery.isError)
		return <ErrorState retry={peopleTrendsQuery.refetch} />;

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{
				paddingBottom: 64,
			}}
		>
			{daylyTrendsQuery.isLoading ? (
				<FlatList
					data={Array.from({ length: 4 }, (_, i) => i)}
					keyExtractor={(item) => item.toString()}
					renderItem={() => (
						<PosterSkeleton
							size="md"
							textPosition="top"
							style={{ marginHorizontal: trendingSpacing }}
						/>
					)}
					contentContainerStyle={{
						paddingHorizontal: 16 - trendingSpacing,
						paddingVertical: 24,
					}}
					showsHorizontalScrollIndicator={false}
					horizontal
				/>
			) : (
				<FlatList
					data={daylyTrendsQuery.data}
					keyExtractor={(p) => p.id.toString()}
					renderItem={({ item: poster }) => (
						<Poster
							poster={poster}
							size="md"
							textPosition="top"
							decoration="shadow"
							style={{ marginHorizontal: trendingSpacing }}
						/>
					)}
					contentContainerStyle={{
						paddingHorizontal: 16 - trendingSpacing,
						paddingVertical: 24,
					}}
					showsHorizontalScrollIndicator={false}
					horizontal
				/>
			)}

			<VStack space={24}>
				<FlatList
					data={genresList}
					keyExtractor={(genre) => genre.name}
					renderItem={({ item: genre }) => (
						<Link
							href={{
								pathname: "/genre/[id]",
								params: { id: genre.movieId || genre.tvId },
							}}
						>
							<Image
								src={`${process.env.EXPO_PUBLIC_TMDB_IMAGE_URL}/w780/${genre.backdrop_path}`}
								alt={genre.name}
								width={140}
								aspectRatio={16 / 9}
								marginHorizontal={4}
								borderRadius="md"
							>
								<Box
									position="absolute"
									width={140}
									aspectRatio={16 / 9}
									bg="black"
									opacity={0.4}
								/>
								<Box position="absolute" bottom={8} left={12}>
									<SubHeading color="white">{genre.name}</SubHeading>
								</Box>
							</Image>
						</Link>
					)}
					contentContainerStyle={{ paddingHorizontal: 12 }}
					showsHorizontalScrollIndicator={false}
					horizontal
				/>

				<Section title="Movies" size="lg" flatlist>
					{moviesTrendsQuery.isLoading ? (
						<FlatList
							data={Array.from({ length: 4 }, (_, i) => i)}
							keyExtractor={(item) => item.toString()}
							renderItem={() => <PosterSkeleton mx={8} />}
							contentContainerStyle={{ paddingHorizontal: 8 }}
							horizontal={true}
						/>
					) : (
						<FlatList
							data={moviesTrendsQuery.data.pages.flatMap(
								(page) => page.posters
							)}
							keyExtractor={(p) => p.id.toString()}
							renderItem={({ item: poster }) => (
								<Poster
									poster={poster}
									size="sm"
									style={{ marginHorizontal: 8 }}
								/>
							)}
							ListFooterComponent={() =>
								moviesTrendsQuery.hasNextPage && <PosterSkeleton mx={8} />
							}
							contentContainerStyle={{ paddingHorizontal: 8 }}
							showsHorizontalScrollIndicator={false}
							onEndReached={() => moviesTrendsQuery.fetchNextPage()}
							horizontal
						/>
					)}
				</Section>

				<Section title="Shows" size="lg" flatlist>
					{tvTrendsQuery.isLoading ? (
						<FlatList
							data={Array.from({ length: 4 }, (_, i) => i)}
							keyExtractor={(item) => item.toString()}
							renderItem={() => <PosterSkeleton mx={8} />}
							contentContainerStyle={{ paddingHorizontal: 8 }}
							horizontal={true}
						/>
					) : (
						<FlatList
							data={tvTrendsQuery.data.pages.flatMap((page) => page.posters)}
							keyExtractor={(p) => p.id.toString()}
							renderItem={({ item: poster }) => (
								<Poster
									poster={poster}
									size="sm"
									style={{ marginHorizontal: 8 }}
								/>
							)}
							ListFooterComponent={() =>
								tvTrendsQuery.hasNextPage && <PosterSkeleton mx={8} />
							}
							contentContainerStyle={{ paddingHorizontal: 8 }}
							showsHorizontalScrollIndicator={false}
							onEndReached={() => tvTrendsQuery.fetchNextPage()}
							horizontal
						/>
					)}
				</Section>

				<Section title="People" size="lg" flatlist>
					{peopleTrendsQuery.isLoading ? (
						<FlatList
							data={Array.from({ length: 4 }, (_, i) => i)}
							keyExtractor={(item) => item.toString()}
							renderItem={() => <PersonCardSkeleton withRole={false} mx={4} />}
							contentContainerStyle={{ paddingHorizontal: 12 }}
							horizontal={true}
						/>
					) : (
						<FlatList
							data={peopleTrendsQuery.data.pages.flatMap((page) => page.people)}
							keyExtractor={(p) => p.id.toString()}
							renderItem={({ item: person }) => (
								<PersonCard person={person} mx={8} />
							)}
							ListFooterComponent={() =>
								peopleTrendsQuery.hasNextPage && (
									<PersonCardSkeleton withRole={false} mx={8} />
								)
							}
							contentContainerStyle={{ paddingHorizontal: 8 }}
							showsHorizontalScrollIndicator={false}
							onEndReached={() => peopleTrendsQuery.fetchNextPage()}
							horizontal
						/>
					)}
				</Section>

				<Section title="Plaforms" size="lg" flatlist>
					<FlatList
						data={providersList}
						keyExtractor={(i) => i.name}
						renderItem={({ item: provider }) => (
							<Link
								href={{
									pathname: "/provider/[id]",
									params: { id: provider.id },
								}}
							>
								<Image
									src={`${process.env.EXPO_PUBLIC_TMDB_IMAGE_URL}/w500/${provider.logo_path}`}
									alt={provider.name}
									width={64}
									height={64}
									borderRadius="md"
									borderWidth={1}
									borderColor="neutral-6"
									marginHorizontal={8}
								/>
							</Link>
						)}
						contentContainerStyle={{ paddingHorizontal: 8 }}
						showsHorizontalScrollIndicator={false}
						horizontal
					/>
				</Section>
			</VStack>
		</ScrollView>
	);
};

export default ExploreScreen;
