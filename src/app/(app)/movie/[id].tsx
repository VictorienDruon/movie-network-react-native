import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { formatDuration } from "@/utils/time";
import { pluralize } from "@/utils/texts";
import { getDateWithYear, getYear } from "@/utils/dates";
import { formatMoney } from "@/utils/numbers";
import { getMovie } from "@/libs/axios/api/details";
import Movie from "@/libs/axios/types/Movie";
import { ErrorState } from "@/components/common";
import {
	Body,
	Box,
	Button,
	HStack,
	Heading,
	Image,
	Metadata,
	Skeleton,
	Subtitle,
	Title,
	VStack,
	Video,
} from "@/components/ui";
import { Poster } from "@/features/poster";
import { Person } from "@/features/person";
import PosterSkeleton from "@/features/poster/components/PosterSkeleton";
import PersonSkeleton from "@/features/person/components/PersonSkeleton";

const MovieScreen = () => {
	const { id } = useLocalSearchParams<{ id: string }>();

	const query = useQuery<Movie, Error>({
		queryKey: ["movie", id],
		queryFn: () => getMovie(id),
	});

	if (query.isLoading)
		return (
			<VStack space={16}>
				<Skeleton width="100%" aspectRatio={16 / 9} />

				<VStack pb={64} space={24}>
					<VStack px={16} space={4}>
						<Skeleton width={256} height={24} borderRadius="md" />
						<Skeleton width={128} height={14} borderRadius="md" />
					</VStack>

					<VStack px={16} space={8}>
						<Button variant="primary" leftIcon="Play" fillIcon={true}>
							Play
						</Button>
						<Button variant="outline" leftIcon="Plus">
							Add to Watchlist
						</Button>
					</VStack>

					<VStack px={16} space={4}>
						<Skeleton width="100%" height={16} borderRadius="md" />
						<Skeleton width="100%" height={16} borderRadius="md" />
						<Skeleton width="30%" height={16} borderRadius="md" />
					</VStack>

					<HStack px={16} space={8}>
						<Skeleton width={64} height={20} borderRadius="lg" />
						<Skeleton width={64} height={20} borderRadius="lg" />
						<Skeleton width={64} height={20} borderRadius="lg" />
					</HStack>

					<VStack pl={16} space={8}>
						<Title>Recommendations</Title>
						<HStack space={16}>
							<PosterSkeleton />
							<PosterSkeleton />
							<PosterSkeleton />
							<PosterSkeleton />
						</HStack>
					</VStack>

					<VStack pl={16} space={8}>
						<Title>Cast</Title>
						<HStack space={16}>
							<PersonSkeleton />
							<PersonSkeleton />
							<PersonSkeleton />
							<PersonSkeleton />
						</HStack>
					</VStack>
				</VStack>
			</VStack>
		);

	if (query.isError) return <ErrorState retry={query.refetch} />;

	const {
		title,
		poster_path,
		backdrop_path,
		overview,
		release_date,
		runtime,
		budget,
		revenue,
		genres,
		collection,
		companies,
		countries,
		languages,
		cast,
		crew,
		recommendations,
		videoKey,
	} = query.data;

	return (
		<ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
			<Video
				videoKey={videoKey}
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
								<Poster mx={8} poster={recommendation} />
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
							keyExtractor={(p) => p.id.toString() + p.role}
							renderItem={({ item: person }) => (
								<Person person={person} mx={4} />
							)}
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
							keyExtractor={(p) => p.id.toString() + p.role}
							renderItem={({ item: person }) => (
								<Person person={person} mx={4} />
							)}
							contentContainerStyle={{ paddingHorizontal: 12 }}
							showsHorizontalScrollIndicator={false}
							horizontal
						/>
					</VStack>
				)}

				{collection && (
					<VStack px={16} space={8}>
						<Title>Collection</Title>
						<VStack width={175} space={2}>
							<Link
								href={{
									pathname: "/(app)/collection/[id]",
									params: { id: collection.id },
								}}
								asChild
							>
								<TouchableOpacity>
									<Image
										src={`https://image.tmdb.org/t/p/w300${collection.backdrop_path}`}
										alt={collection.name}
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
								{collection.name}
							</Body>
						</VStack>
					</VStack>
				)}

				<VStack px={16} space={4}>
					<Title>Informations</Title>
					{companies.length > 0 && (
						<Box>
							<Body fontSize={13}>{pluralize(companies.length, "Studio")}</Body>
							<Metadata>{companies.join(", ")}</Metadata>
						</Box>
					)}

					{countries.length > 0 && (
						<Box>
							<Body fontSize={13}>{`${pluralize(
								countries.length,
								"Region"
							)} of origin`}</Body>
							<Metadata>{countries.join(", ")}</Metadata>
						</Box>
					)}

					{release_date.length > 0 && (
						<Box>
							<Body fontSize={13}>Release Date</Body>
							<Metadata>{getDateWithYear(new Date(release_date))}</Metadata>
						</Box>
					)}

					{languages.length > 0 && (
						<Box>
							<Body fontSize={13}>
								{pluralize(languages.length, "Language")}
							</Body>
							<Metadata>{languages.join(", ")}</Metadata>
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
