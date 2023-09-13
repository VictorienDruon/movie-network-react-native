import { FlatList, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getProviders } from "@/libs/axios/api/providers";
import { Providers } from "@/libs/axios/types/Providers";
import { Image, Title, VStack } from "@/components/ui";

const ProvidersModal = () => {
	const { type, id } = useLocalSearchParams<{
		type: "movie" | "tv";
		id: string;
	}>();

	const query = useQuery<Providers, Error>({
		queryKey: ["providers", id],
		queryFn: () => getProviders(type, id),
	});

	if (query.isLoading) return null;
	if (query.isError) return null;

	const { flatrate, buy, rent } = query.data;

	return (
		<ScrollView>
			<VStack pt={16} space={16}>
				{flatrate && (
					<VStack space={8}>
						<Title pl={16}>Streaming Platforms</Title>
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
								/>
							)}
							contentContainerStyle={{ paddingHorizontal: 8 }}
							showsHorizontalScrollIndicator={false}
							horizontal
						/>
					</VStack>
				)}
			</VStack>
		</ScrollView>
	);
};

export default ProvidersModal;
