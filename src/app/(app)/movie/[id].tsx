import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { formatDuration } from "@/utils/time";
import { pluralize } from "@/utils/texts";
import { getDateWithYear, getYear } from "@/utils/dates";
import { formatMoney } from "@/utils/numbers";
import { getMovie } from "@/libs/axios/api/details";
import { MovieDetails } from "@/libs/axios/types/Movie";
import {
	Body,
	Box,
	Button,
	HStack,
	Heading,
	Image,
	Metadata,
	Subtitle,
	Title,
	VStack,
} from "@/components/ui";
import Card from "@/features/card";
import Person from "@/features/person";
import Video from "@/components/ui/video";

const MovieScreen = () => {
	const { id } = useLocalSearchParams<{ id: string }>();

	const query = useQuery<MovieDetails, Error>({
		queryKey: ["movie", id],
		queryFn: () => getMovie(id),
	});

	if (query.isLoading) return null;

	if (query.isError) return null;

	const {
		video,
		backdrop_path,
		poster_path,
		title,
		release_date,
		runtime,
		overview,
		genres,
		recommendations,
		cast,
		crew,
		belongs_to_collection,
		production_companies,
		production_countries,
		spoken_languages,
		budget,
		revenue,
	} = query.data;

	return (
		<ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
			<Video
				video={video}
				backdropPath={backdrop_path}
				posterPath={poster_path}
			/>

			<VStack pt={16} pb={64} space={24}>
				<VStack px={16} space={4}>
					{title.length > 0 && <Heading>{title}</Heading>}
					<HStack space={8}>
						{release_date.length > 0 && (
							<Subtitle>{getYear(new Date(release_date))}</Subtitle>
						)}
						{release_date.length > 0 && runtime > 0 && <Subtitle>•</Subtitle>}
						{runtime > 0 && <Subtitle>{formatDuration(runtime)}</Subtitle>}
					</HStack>
				</VStack>

				<VStack px={16} space={8}>
					<Button variant="primary" leftIcon="Play" fillIcon={true}>
						Play
					</Button>
					<Button variant="outline" leftIcon="Plus">
						Add to Watchlist
					</Button>
				</VStack>

				{overview.length > 0 && <Body px={16}>{overview}</Body>}

				{genres.length > 0 && (
					<HStack px={16} flexWrap="wrap" space={8}>
						{genres.map((genre) => (
							<Box
								key={genre.id}
								px={8}
								py={4}
								bg="neutral-3"
								borderRadius="lg"
							>
								<Metadata>{genre.name}</Metadata>
							</Box>
						))}
					</HStack>
				)}

				{recommendations.length > 0 && (
					<VStack space={8}>
						<Title pl={16}>Recommendations</Title>
						<FlatList
							data={recommendations}
							keyExtractor={(r) => r.id.toString()}
							renderItem={({ item: recommendation }) => (
								<Card
									{...recommendation}
									mx={8}
									onPress={() =>
										router.push({
											pathname: "/(app)/movie/[id]",
											params: { id: recommendation.id },
										})
									}
								/>
							)}
							contentContainerStyle={{ paddingHorizontal: 8 }}
							showsHorizontalScrollIndicator={false}
							horizontal
						/>
					</VStack>
				)}

				{cast.length > 0 && (
					<VStack space={8}>
						<Title pl={16}>Cast</Title>
						<FlatList
							data={cast}
							keyExtractor={(c) => c.id.toString()}
							renderItem={({ item: member }) => <Person {...member} mx={4} />}
							contentContainerStyle={{ paddingHorizontal: 12 }}
							showsHorizontalScrollIndicator={false}
							horizontal
						/>
					</VStack>
				)}

				{crew.length > 0 && (
					<VStack space={8}>
						<Title pl={16}>Crew</Title>
						<FlatList
							data={crew}
							keyExtractor={(c) => c.credit_id.toString()}
							renderItem={({ item: member }) => <Person {...member} mx={4} />}
							contentContainerStyle={{ paddingHorizontal: 12 }}
							showsHorizontalScrollIndicator={false}
							horizontal
						/>
					</VStack>
				)}

				{belongs_to_collection && (
					<VStack px={16} space={8}>
						<Title>Collection</Title>
						<VStack width={175} space={2}>
							<Link
								href={{
									pathname: "/(app)/collection/[id]",
									params: { id: belongs_to_collection.id },
								}}
								asChild
							>
								<TouchableOpacity>
									<Image
										src={`https://image.tmdb.org/t/p/w300${belongs_to_collection.backdrop_path}`}
										alt={belongs_to_collection.name}
										width={175}
										aspectRatio={16 / 9}
										borderRadius="sm"
										borderWidth={1}
										borderColor="neutral-6"
									/>
								</TouchableOpacity>
							</Link>
							<Body
								fontSize={13}
								textAlign="center"
								numberOfLines={1}
								ellipsizeMode="tail"
							>
								{belongs_to_collection.name}
							</Body>
						</VStack>
					</VStack>
				)}

				<VStack px={16} space={4}>
					<Title>Informations</Title>
					{production_companies.length > 0 && (
						<Box>
							<Body fontSize={13}>
								{pluralize(production_companies.length, "Studio")}
							</Body>
							<Metadata>
								{production_companies.flatMap((c) => c.name).join(", ")}
							</Metadata>
						</Box>
					)}

					{production_countries.length > 0 && (
						<Box>
							<Body fontSize={13}>{`${pluralize(
								production_countries.length,
								"Region"
							)} of origin`}</Body>
							<Metadata>
								{production_countries.flatMap((c) => c.name).join(", ")}
							</Metadata>
						</Box>
					)}

					{release_date.length > 0 && (
						<Box>
							<Body fontSize={13}>Release Date</Body>
							<Metadata>{getDateWithYear(new Date(release_date))}</Metadata>
						</Box>
					)}

					{spoken_languages.length > 0 && (
						<Box>
							<Body fontSize={13}>
								{pluralize(spoken_languages.length, "Language")}
							</Body>
							<Metadata>
								{spoken_languages.flatMap((l) => l.name).join(", ")}
							</Metadata>
						</Box>
					)}

					{budget > 0 && (
						<Box>
							<Body fontSize={13}>Budget</Body>
							<Metadata>{formatMoney(budget)}</Metadata>
						</Box>
					)}
					{revenue > 0 && (
						<Box>
							<Body fontSize={13}>Revenue</Body>
							<Metadata>{formatMoney(revenue)}</Metadata>
						</Box>
					)}
				</VStack>
			</VStack>
		</ScrollView>
	);
};

export default MovieScreen;
