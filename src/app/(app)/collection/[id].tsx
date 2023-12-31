import { FlatList } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { tmdbConfig } from "@/libs/tmdb";
import { getCollection } from "@/libs/tmdb/api/collection";
import { ErrorState } from "@/components/commons";
import { CollectionSkeleton } from "@/components/skeletons";
import { Body, Heading, Image, VStack, LinearGradient } from "@/components/ui";
import PosterCard from "@/features/poster-card";

const CollectionScreen = () => {
	const { id } = useLocalSearchParams<{ id: string }>();

	const query = useQuery({
		queryKey: ["collection", id],
		queryFn: () => getCollection(id),
	});

	if (query.isLoading) return <CollectionSkeleton />;

	if (query.isError) return <ErrorState retry={query.refetch} />;

	const { name, backdrop_path, overview, parts } = query.data;

	return (
		<>
			<Stack.Screen options={{ title: name }} />

			<FlatList
				data={parts}
				keyExtractor={(part) => part.id}
				ListHeaderComponent={() => (
					<VStack alignItems="center" space={16}>
						<Image
							src={`${tmdbConfig.links.image}/w500${backdrop_path}`}
							alt={name}
							width="100%"
							aspectRatio={16 / 9}
						>
							<LinearGradient />
						</Image>

						<Heading textAlign="center" px={16}>
							{name}
						</Heading>

						{overview?.length > 0 && <Body px={16}>{overview}</Body>}
					</VStack>
				)}
				renderItem={({ item }) => (
					<PosterCard
						poster={item}
						size="md"
						textPosition="top"
						decoration="shadow"
					/>
				)}
				numColumns={2}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 128 }}
				columnWrapperStyle={{
					justifyContent: "space-between",
					paddingHorizontal: 24,
					paddingTop: 24,
				}}
			/>
		</>
	);
};

export default CollectionScreen;
