import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { formatDuration } from "@/utils/time";
import { pluralize } from "@/utils/texts";
import { getDateWithYear, getYear } from "@/utils/dates";
import { formatMoney } from "@/utils/numbers";
import { getMovie, getTv } from "@/libs/axios/api/details";
import Details from "@/libs/axios/types/Details";
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

const DetailsScreen = () => {
	const { type, id } = useLocalSearchParams<{
		type: "movie" | "tv";
		id: string;
	}>();

	const getDetails = type === "movie" ? getMovie : getTv;

	const query = useQuery<Details, Error>({
		queryKey: [type, id],
		queryFn: () => getDetails(id),
	});

	if (query.isLoading)
		return (
			<>
				<Stack.Screen options={{ title: "" }} />

				<VStack space={12}>
					<Skeleton width="100%" aspectRatio={16 / 9} />

					<VStack space={24}>
						<VStack px={16} space={4}>
							<Skeleton width={256} height={26} borderRadius="md" />
							<Skeleton width={128} height={14} borderRadius="md" />
						</VStack>

						<VStack px={16} space={8}>
							<Button
								variant="primary"
								leftIcon="Play"
								fillIcon={true}
								onPress={() =>
									router.push({
										pathname: "/(app)/details/[type]/[id]/providers",
										params: { type, id },
									})
								}
							>
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

						<VStack space={8}>
							<Title pl={16}>Recommendations</Title>
							<FlatList
								data={Array.from({ length: 4 }, (_, i) => i)}
								keyExtractor={(item) => item.toString()}
								renderItem={() => <PosterSkeleton mx={8} />}
								contentContainerStyle={{ paddingHorizontal: 8 }}
								horizontal={true}
								scrollEnabled={false}
							/>
						</VStack>

						<VStack space={8}>
							<Title pl={16}>Cast</Title>
							<FlatList
								data={Array.from({ length: 4 }, (_, i) => i)}
								keyExtractor={(item) => item.toString()}
								renderItem={() => <PersonSkeleton mx={4} />}
								contentContainerStyle={{ paddingHorizontal: 12 }}
								horizontal={true}
								scrollEnabled={false}
							/>
						</VStack>
					</VStack>
				</VStack>
			</>
		);

	if (query.isError) return <ErrorState retry={query.refetch} />;

	const {
		title,
		poster_path,
		backdrop_path,
		overview,
		release_date,
		last_episode_to_air,
		in_production,
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
		<>
			<Stack.Screen options={{ title }} />

			<ScrollView
				stickyHeaderIndices={[0]}
				showsVerticalScrollIndicator={false}
			>
				<Video
					videoKey={videoKey}
					backdropPath={backdrop_path}
					posterPath={poster_path}
				/>

				<VStack pt={12} pb={64} space={24}>
					<VStack px={16} space={4}>
						{title?.length > 0 && <Heading>{title}</Heading>}
						<HStack space={8}>
							{release_date?.length > 0 && (
								<Subtitle>{getYear(new Date(release_date))}</Subtitle>
							)}
							{release_date?.length > 0 &&
								(runtime > 0 || last_episode_to_air?.season_number > 0) && (
									<Subtitle>•</Subtitle>
								)}
							{type === "movie"
								? runtime > 0 && <Subtitle>{formatDuration(runtime)}</Subtitle>
								: last_episode_to_air?.season_number > 0 && (
										<Subtitle>{`${last_episode_to_air.season_number} seasons`}</Subtitle>
								  )}
						</HStack>
					</VStack>

					<VStack px={16} space={8}>
						<Button
							variant="primary"
							leftIcon="Play"
							fillIcon={true}
							onPress={() =>
								router.push({
									pathname: "/(app)/details/[type]/[id]/providers",
									params: { type, id },
								})
							}
						>
							Play
						</Button>
						<Button variant="outline" leftIcon="Plus">
							Add to Watchlist
						</Button>
					</VStack>

					{overview?.length > 0 && <Body px={16}>{overview}</Body>}

					{genres?.length > 0 && (
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

					{recommendations?.length > 0 && (
						<VStack space={8}>
							<Title pl={16}>Recommendations</Title>
							<FlatList
								data={recommendations}
								keyExtractor={(r) => r.tmdb_id.toString()}
								renderItem={({ item: recommendation }) => (
									<Poster poster={recommendation} mx={8} />
								)}
								contentContainerStyle={{ paddingHorizontal: 8 }}
								showsHorizontalScrollIndicator={false}
								horizontal
							/>
						</VStack>
					)}

					{cast?.length > 0 && (
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

					{crew?.length > 0 && (
						<VStack space={8}>
							<Title pl={16}>{type === "movie" ? "Crew" : "Created By"}</Title>
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
						{companies?.length > 0 && (
							<Box>
								<Body fontSize={13}>
									{pluralize(companies?.length, "Studio")}
								</Body>
								<Metadata>{companies.join(", ")}</Metadata>
							</Box>
						)}

						{countries?.length > 0 && (
							<Box>
								<Body fontSize={13}>{`${pluralize(
									countries?.length,
									"Region"
								)} of origin`}</Body>
								<Metadata>{countries.join(", ")}</Metadata>
							</Box>
						)}

						{release_date?.length > 0 && (
							<Box>
								<Body fontSize={13}>
									{type === "movie" ? "Release Date" : "First Air Date"}
								</Body>
								<Metadata>{getDateWithYear(new Date(release_date))}</Metadata>
							</Box>
						)}

						{languages?.length > 0 && (
							<Box>
								<Body fontSize={13}>
									{pluralize(languages?.length, "Language")}
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

						{last_episode_to_air && (
							<Box>
								<Body fontSize={13}>Last Episode to Air</Body>
								<Metadata>
									{`S${last_episode_to_air.season_number}E${last_episode_to_air.episode_number} - ${last_episode_to_air.name}`}
								</Metadata>
							</Box>
						)}

						{type === "tv" && (
							<Box>
								<Body fontSize={13}>In Production</Body>
								<Metadata>{in_production ? "Yes" : "No"}</Metadata>
							</Box>
						)}
					</VStack>
				</VStack>
			</ScrollView>
		</>
	);
};

export default DetailsScreen;
