import { useEffect, useRef, useState } from "react";
import { FlatList, ScrollView } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { getLocales } from "expo-localization";
import { useQuery } from "@tanstack/react-query";
import { getCountry } from "iso-3166-1-alpha-2";
import { formatDuration } from "@/utils/time";
import { getMovie, getTv } from "@/libs/axios/api/details";
import Details from "@/libs/axios/types/Details";
import { ErrorState } from "@/components/common";
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
import DetailsSkeleton from "@/features/details/components/DetailsSkeleton";
import { Poster } from "@/features/poster";
import Persons from "@/features/persons";
import { Collection } from "@/features/collection";
import { Informations } from "@/features/informations";
import { Providers } from "@/features/providers";
import { Region } from "@/features/region";

const DetailsScreen = () => {
	const { type, id } = useLocalSearchParams<{
		type: "movie" | "tv";
		id: string;
	}>();

	const providersRef = useRef(null);
	const regionsRef = useRef(null);

	const [regions, setRegions] = useState<Region[]>(null);
	const [selectedRegion, setSelectedRegion] = useState<Region>(null);
	const { regionCode: userRegion } = getLocales()[0];

	const getDetails = type === "movie" ? getMovie : getTv;

	const query = useQuery<Details, Error>({
		queryKey: [type, id],
		queryFn: () => getDetails(id),
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

	if (query.isLoading || selectedRegion === null) return <DetailsSkeleton />;

	if (query.isError) return <ErrorState retry={query.refetch} />;

	const {
		title,
		poster_path,
		backdrop_path,
		overview,
		release_year,
		season_number,
		runtime,
		genres,
		collection,
		cast,
		crew,
		recommendations,
		informations,
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
							{release_year?.length > 0 && <Subtitle>{release_year}</Subtitle>}
							{release_year?.length > 0 &&
								(runtime > 0 || season_number > 0) && <Subtitle>•</Subtitle>}
							{type === "movie"
								? runtime > 0 && <Subtitle>{formatDuration(runtime)}</Subtitle>
								: season_number > 0 && (
										<Subtitle>{`${season_number} seasons`}</Subtitle>
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

					{cast?.length > 0 && <Persons title="Cast" persons={cast} />}

					{crew?.length > 0 && <Persons title="Crew" persons={crew} />}

					{collection && <Collection collection={collection} />}

					<Informations type={type} informations={informations} />
				</VStack>
			</ScrollView>

			<Sheet ref={providersRef} snaps={["35%", "70%"]}>
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
							size="sm"
						>
							Region
						</Button>
					</HStack>

					<Providers providers={providers[selectedRegion.code]} />
				</VStack>
			</Sheet>

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
		</>
	);
};

export default DetailsScreen;
