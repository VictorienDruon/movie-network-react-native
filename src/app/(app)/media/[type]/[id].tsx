import { useEffect, useRef, useState } from "react";
import { FlatList, ScrollView } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { getLocales } from "expo-localization";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDuration } from "@/utils/time";
import { supabase } from "@/libs/supabase";
import {
	updateWatchlist,
	handleUpdateWatchlist,
	isMediaInWatchlist,
	Status,
} from "@/libs/supabase/api/watchlist";
import NewMedia from "@/libs/supabase/types/NewMedia";
import { getMovie, getShow } from "@/libs/tmdb/api/media";
import { getDateWithYear, getYear } from "@/utils/dates";
import { pluralize } from "@/utils/texts";
import { formatMoney } from "@/utils/numbers";
import { EmptyState, ErrorState } from "@/components/commons";
import {
	Body,
	Box,
	Button,
	HStack,
	Image,
	Icon,
	Link,
	Sheet,
	SubHeading,
	Subtitle,
	VStack,
	Video,
} from "@/components/ui";
import { MediaSkeleton } from "@/components/skeletons";
import { Information, Section } from "@/components/layouts";
import PosterCard from "@/features/poster-card";
import PersonCard from "@/features/person-card";
import RegionCard from "@/features/region-card";
import Region from "@/features/region-card/types/Region";
import ProviderIcon from "@/features/provider-icon";
import useUser from "@/hooks/useUser";
import { createSignInAlert } from "@/features/sign-in/SignInAlert";

