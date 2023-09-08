import { FlatList, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getDateWithYear, getYear } from "@/utils/dates";
import { getShow } from "@/libs/axios/api/details";
import { ShowDetails } from "@/libs/axios/types/Show";
import {
	Body,
	Box,
	Button,
	HStack,
	Heading,
	Metadata,
	Subtitle,
	Title,
	VStack,
} from "@/components/ui";
import Video from "@/features/video";
import Card from "@/features/card";
import Person from "@/features/person";

const MovieScreen = () => {
	const { id } = useLocalSearchParams<{ id: string }>();

	const query = useQuery<ShowDetails, Error>({
		queryKey: ["movie", id],
		queryFn: () => getShow(id),
	});

	if (query.isLoading) return null;

	if (query.isError) return null;

	const {
		video,
		backdrop_path,
		name,
		first_air_date,
		last_episode_to_air,
		overview,
		genres,
		recommendations,
		cast,
		created_by,
		in_production,
	} = query.data;

	return (
		<ScrollView
			stickyHeaderIndices={[0]}
			showsVerticalScrollIndicator={false}
			bounces={false}
		>
			<Video video={video} backdropPath={backdrop_path} />

			<VStack pt={16} pb={64} space={24}>
				<VStack px={16} space={4}>
					{name.length > 0 && <Heading>{name}</Heading>}
					<HStack space={8}>
						{first_air_date.length > 0 && (
							<Subtitle>{getYear(new Date(first_air_date))}</Subtitle>
						)}
						{first_air_date.length > 0 &&
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

				{overview.length > 0 && (
					<Body px={16} textAlign="justify">
						{overview}
					</Body>
				)}

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
											pathname: "/(app)/show/[id]",
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

				{created_by.length > 0 && (
					<VStack space={8}>
						<Title pl={16}>Created By</Title>
						<FlatList
							data={created_by}
							keyExtractor={(c) => c.id.toString()}
							renderItem={({ item: member }) => <Person {...member} mx={4} />}
							contentContainerStyle={{ paddingHorizontal: 12 }}
							showsHorizontalScrollIndicator={false}
							horizontal
						/>
					</VStack>
				)}

				<VStack px={16} space={4}>
					<Title>Informations</Title>

					{first_air_date.length > 0 && (
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

export default MovieScreen;
