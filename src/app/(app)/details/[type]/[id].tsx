import { useRef, useState } from "react";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { CountryData } from "emoji-flags";
import BottomSheet from "@gorhom/bottom-sheet";
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
	Subtitle,
	Title,
	VStack,
	Video,
} from "@/components/ui";
import { Poster } from "@/features/poster";
import Information from "@/features/details/components/Information";
import DetailsSkeleton from "@/features/details/components/DetailsSkeleton";
import Credits from "@/features/details/components/Credits";
import { ProvidersBottomSheet } from "@/features/details/bottom-sheets/Providers";

const DetailsScreen = () => {
	const { type, id } = useLocalSearchParams<{
		type: "movie" | "tv";
		id: string;
	}>();
	const [region, setRegion] = useState<CountryData>(null);
	const providersBottomSheetRef = useRef<BottomSheet>(null);

	const getDetails = type === "movie" ? getMovie : getTv;

	const query = useQuery<Details, Error>({
		queryKey: [type, id],
		queryFn: () => getDetails(id),
	});

	if (query.isLoading) return <DetailsSkeleton />;

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
		providers,
		providersRegions,
		defaultRegion,
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
							onPress={() => providersBottomSheetRef.current.snapToIndex(0)}
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

					{cast?.length > 0 && <Credits title="Cast" persons={cast} />}

					{crew?.length > 0 && (
						<Credits
							title={type === "movie" ? "Crew" : "Created By"}
							persons={crew}
						/>
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
							<Information
								title={pluralize(companies.length, "Studio")}
								content={companies.join(", ")}
							/>
						)}

						{countries?.length > 0 && (
							<Information
								title={pluralize(countries.length, "Region")}
								content={countries.join(", ")}
							/>
						)}

						{release_date?.length > 0 && (
							<Information
								title={type === "movie" ? "Release Date" : "First Air Date"}
								content={getDateWithYear(new Date(release_date))}
							/>
						)}

						{languages?.length > 0 && (
							<Information
								title={pluralize(languages.length, "Language")}
								content={languages.join(", ")}
							/>
						)}

						{budget > 0 && (
							<Information title="Budget" content={formatMoney(budget)} />
						)}
						{revenue > 0 && (
							<Information title="Revenue" content={formatMoney(revenue)} />
						)}

						{last_episode_to_air && (
							<Information
								title="Last Episode to Air"
								content={`S${last_episode_to_air.season_number}E${last_episode_to_air.episode_number} - ${last_episode_to_air.name}`}
							/>
						)}

						{type === "tv" && (
							<Information
								title="In Production"
								content={in_production ? "Yes" : "No"}
							/>
						)}
					</VStack>
				</VStack>
			</ScrollView>

			<ProvidersBottomSheet
				ref={providersBottomSheetRef}
				region={region}
				providers={providers[region.code]}
			/>
		</>
	);
};

export default DetailsScreen;
