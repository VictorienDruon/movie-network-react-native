import { FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getLocales } from "expo-localization";
import { countryCode } from "emoji-flags";
import { useQuery } from "@tanstack/react-query";
import { getProviders } from "@/libs/axios/api/providers";
import { LocaleProviders } from "@/libs/axios/types/Providers";
import { EmptyState, ErrorState } from "@/components/common";
import { Image, Title, VStack } from "@/components/ui";

const ProvidersModal = () => {
	const { type, id } = useLocalSearchParams<{
		type: "movie" | "tv";
		id: string;
	}>();
	const { regionCode: userRegion } = getLocales()[0];

	const query = useQuery<LocaleProviders, Error>({
		queryKey: ["providers", id],
		queryFn: () => getProviders(type, id),
	});

	if (query.isLoading) return null;

	if (query.isError) return <ErrorState retry={query.refetch} />;

	const availableRegions = Object.keys(query.data);

	if (availableRegions.length === 0)
		return <EmptyState>No providers available in your region</EmptyState>;

	const defaultRegion = availableRegions[0];
	const availableCountries = availableRegions.map((region) =>
		countryCode(region)
	);
	const { flatrate, buy, rent } =
		userRegion in availableRegions
			? query.data[userRegion]
			: query.data[defaultRegion];

	return (
		<VStack pt={16} space={16}>
			{flatrate && (
				<VStack space={8}>
					<Title pl={16}>Streaming</Title>
					<FlatList
						data={flatrate}
						keyExtractor={(p) => p.provider_id.toString()}
						renderItem={({ item: p }) => (
							<Image
								src={`https://image.tmdb.org/t/p/w500${p.logo_path}`}
								alt={p.provider_name}
								width={70}
								height={70}
								marginHorizontal={8}
								borderRadius="lg"
								borderWidth={1}
								borderColor="neutral-6"
							/>
						)}
						contentContainerStyle={{ paddingHorizontal: 8 }}
						showsHorizontalScrollIndicator={false}
						horizontal
					/>
				</VStack>
			)}

			{buy && (
				<VStack space={8}>
					<Title pl={16}>Buy</Title>
					<FlatList
						data={buy}
						keyExtractor={(p) => p.provider_id.toString()}
						renderItem={({ item: p }) => (
							<Image
								src={`https://image.tmdb.org/t/p/w500${p.logo_path}`}
								alt={p.provider_name}
								width={70}
								height={70}
								marginHorizontal={8}
								borderRadius="lg"
								borderWidth={1}
								borderColor="neutral-6"
							/>
						)}
						contentContainerStyle={{ paddingHorizontal: 8 }}
						showsHorizontalScrollIndicator={false}
						horizontal
					/>
				</VStack>
			)}

			{rent && (
				<VStack space={8}>
					<Title pl={16}>Rent</Title>
					<FlatList
						data={rent}
						keyExtractor={(p) => p.provider_id.toString()}
						renderItem={({ item: p }) => (
							<Image
								src={`https://image.tmdb.org/t/p/w500${p.logo_path}`}
								alt={p.provider_name}
								width={70}
								height={70}
								marginHorizontal={8}
								borderRadius="lg"
								borderWidth={1}
								borderColor="neutral-6"
							/>
						)}
						contentContainerStyle={{ paddingHorizontal: 8 }}
						showsHorizontalScrollIndicator={false}
						horizontal
					/>
				</VStack>
			)}
		</VStack>
	);
};

export default ProvidersModal;
