import { Dimensions, FlatList, ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { tmdbConfig } from "@/libs/tmdb";
import { TrendsPage, getTrends } from "@/libs/tmdb/api/trending";
import { genresList } from "@/utils/genresList";
import { providersList } from "@/utils/providersList";
import { ErrorState } from "@/components/commons";
import { Section } from "@/components/layouts";
import { Box, Image, Link, SubHeading, VStack } from "@/components/ui";
import PosterCard from "@/features/poster-card";
import PersonCard from "@/features/person-card";
import PosterCardSkeleton from "@/features/poster-card/components/PosterSkeleton";
import PersonCardSkeleton from "@/features/person-card/components/PersonCardSkeleton";

const ExploreScreen = () => {
	const { width } = Dimensions.get("screen");
	const trendingSpacing = (width - 150) / 32;

	const dailyTrendsQuery = useQuery<TrendsPage<"all">, Error>({
		queryKey: ["trending", "all"],
		queryFn: () => getTrends("all", "day"),
	});

	const moviesTrendsQuery = useQuery<TrendsPage<"movie">, Error>({
		queryKey: ["trending", "movies"],
		queryFn: () => getTrends("movie", "week"),
	});

	const showsTrendsQuery = useQuery<TrendsPage<"tv">, Error>({
		queryKey: ["trending", "shows"],
		queryFn: () => getTrends("tv", "week"),
	});

	const peopleTrendsQuery = useQuery<TrendsPage<"person">, Error>({
		queryKey: ["trending", "person"],
		queryFn: () => getTrends("person", "week"),
	});

	if (dailyTrendsQuery.isError)
		return <ErrorState retry={dailyTrendsQuery.refetch} />;
	if (moviesTrendsQuery.isError)
		return <ErrorState retry={moviesTrendsQuery.refetch} />;
	if (showsTrendsQuery.isError)
		return <ErrorState retry={showsTrendsQuery.refetch} />;
	if (peopleTrendsQuery.isError)
		return <ErrorState retry={peopleTrendsQuery.refetch} />;

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{
				paddingBottom: 64,
			}}
		>
			{dailyTrendsQuery.isLoading ? (
				<FlatList
					data={Array.from({ length: 4 }, (_, i) => i)}
					keyExtractor={(item) => item.toString()}
					renderItem={() => (
						<PosterCardSkeleton
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
					data={dailyTrendsQuery.data.results}
					keyExtractor={(p) => p.id}
					renderItem={({ item: poster }) => (
						<PosterCard
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
							<Box marginHorizontal={4} borderRadius="md" overflow="hidden">
								<Image
									src={`${tmdbConfig.links.image}/w780/${genre.backdrop_path}`}
									alt={genre.name}
									width={140}
									aspectRatio={16 / 9}
								/>
								<Box
									position="absolute"
									top={0}
									right={0}
									bottom={0}
									left={0}
									bg="black"
									opacity={0.4}
								/>
								<Box position="absolute" bottom={8} left={12}>
									<SubHeading color="white">{genre.name}</SubHeading>
								</Box>
							</Box>
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
							renderItem={() => <PosterCardSkeleton mx={8} />}
							contentContainerStyle={{ paddingHorizontal: 8 }}
							horizontal={true}
						/>
					) : (
						<FlatList
							data={moviesTrendsQuery.data.results}
							keyExtractor={(p) => p.id}
							renderItem={({ item: poster }) => (
								<PosterCard
									poster={poster}
									size="sm"
									style={{ marginHorizontal: 8 }}
								/>
							)}
							contentContainerStyle={{ paddingHorizontal: 8 }}
							showsHorizontalScrollIndicator={false}
							horizontal
						/>
					)}
				</Section>

				<Section title="Shows" size="lg" flatlist>
					{showsTrendsQuery.isLoading ? (
						<FlatList
							data={Array.from({ length: 4 }, (_, i) => i)}
							keyExtractor={(item) => item.toString()}
							renderItem={() => <PosterCardSkeleton mx={8} />}
							contentContainerStyle={{ paddingHorizontal: 8 }}
							horizontal={true}
						/>
					) : (
						<FlatList
							data={showsTrendsQuery.data.results}
							keyExtractor={(p) => p.id}
							renderItem={({ item: poster }) => (
								<PosterCard
									poster={poster}
									size="sm"
									style={{ marginHorizontal: 8 }}
								/>
							)}
							contentContainerStyle={{ paddingHorizontal: 8 }}
							showsHorizontalScrollIndicator={false}
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
							data={peopleTrendsQuery.data.results}
							keyExtractor={(p) => p.id}
							renderItem={({ item: person }) => (
								<PersonCard person={person} mx={8} />
							)}
							contentContainerStyle={{ paddingHorizontal: 8 }}
							showsHorizontalScrollIndicator={false}
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
									src={`${tmdbConfig.links.image}/w500/${provider.logo_path}`}
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
