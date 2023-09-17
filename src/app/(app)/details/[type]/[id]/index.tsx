import { useEffect, useRef, useState } from "react";
import { FlatList, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { formatDuration } from "@/utils/time";
import { useRegions } from "@/providers/regions";
import { getMovie, getTv } from "@/libs/axios/api/details";
import Details from "@/libs/axios/types/Details";
import { ErrorState } from "@/components/common";
import {
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

const DetailsScreen = () => {
	const { type, id } = useLocalSearchParams<{
		type: "movie" | "tv";
		id: string;
	}>();
	const sheetRef = useRef(null);
	const [isInitiating, setIsInitiating] = useState(true);
	const { selectedRegion, initRegions } = useRegions();

	const getDetails = type === "movie" ? getMovie : getTv;

	const query = useQuery<Details, Error>({
		queryKey: [type, id],
		queryFn: () => getDetails(id),
	});

	useEffect(() => {
		if (query.isFetched) {
			initRegions(Object.keys(query.data.providers));
			setIsInitiating(false);
		}
	}, [query.isFetched]);

	if (query.isLoading || isInitiating) return <DetailsSkeleton />;

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
							onPress={() => sheetRef.current.snapToIndex(0)}
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

					{crew?.length > 0 && (
						<Persons
							title={type === "movie" ? "Crew" : "Created By"}
							persons={crew}
						/>
					)}

					{collection && <Collection collection={collection} />}

					<Informations type={type} informations={informations} />
				</VStack>
			</ScrollView>

			<Sheet ref={sheetRef}>
				<VStack pt={8} space={16}>
					<HStack
						justifyContent="space-between"
						alignItems="center"
						px={16}
						space={16}
					>
						<Box maxWidth="70%">
							<Heading
								fontSize={18}
								numberOfLines={1}
								ellipsizeMode="tail"
							>{`${selectedRegion.flag} ${selectedRegion.name}`}</Heading>
						</Box>

						<Button
							onPress={() =>
								router.push({
									pathname: "/(app)/details/[type]/[id]/regions",
									params: { type, id },
								})
							}
							leftIcon="Repeat"
							size="sm"
						>
							Region
						</Button>
					</HStack>

					<Providers providers={providers[selectedRegion.code]} />
				</VStack>
			</Sheet>
		</>
	);
};

export default DetailsScreen;
