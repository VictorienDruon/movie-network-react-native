import { useEffect, useRef, useState } from "react";
import { FlatList, ScrollView } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { getLocales } from "expo-localization";
import { useQuery } from "@tanstack/react-query";
import { getCountry } from "iso-3166-1-alpha-2";
import { formatDuration } from "@/utils/time";
import { getMovie, getTv } from "@/libs/axios/api/media";
import Media from "@/libs/axios/types/Media";
import { getDateWithYear, getYear } from "@/utils/dates";
import { pluralize } from "@/utils/texts";
import { formatMoney } from "@/utils/numbers";
import { EmptyState, ErrorState } from "@/components/commons";
import {
	Avatar,
	Body,
	Box,
	Button,
	HStack,
	Heading,
	Metadata,
	Sheet,
	Subtitle,
	Title,
	VStack,
	Video,
} from "@/components/ui";
import MediaSkeleton from "@/components/skeletons/MediaSkeleton";
import Information from "@/components/layouts/information";
import { Poster } from "@/features/poster";
import { CreditMember } from "@/features/credit-member";
import { Providers } from "@/features/providers";
import { Region } from "@/features/region";

const MediaScreen = () => {
	const { type, id } = useLocalSearchParams<{
		type: "movie" | "tv";
		id: string;
	}>();

	const providersRef = useRef(null);
	const regionsRef = useRef(null);

	const [regions, setRegions] = useState<Region[]>(null);
	const [selectedRegion, setSelectedRegion] = useState<Region>(null);
	const { regionCode: userRegion } = getLocales()[0];

	const getMedia = type === "movie" ? getMovie : getTv;

	const query = useQuery<Media, Error>({
		queryKey: ["media", type, id],
		queryFn: () => getMedia(id),
	});

	useEffect(() => {
		if (query.isFetched) {
			const regions = Object.keys(query.data.providers).map((code) => ({
				name: getCountry(code),
				code,
				flag: `http://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`,
			}));
			const selectedRegion =
				regions.find((region) => region.code === userRegion) || regions[0];
			setRegions(regions);
			setSelectedRegion(selectedRegion);
		}
	}, [query.isFetched]);

	if (query.isLoading || selectedRegion === null) return <MediaSkeleton />;

	if (query.isError) return <ErrorState retry={query.refetch} />;

	const {
		title,
		poster_path,
		backdrop_path,
		overview,
		release_date,
		runtime,
		genres,
		companies,
		countries,
		languages,
		created_by,
		budget,
		revenue,
		in_production,
		last_episode_to_air,
		collection,
		cast,
		crew,
		recommendations,
		videoKey,
		providers,
	} = query.data;

	return (
		<>
			<Stack.Screen options={{ title }} />

			<Video
				videoKey={videoKey}
				backdropPath={backdrop_path}
				posterPath={poster_path}
			/>

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingTop: 20,
					paddingBottom: 64,
				}}
			>
				<VStack space={20}>
					<VStack px={16} space={4}>
						{title?.length > 0 && <Heading>{title}</Heading>}
						<HStack space={8}>
							{release_date?.length > 0 && (
								<Subtitle>{getYear(new Date(release_date))}</Subtitle>
							)}
							{release_date?.length > 0 &&
								(runtime > 0 || last_episode_to_air) && <Subtitle>•</Subtitle>}
							{type === "movie"
								? runtime > 0 && <Subtitle>{formatDuration(runtime)}</Subtitle>
								: last_episode_to_air && (
										<Subtitle>{`${last_episode_to_air.season_number} seasons`}</Subtitle>
								  )}
						</HStack>
					</VStack>

					<VStack px={16} space={8}>
						<Button
							variant="primary"
							leftIcon="Play"
							fillIcon={true}
							onPress={() => providersRef.current.snapToIndex(0)}
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
								renderItem={({ item: member }) => (
									<CreditMember member={member} mx={4} />
								)}
								contentContainerStyle={{ paddingHorizontal: 12 }}
								showsHorizontalScrollIndicator={false}
								horizontal
							/>
						</VStack>
					)}

					{crew?.length > 0 && (
						<VStack space={8}>
							<Title pl={16}>Crew</Title>
							<FlatList
								data={crew}
								keyExtractor={(m) => m.id.toString() + m.role}
								renderItem={({ item: member }) => (
									<CreditMember member={member} mx={4} />
								)}
								contentContainerStyle={{ paddingHorizontal: 12 }}
								showsHorizontalScrollIndicator={false}
								horizontal
							/>
						</VStack>
					)}

					{collection && (
						<Poster poster={collection} orientation="horizontal" />
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

						{created_by?.length > 0 && (
							<Information title="Created By" content={created_by.join(", ")} />
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

			<Sheet ref={providersRef} snaps={["35%", "70%"]}>
				{selectedRegion ? (
					<VStack pt={8} space={24}>
						<HStack alignItems="center" px={16} space={16}>
							<Avatar
								src={selectedRegion.flag}
								size={28}
								alt={selectedRegion.name}
							/>

							<Box flex={1} maxWidth="70%">
								<Heading fontSize={18} numberOfLines={1} ellipsizeMode="tail">
									{selectedRegion.name}
								</Heading>
							</Box>

							<Button
								onPress={() => regionsRef.current.snapToIndex(0)}
								leftIcon="Repeat"
								size="md"
							>
								Region
							</Button>
						</HStack>

						<Providers providers={providers[selectedRegion.code]} />
					</VStack>
				) : (
					<EmptyState>No providers were found.</EmptyState>
				)}
			</Sheet>

			{selectedRegion && (
				<Sheet ref={regionsRef} snaps={["90%"]}>
					<Box py={8} borderBottomWidth={1} borderColor="neutral-6">
						<Heading px={16} fontSize={18}>
							Available Regions
						</Heading>
					</Box>

					<FlatList
						data={regions}
						keyExtractor={(r) => r.code}
						renderItem={({ item: region }) => (
							<Region
								region={region}
								isSelected={region === selectedRegion}
								onPress={() => setSelectedRegion(region)}
							/>
						)}
						contentContainerStyle={{
							paddingTop: 8,
							paddingBottom: 64,
							paddingHorizontal: 16,
						}}
					/>
				</Sheet>
			)}
		</>
	);
};

export default MediaScreen;
