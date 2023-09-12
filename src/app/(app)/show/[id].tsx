import { FlatList, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getDateWithYear, getYear } from "@/utils/dates";
import { getShow } from "@/libs/axios/api/details";
import Show from "@/libs/axios/types/Show";
import { ErrorState } from "@/components/common";
import {
	Body,
	Box,
	Button,
	HStack,
	Heading,
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

const ShowScreen = () => {
	const { id } = useLocalSearchParams<{ id: string }>();

	const query = useQuery<Show, Error>({
		queryKey: ["movie", id],
		queryFn: () => getShow(id),
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
						<Skeleton width="100%" height={30} borderRadius="lg" />
						<Skeleton width="100%" height={30} borderRadius="lg" />
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
							<FlatList
								data={Array.from({ length: 4 }, (_, i) => i)}
								keyExtractor={(item) => item.toString()}
								renderItem={() => <PosterSkeleton mx={8} />}
								horizontal={true}
								scrollEnabled={false}
							/>
						</HStack>
					</VStack>

					<VStack pl={16} space={8}>
						<Title>Cast</Title>
						<HStack space={16}>
							<FlatList
								data={Array.from({ length: 4 }, (_, i) => i)}
								keyExtractor={(item) => item.toString()}
								renderItem={() => <PersonSkeleton mx={4} />}
								horizontal={true}
								scrollEnabled={false}
							/>
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
		first_air_date,
		last_episode_to_air,
		in_production,
		genres,
		cast,
		created_by,
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
					{title?.length > 0 && <Heading>{title}</Heading>}
					<HStack space={8}>
						{first_air_date?.length > 0 && (
							<Subtitle>{getYear(new Date(first_air_date))}</Subtitle>
						)}
						{first_air_date?.length > 0 &&
							last_episode_to_air?.season_number > 0 && <Subtitle>•</Subtitle>}
						{last_episode_to_air?.season_number > 0 && (
							<Subtitle>{`${last_episode_to_air.season_number} seasons`}</Subtitle>
						)}
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
							keyExtractor={(person) => person.id.toString()}
							renderItem={({ item: person }) => (
								<Person person={person} mx={4} />
							)}
							contentContainerStyle={{ paddingHorizontal: 12 }}
							showsHorizontalScrollIndicator={false}
							horizontal
						/>
					</VStack>
				)}

				{created_by?.length > 0 && (
					<VStack space={8}>
						<Title pl={16}>Created By</Title>
						<FlatList
							data={created_by}
							keyExtractor={(person) => person.id.toString()}
							renderItem={({ item: person }) => (
								<Person person={person} mx={4} />
							)}
							contentContainerStyle={{ paddingHorizontal: 12 }}
							showsHorizontalScrollIndicator={false}
							horizontal
						/>
					</VStack>
				)}

				<VStack px={16} space={4}>
					<Title>Informations</Title>

					{first_air_date?.length > 0 && (
						<Box>
							<Body fontSize={13}>First Air Date</Body>
							<Metadata>{getDateWithYear(new Date(first_air_date))}</Metadata>
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

					<Box>
						<Body fontSize={13}>In Production</Body>
						<Metadata>{in_production ? "Yes" : "No"}</Metadata>
					</Box>
				</VStack>
			</VStack>
		</ScrollView>
	);
};

export default ShowScreen;
