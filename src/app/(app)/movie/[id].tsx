import { Dimensions, FlatList, ScrollView } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { formatTime } from "@/utils/time";
import { pluralize } from "@/utils/texts";
import { getDateWithYear } from "@/utils/dates";
import { formatMoney } from "@/utils/numbers";
import { getMovie } from "@/libs/axios/api/details";
import { MovieDetails } from "@/libs/axios/types/Movie";
import {
	Avatar,
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

const MovieScreen = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { width } = Dimensions.get("screen");
	const height = width * 0.5625;

	const query = useQuery<MovieDetails, Error>({
		queryKey: ["movie", id],
		queryFn: () => getMovie(id),
	});

	if (query.isLoading) return null;

	if (query.isError) return null;

	const {
		video,
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
			<YoutubePlayer videoId={video.key} height={height} play={true} />

			<VStack pt={16} pb={64} space={24}>
				<VStack px={16} space={4}>
					<Heading>{title}</Heading>
					<HStack space={8}>
						<Subtitle>{release_date.slice(0, 4)}</Subtitle>
						<Subtitle>•</Subtitle>
						<Subtitle>{formatTime(runtime)}</Subtitle>
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

				<Body px={16} textAlign="justify">
					{overview}
				</Body>

				<HStack px={16} flexWrap="wrap" space={8}>
					{genres.map((genre) => (
						<Box key={genre.id} px={8} py={4} bg="neutral-3" borderRadius="lg">
							<Metadata>{genre.name}</Metadata>
						</Box>
					))}
				</HStack>

				<VStack space={8}>
					<Title pl={16}>Recommendations</Title>
					<FlatList
						data={recommendations}
						keyExtractor={(r) => r.id.toString()}
						renderItem={({ item: recommendation }) => (
							<VStack alignItems="center" width={100} marginRight={8} space={2}>
								<Image
									src={`https://image.tmdb.org/t/p/w185${recommendation.poster_path}`}
									alt={recommendation.title}
									width={100}
									aspectRatio={5 / 7}
									borderRadius="sm"
								/>
								<Body
									fontSize={13}
									textAlign="center"
									numberOfLines={1}
									ellipsizeMode="tail"
								>
									{recommendation.title}
								</Body>
							</VStack>
						)}
						contentContainerStyle={{ paddingHorizontal: 16 }}
						showsHorizontalScrollIndicator={false}
						horizontal
					/>
				</VStack>

				<VStack space={8}>
					<Title pl={16}>Cast</Title>
					<FlatList
						data={cast}
						keyExtractor={(c) => c.id.toString()}
						renderItem={({ item: member }) => (
							<Box alignItems="center" width={96} mr={8}>
								<Avatar
									src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
									size={80}
									alt={member.name}
								/>
								<Body
									fontSize={13}
									textAlign="center"
									numberOfLines={1}
									ellipsizeMode="tail"
								>
									{member.name}
								</Body>
								<Metadata
									textAlign="center"
									numberOfLines={1}
									ellipsizeMode="tail"
								>
									{member.character}
								</Metadata>
							</Box>
						)}
						contentContainerStyle={{ paddingHorizontal: 16 }}
						showsHorizontalScrollIndicator={false}
						horizontal
					/>
				</VStack>

				<VStack space={8}>
					<Title pl={16}>Crew</Title>
					<FlatList
						data={crew}
						keyExtractor={(c) => c.credit_id.toString()}
						renderItem={({ item: member }) => (
							<Box alignItems="center" width={96} mr={8}>
								<Avatar
									src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
									size={80}
									alt={member.name}
								/>
								<Body
									fontSize={13}
									textAlign="center"
									numberOfLines={1}
									ellipsizeMode="tail"
								>
									{member.name}
								</Body>
								<Metadata
									textAlign="center"
									numberOfLines={1}
									ellipsizeMode="tail"
								>
									{member.job}
								</Metadata>
							</Box>
						)}
						contentContainerStyle={{ paddingHorizontal: 16 }}
						showsHorizontalScrollIndicator={false}
						horizontal
					/>
				</VStack>

				{belongs_to_collection && (
					<VStack px={16} space={8}>
						<Title>Collection</Title>
						<VStack width={175} space={2}>
							<Image
								src={`https://image.tmdb.org/t/p/w300${belongs_to_collection.backdrop_path}`}
								alt={belongs_to_collection.name}
								width={175}
								aspectRatio={16 / 9}
								borderRadius="sm"
							/>
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
					<Box>
						<Body fontSize={13}>
							{pluralize(production_companies.length, "Studio")}
						</Body>
						<Metadata>
							{production_companies.flatMap((c) => c.name).join(", ")}
						</Metadata>
					</Box>
					<Box>
						<Body fontSize={13}>{`${pluralize(
							production_companies.length,
							"Region"
						)} of origin`}</Body>
						<Metadata>
							{production_countries.flatMap((c) => c.name).join(", ")}
						</Metadata>
					</Box>
					<Box>
						<Body fontSize={13}>Release Date</Body>
						<Metadata>{getDateWithYear(new Date(release_date))}</Metadata>
					</Box>
					<Box>
						<Body fontSize={13}>
							{pluralize(spoken_languages.length, "Language")}
						</Body>
						<Metadata>
							{spoken_languages.flatMap((l) => l.name).join(", ")}
						</Metadata>
					</Box>
					<Box>
						<Body fontSize={13}>Budget</Body>
						<Metadata>{formatMoney(budget)}</Metadata>
					</Box>
					<Box>
						<Body fontSize={13}>Revenue</Body>
						<Metadata>{formatMoney(revenue)}</Metadata>
					</Box>
				</VStack>
			</VStack>
		</ScrollView>
	);
};

export default MovieScreen;