const MediaScreen = () => {
	const { type, id } = useLocalSearchParams<{
		type: "movie" | "tv";
		id: string;
	}>();
	const queryClient = useQueryClient();
	const user = useUser();

	const providersRef = useRef(null);
	const regionsRef = useRef(null);
	const [selectedRegion, setSelectedRegion] = useState<Region>(null);
	const { regionCode } = getLocales()[0];

	const getMedia = type === "movie" ? getMovie : getShow;

	const mediaQuery = useQuery({
		queryKey: ["media", type, id],
		queryFn: () => getMedia(id),
	});

	const isInWatchlistQuery = useQuery({
		queryKey: ["isInWatchlist", type, id],
		queryFn: () => isMediaInWatchlist(type, id),
		enabled: !!user,
	});

	const watchlistMutation = useMutation(updateWatchlist, {
		onSuccess: () => handleUpdateWatchlist(queryClient, type, id),
	});

	const handleUpdateWatchlistPress = async (
		media: NewMedia,
		status: Status
	) => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		watchlistMutation.mutate({ user_id: user.id, media, status });
	};

	useEffect(() => {
		if (mediaQuery.data) {
			const selectedRegion =
				mediaQuery.data.regions.find((region) => region.code === regionCode) ||
				mediaQuery.data.regions[0];
			setSelectedRegion(selectedRegion);
		}
	}, [mediaQuery.data]);

	if (mediaQuery.isLoading || (user && isInWatchlistQuery.isLoading))
		return <MediaSkeleton />;

	if (mediaQuery.isError) return <ErrorState retry={mediaQuery.refetch} />;
	if (isInWatchlistQuery.isError)
		return <ErrorState retry={isInWatchlistQuery.refetch} />;

	const {
		title,
		date,
		voteAverage,
		overview,
		posterPath,
		backdropPath,
		videoKey,
		genres,
		recommendations,
		cast,
		crew,
		providers,
		regions,
		runtime,
		collection,
		companiesNames,
		countriesNames,
		languagesNames,
		budget,
		revenue,
		createdBy,
		lastEpisodeToAir,
		inProduction,
	} = mediaQuery.data;

	const media: NewMedia = {
		id: parseInt(id),
		type,
		title,
		poster_path: posterPath,
		backdrop_path: backdropPath,
		date,
		runtime,
		season_number: lastEpisodeToAir?.seasonNumber,
		rating: voteAverage,
		overview,
	};

	return (
		<>
			<Stack.Screen options={{ title }} />

			<Video
				videoKey={videoKey}
				backdropPath={backdropPath}
				posterPath={posterPath}
			/>

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingTop: 24,
					paddingBottom: 128,
				}}
			>
				<VStack space={24}>
					<Section title={title} size="lg" space={4}>
						<HStack space={8}>
							{date?.length > 0 && (
								<Subtitle>{getYear(new Date(date))}</Subtitle>
							)}
							{date?.length > 0 && (runtime > 0 || lastEpisodeToAir) && (
								<Subtitle>•</Subtitle>
							)}
							{type === "movie"
								? runtime > 0 && <Subtitle>{formatDuration(runtime)}</Subtitle>
								: lastEpisodeToAir && (
										<Subtitle>{`${lastEpisodeToAir.seasonNumber} seasons`}</Subtitle>
								  )}
							{(date?.length > 0 || runtime > 0 || lastEpisodeToAir) &&
								voteAverage > 0 && <Subtitle>•</Subtitle>}
							{voteAverage > 0 && (
								<HStack justifyContent="center" alignItems="center" space={4}>
									<Subtitle>{voteAverage.toFixed(1)}</Subtitle>
									<Icon name="Star" size={12} fill />
								</HStack>
							)}
						</HStack>
					</Section>

					<Section>
						<Button
							variant="primary"
							leftIcon="Play"
							fillIcon={true}
							onPress={() => providersRef.current.snapToIndex(0)}
						>
							Play
						</Button>
						{user && isInWatchlistQuery.data ? (
							<HStack justifyContent="space-between" space={8}>
								<Box flex={1}>
									<Button
										variant="outline"
										leftIcon="Check"
										disabled={watchlistMutation.isLoading}
										onPress={() => handleUpdateWatchlistPress(media, "seen")}
									>
										Seen
									</Button>
								</Box>
								<Box flex={1}>
									<Button
										variant="outline"
										leftIcon="Trash"
										disabled={watchlistMutation.isLoading}
										onPress={() => handleUpdateWatchlistPress(media, "deleted")}
									>
										Remove
									</Button>
								</Box>
							</HStack>
						) : (
							<Button
								variant="outline"
								leftIcon="Plus"
								disabled={watchlistMutation.isLoading}
								onPress={
									user
										? () => handleUpdateWatchlistPress(media, "active")
										: createSignInAlert
								}
							>
								Add to Watchlist
							</Button>
						)}
					</Section>

					{overview?.length > 0 && (
						<Section>
							<Body>{overview}</Body>
						</Section>
					)}

					{genres?.length > 0 && (
						<Section>
							<HStack flexWrap="wrap" space={8}>
								{genres.map((genre) => (
									<Link
										key={genre.id}
										href={{
											pathname: "/genre/[id]",
											params: { id: genre.id },
										}}
									>
										<Box px={12} py={4} bg="neutral-3" borderRadius="lg">
											<Body color="neutral-11">{genre.name}</Body>
										</Box>
									</Link>
								))}
							</HStack>
						</Section>
					)}

					{recommendations?.length > 0 && (
						<Section title="Recommendations" flatlist>
							<FlatList
								data={recommendations}
								keyExtractor={(r) => r.id}
								renderItem={({ item: recommendation }) => (
									<PosterCard poster={recommendation} mx={8} />
								)}
								contentContainerStyle={{ paddingHorizontal: 8 }}
								showsHorizontalScrollIndicator={false}
								horizontal
							/>
						</Section>
					)}

					{cast?.length > 0 && (
						<Section title="Cast" flatlist>
							<FlatList
								data={cast}
								keyExtractor={(p) => p.id + p.role}
								renderItem={({ item: person }) => (
									<PersonCard person={person} mx={4} />
								)}
								contentContainerStyle={{ paddingHorizontal: 12 }}
								showsHorizontalScrollIndicator={false}
								horizontal
							/>
						</Section>
					)}

					{crew?.length > 0 && (
						<Section title="Crew" flatlist>
							<FlatList
								data={crew}
								keyExtractor={(m) => m.id + m.role}
								renderItem={({ item: person }) => (
									<PersonCard person={person} mx={4} />
								)}
								contentContainerStyle={{ paddingHorizontal: 12 }}
								showsHorizontalScrollIndicator={false}
								horizontal
							/>
						</Section>
					)}

					{collection && (
						<Section title="Collection">
							<PosterCard poster={collection} orientation="horizontal" />
						</Section>
					)}

					<Section title="Informations">
						{companiesNames?.length > 0 && (
							<Information
								title={pluralize(companiesNames.length, "Studio")}
								content={companiesNames.join(", ")}
							/>
						)}

						{countriesNames?.length > 0 && (
							<Information
								title={pluralize(countriesNames.length, "Region")}
								content={countriesNames.join(", ")}
							/>
						)}

						{createdBy?.length > 0 && (
							<Information title="Created By" content={createdBy.join(", ")} />
						)}

						{date?.length > 0 && (
							<Information
								title={type === "movie" ? "Release Date" : "First Air Date"}
								content={getDateWithYear(new Date(date))}
							/>
						)}

						{languagesNames?.length > 0 && (
							<Information
								title={pluralize(languagesNames.length, "Language")}
								content={languagesNames.join(", ")}
							/>
						)}

						{budget > 0 && (
							<Information title="Budget" content={formatMoney(budget)} />
						)}
						{revenue > 0 && (
							<Information title="Revenue" content={formatMoney(revenue)} />
						)}

						{lastEpisodeToAir && (
							<Information
								title="Last Episode to Air"
								content={`S${lastEpisodeToAir.seasonNumber}E${lastEpisodeToAir.episodeNumber} - ${lastEpisodeToAir.name}`}
							/>
						)}

						{type === "tv" && (
							<Information
								title="In Production"
								content={inProduction ? "Yes" : "No"}
							/>
						)}
					</Section>
				</VStack>
			</ScrollView>

			<Sheet ref={providersRef} snaps={["35%", "70%"]}>
				{selectedRegion ? (
					<VStack space={24}>
						<HStack alignItems="center" space={16} px={16}>
							<Image
								src={selectedRegion.flagUrl}
								alt={selectedRegion.name}
								width={28}
								height={28}
								borderRadius="full"
								borderWidth={1}
								borderColor="neutral-6"
							/>

							<Box flex={1} maxWidth="70%">
								<SubHeading numberOfLines={1} ellipsizeMode="tail">
									{selectedRegion.name}
								</SubHeading>
							</Box>

							<Button
								onPress={() => regionsRef.current.snapToIndex(0)}
								leftIcon="Repeat"
								size="md"
							>
								Region
							</Button>
						</HStack>

						<VStack space={16}>
							{providers[selectedRegion.code].flatrate && (
								<Section title="Streaming" flatlist>
									<FlatList
										data={providers[selectedRegion.code].flatrate}
										keyExtractor={(p) => p.provider_id}
										renderItem={({ item: provider }) => (
											<ProviderIcon
												link={providers[selectedRegion.code].link}
												provider={provider}
											/>
										)}
										contentContainerStyle={{ paddingHorizontal: 8 }}
										showsHorizontalScrollIndicator={false}
										horizontal
									/>
								</Section>
							)}

							{providers[selectedRegion.code].buy && (
								<Section title="Buy" flatlist>
									<FlatList
										data={providers[selectedRegion.code].buy}
										keyExtractor={(p) => p.provider_id}
										renderItem={({ item: provider }) => (
											<ProviderIcon
												link={providers[selectedRegion.code].link}
												provider={provider}
											/>
										)}
										contentContainerStyle={{ paddingHorizontal: 8 }}
										showsHorizontalScrollIndicator={false}
										horizontal
									/>
								</Section>
							)}

							{providers[selectedRegion.code].rent && (
								<Section title="Rent" flatlist>
									<FlatList
										data={providers[selectedRegion.code].rent}
										keyExtractor={(p) => p.provider_id}
										renderItem={({ item: provider }) => (
											<ProviderIcon
												link={providers[selectedRegion.code].link}
												provider={provider}
											/>
										)}
										contentContainerStyle={{ paddingHorizontal: 8 }}
										showsHorizontalScrollIndicator={false}
										horizontal
									/>
								</Section>
							)}
						</VStack>
					</VStack>
				) : (
					<EmptyState>No providers were found.</EmptyState>
				)}
			</Sheet>

			{selectedRegion && (
				<Sheet ref={regionsRef} snaps={["90%"]}>
					<Box py={8} borderBottomWidth={1} borderColor="neutral-6">
						<SubHeading px={16}>Available Regions</SubHeading>
					</Box>

					<FlatList
						data={regions}
						keyExtractor={(r) => r.code}
						renderItem={({ item: region }) => (
							<RegionCard
								region={region}
								isSelected={region === selectedRegion}
								onPress={() => setSelectedRegion(region)}
							/>
						)}
						contentContainerStyle={{
							paddingTop: 8,
							paddingBottom: 128,
							paddingHorizontal: 16,
						}}
					/>
				</Sheet>
			)}
		</>
	);
};

export default MediaScreen;
